import os

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from openai import OpenAI
from django_redis import get_redis_connection
from .utils import (
    is_smalltalk_llm, is_smalltalk, smalltalk_answer, is_policy_question_llm, 
    policy_rag_answer, classify_question_type, extract_title_from_question,
    search_excel_candidates, search_web, ask_gpt_full_context_v2, recommend_anime_by_userlist,
)

REDIS_CHAT_PREFIX = "animebot_chat:"

def get_dialog_context(user_id):
    redis_conn = get_redis_connection("default")
    key = f"{REDIS_CHAT_PREFIX}{user_id}"
    messages = redis_conn.lrange(key, 0, -1)
    return [eval(msg.decode("utf-8")) for msg in messages] if messages else []

def append_dialog_context(user_id, user_msg, bot_msg, max_turns=20):
    redis_conn = get_redis_connection("default")
    key = f"{REDIS_CHAT_PREFIX}{user_id}"
    redis_conn.rpush(key, str({"role": "user", "content": user_msg}))
    redis_conn.rpush(key, str({"role": "assistant", "content": bot_msg}))
    if redis_conn.llen(key) > max_turns * 2:
        redis_conn.ltrim(key, -max_turns*2, -1)
    redis_conn.expire(key, 3600)  # 1시간 후 자동 삭제

def clear_dialog_context(user_id):
    redis_conn = get_redis_connection("default")
    key = f"{REDIS_CHAT_PREFIX}{user_id}"
    redis_conn.delete(key)

def is_smalltalk_combined(question):
    if is_smalltalk(question):
        return True
    llm_result = is_smalltalk_llm(question)
    return llm_result == "잡담"

class AnimeBotChatAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_id = request.user.id
        question = request.data.get("question", "").strip()
        if not question:
            return Response({"error": "질문이 없습니다."}, status=400)
        dialog_context = get_dialog_context(user_id)

        # 1. 운영정책 관련 분기 (한 번만 호출)
        policy_result = is_policy_question_llm(question)
        print("[DEBUG] question:", question) ##--------------------
        print("[DEBUG] policy?", policy_result) ##---------------
        if policy_result == "정책":
            answer = policy_rag_answer(question)
            print("[DEBUG] policy answer:", answer) #----------------
            append_dialog_context(user_id, question, answer)
            return Response({
                "mode": "policy",
                "final_answer": answer,
            }, status=200)

        # 2. 잡담/일상/수다 분기 (한 번만 호출)
        smalltalk_result = is_smalltalk_combined(question)
        print("[DEBUG] smalltalk?", smalltalk_result)
        if smalltalk_result:
            answer = smalltalk_answer(question, dialog_context)
            append_dialog_context(user_id, question, answer)
            return Response({
                "mode": "smalltalk",
                "final_answer": answer,
            }, status=200)
        
        # 3. 정보질문(애니/서브컬처) 처리
        q_type = classify_question_type(question)
        if q_type in ["story", "comparison", "person"]:
            search_key = extract_title_from_question(question)
        else:
            search_key = question

        candidates = search_excel_candidates(search_key)
        if candidates:
            _, excel_answer, format_type, cover_image = candidates[0]
        else:
            excel_answer, format_type, cover_image = "엑셀 데이터 없음", "UNKNOWN", ""

        web_answer = search_web(search_key)
        gpt_answer = ask_gpt_full_context_v2(
            excel_answer, web_answer, question, format_type, dialog_context
        )
        append_dialog_context(user_id, question, gpt_answer)
        return Response({
            "mode": "info",
            "excel": excel_answer,
            "cover_image": cover_image,
            "web": web_answer,
            "gpt": gpt_answer,
            "final_answer": gpt_answer
        }, status=200)

class AnimeBotChatClearAPIView(APIView):
    def post(self, request):
        user_id = request.user.id
        clear_dialog_context(user_id)
        return Response({"message": "대화내역 초기화됨"}, status=200)
    
class AnimeRecoAPIView(APIView):
    def post(self, request):
        # 프론트에서 유저 애니 리스트와 언어를 받음
        user_anime_titles = request.data.get("anime_titles", [])  # ["도쿄구울", ...]
        user_language = request.data.get("language", "ko")
        top_k = int(request.data.get("top_k", 10))

        result = recommend_anime_by_userlist(
            user_anime_titles=user_anime_titles,
            user_language=user_language,
            top_k=top_k,
            with_detail=True,
        )
        return Response(result)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class AnimeBotImageGenerateAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        prompt = request.data.get("prompt", "").strip()
        usage_type = request.data.get("usage_type", "")

        if usage_type not in ["comment", "reply"]:
            return Response({"error": "AI 짤 생성은 댓글/대댓글에서만 가능합니다."}, status=400)
        if not prompt:
            return Response({"error": "프롬프트가 없습니다."}, status=400)

        try:
            response = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                n=1,
                size="1024x1024"
            )
            image_url = response.data[0].url
            return Response({"image_url": image_url}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)