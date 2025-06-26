from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny # 포스트맨 테스트용, 테스트하고 제거 
from .utils import (
    classify_question_type, extract_title_from_question,
    search_excel_candidates, search_web, ask_gpt_full_context_v2,
)

class AnimeBotChatAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        question = request.data.get("question", "").strip()
        if not question:
            return Response({"error": "질문이 없습니다."}, status=status.HTTP_400_BAD_REQUEST)

        # 욕설 포함해도 그냥 넘어감 (비속어 필터 제거)
        q_type = classify_question_type(question)
        if q_type in ["story", "comparison", "person"]:
            search_key = extract_title_from_question(question)
        else:
            search_key = question

        candidates = search_excel_candidates(search_key)
        if candidates:
            _, excel_answer, format_type = candidates[0]
        else:
            excel_answer, format_type = "엑셀 데이터 없음", "UNKNOWN"

        web_answer = search_web(search_key)
        gpt_answer = ask_gpt_full_context_v2(excel_answer, web_answer, question, format_type)

        return Response({
            "excel": excel_answer,
            "web": web_answer,
            "gpt": gpt_answer,
            "final_answer": gpt_answer
        }, status=status.HTTP_200_OK)

