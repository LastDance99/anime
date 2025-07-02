import os
import re
import pandas as pd
import requests

from dotenv import load_dotenv
from openai import OpenAI
from difflib import SequenceMatcher
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

# ───────────────────────────────
# 환경 변수 및 경로 세팅
load_dotenv()
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
EXCEL_PATH = os.path.join(BASE_DIR, 'anime_fianl_true.xlsx')
FAISS_PATH = os.path.join(BASE_DIR, 'anime_faiss_index')

# 추천용 벡터DB 로드 (최상단 import 근처에 위치)
RECO_FAISS_PATH = os.path.join(BASE_DIR, 'anime_reco_faiss_index')
reco_embedding = OpenAIEmbeddings()
reco_vectordb = FAISS.load_local(
    RECO_FAISS_PATH, 
    embeddings=reco_embedding, 
    allow_dangerous_deserialization=True
)

# 데이터셋 및 벡터 DB 준비
df = pd.read_excel(EXCEL_PATH)
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
embedding = OpenAIEmbeddings()
vectordb = FAISS.load_local(
    FAISS_PATH,
    embeddings=embedding,
    allow_dangerous_deserialization=True
)
retriever = vectordb.as_retriever(search_kwargs={"k": 3})
llm = ChatOpenAI(model="gpt-4o", temperature=0)
qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)

# ───────────────────────────────
# 프롬프트(가장 중요!!)
system_prompt = """
너는 대한민국 최대 애니·만화·서브컬처 커뮤니티 웹사이트인 '안타다'의 공식 AI 챗봇임. 
너의 목표는 커뮤니티의 기준에 부합하는, 재미있고 유익하면서도 정확하고 공신력 있는 애니 정보를 빠르고 인간적으로 전달하는 것임.

─────────────────────────────
【1. 역할/정체성】
- 넌 GPT-4o 기반의 초대형 AI 언어모델이자, 애니·만화·게임·서브컬처 전문 커뮤니티의 공식 정보 제공자임.
- 모든 답변은 “커뮤니티 유저들이 실제로 공감하고, 읽고 싶고, 신뢰할 수 있는 정보”라는 기준을 가장 우선시함.
- 네가 가진 내장지식(2023년까지의 공식 데이터, 미디어 정보, 작품 해설, 트리비아, 주요 위키 요약 등)이 최우선 출처임.

─────────────────────────────
【2. 답변 우선순위/컨텍스트 활용법】
- 네가 이미 내장 지식(공식 정보, 위키, 널리 알려진 해설 등)으로 정확하게 아는 내용은 그 지식만으로 답변해라.  
- 답변에 애매함, 자신없음, 최신/공식 정보 미비가 느껴질 때만 엑셀 데이터(내부 DB)와 웹 검색 결과(context)를 참고해 보충설명/근거로 활용해라.
- 네 지식과 context(엑셀/웹)가 충돌·모순될 경우, 
    └ “공식 발표/공식 위키/제작사/신뢰도 높은 최신 소스” 순서로 정확성과 공식성, 최신성, 신뢰도를 우선 고려.
    └ 불일치 이유가 있으면 자연스럽게 요약/비교하거나 “정보가 혼재됨”, “공식 해석 없음”이라고 솔직히 밝혀라.
- 정보를 임의로 지어내거나, 확실치 않은 내용을 단정지어 서술하는 것은 절대 금지!
    └ “정확한 정보 없음”, “아직 공식 발표 없음”, “공식 위키·포털 참고”, “팬들 사이에서 설만 있음” 등으로 정확하게 고지
- 답변은 ‘팩트’, ‘공식성’, ‘최신성’, ‘명확성’에 최우선 가치를 둬라.

─────────────────────────────
【3. 말투/어조/톤】
- DC, 루리웹, 인벤 스타일의 ‘친근+위트+정확’ 음슴체(건조체)  
    └ “~임”, “~했음”, “~랬음”, “참고하셈”, “정확한 정보 없음” 등으로 말끝을 마무리.
    └ 존댓말(~요, ~네요, ~같아요 등), 과도한 존중/의문형 피하기.
- 정보 중심, 간결 명확. 드립, 이모지, 소제목, 리스트 활용 OK(단, 장난/이모지 남발·감탄사 과용은 자제)
- 1인칭/2인칭 사용 최소화, 주관적 감상 자제. “내가 볼 땐~”, “너는~” 같은 표현 쓰지 말 것.

─────────────────────────────
【4. 서술 규칙/정답없음 안내】
- 질문이 애매하거나, 한정적인 정보만 있으면 질문 의도에 맞게 맥락을 보완하거나, 부족한 점을 직접 반문해라.
- 최신 정보(2023년 이후)는 네가 아는 한도 내에서 최대한 안내. 없으면 “2024년 이후 공식 발표 없음”, “추가 정보는 미공개임” 등으로 명시.
- 작품 포맷(본편 vs 극장판/OVA 등) 반드시 구분, 줄거리·설정·인물 등 혼동 없이 명시.
- 임의로 붙인 ‘작품명1’, ‘설명5’ 같은 인위적 명칭 금지.
- 추천작 수가 부족하거나 정보가 불확실해도 억지로 채우지 말고, “이 정도가 대표적임”, “추가 정보 없음”으로 자연스럽게 마무리.
- 출처 불분명, 루머, 팬덤 해석은 확실히 “공식X, 팬설”로 구분.

─────────────────────────────
【5. 스포일러·결말 안내 규칙】
- 질문 내용에 결말, 정체, 사망, 반전, 배신, 스포 성격의 요소가 포함되면
    └ 반드시 “⚠️ 스포일러 있음”, “※ 결말 포함” 식으로 설명 앞머리에 명확히 안내
    └ 시즌/화수 명시 없으면 스포일러 노출 최소화 + “자세한 건 원작/공식자료 참고 권장” 식으로 마무리

─────────────────────────────
【6. 답변 구조/형식】
- 질문 유형이 추천·비교면: 
    └ “TOP 5” “최고작” 등 억지로 랭킹 매기지 말고, 자연스럽게 대표작 나열 + 한줄평 첨부.
- 줄거리·설정은 “본편 vs 극장판” 구분해 요약, 소제목, 리스트 등으로 가독성↑.
- 정보 출처/버전 차이 있으면 “아래는 공식 위키/내장 지식/웹 정보 순” 등으로 구분해서 안내.
- “핵심요약” “공식정보” “팬덤 해석” 등 소제목 활용해서 답변 구성.

─────────────────────────────
【7. 환각/창작/불명확 정보 금지】
- 네 지식과 context로도 확실히 알 수 없는 내용, 아직 공개되지 않은 정보, 루머 등은
    └ 절대로 임의로 상상하거나 지어내지 말 것.
    └ “정확한 정보 없음”, “공식 발표 없음”, “아직 미공개임”, “팬들 사이 설” 등으로 반드시 명시
    └ ‘모름’도 정답임! 괜히 채워넣거나 얼버무리지 마라. 그리고 Make sure to think step-by-step when answering 이 문장을 명심해.
─────────────────────────────
【8. 일상/잡담/커뮤니티 대화 대응 가이드】   
- 유저가 가벼운 인사, 잡담, 고민, 농담, 넋두리, 커뮤니티식 수다(“오늘 점심 뭐 먹지”, “시험 망했다”, “요즘 뭐 재밌냐” 등)를 하면
    └ 인간적인 리액션, 짧은 드립, 현실 친구처럼 맞장구, 짧은 위로/격려, 친근한 피드백도 해줄 수 있음.
- 단, “애니/서브컬처/커뮤니티 관련 잡담”이면 더 적극적으로 드립, 공감, 추천, 위트 넣어서 답해도 됨.
- 일상 대화는 너무 기계적이거나, 오글거리지 않게 “커뮤니티 유저답게” 반응(툭툭 내뱉듯이, 심플+센스있게).
- 단, 정보성 질문/공식 문의/정확한 답변이 필요한 경우에는 기존 답변 규칙을 우선함.
- 지나친 사적상담/개인정보/법률·의학 등 전문 상담은 “전문가에게 문의하셈” 등으로 가이드.

─────────────────────────────

(*이 프롬프트는 너의 답변 스타일, 신뢰도, 정보 정확성, 커뮤니티 감성을 최적화하기 위한 가이드라인임)
""".strip()

# ───────────── LLM 분류 함수
def is_smalltalk_llm(question):
    """
    LLM에게 직접 분류 맡김. 잡담/수다/인사/농담/감정표현이면 True, 아니면 False.
    """
    classify_prompt = """
    아래 사용자의 발화(문장)가 '애니/만화/서브컬처 정보, 추천, 분석, 비교, 작품 설명, 줄거리, 요약, 등장인물 설명, ~에 대해 알려줘, ~내용 알려줘, ~내용 설명, ~정보'가 아닌 
    '일상/잡담/인사/농담/감정표현/친목 목적/커뮤니티식 수다'에 해당하면 '잡담' 
    정보질문(작품 설명, 줄거리, 방영일, 평점 등)이면 '정보'
    오타/헛소리/기타면 '기타'
    답변은 '잡담', '정보', '기타' 중 하나만 반환. 절대 설명 붙이지 마.
    ---
    발화: {question}
    답변:
    """.format(question=question.strip())
    resp = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": classify_prompt}],
        temperature=0
    )
    return resp.choices[0].message.content.strip()

# ───────────── 정책 질문 분기 함수
def is_policy_question_llm(question):
    prompt = (
        "아래 사용자의 질문이 '커뮤니티 운영정책/규정/제재/신고/차단/관리자 문의/광고/운영 문의/이용 제한' 등과 명확히 직접적으로 관련된 경우에만 'True'을 반환하고, "
        "잡담/인사/일상 대화/애니 정보/기타 문의 등은 반드시 'False'을 반환해. "
        "설명 붙이지 말고 한 단어로만 답변.\n"
        "----\n"
        f"질문: {question}\n"
        "답변:"
    )
    resp = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )
    return resp.choices[0].message.content.strip()

# ───────────── 잡담 분기 함수
def is_smalltalk(question):
    text = question.strip().lower().replace("  ", " ")
    
    # 0. 정보성 패턴은 무조건 info
    info_patterns = [
        "줄거리", "내용", "해석", "요약", "정보", "등장인물", "세계관", "작화", "ost", "인물", "시놉시스",
        "방영", "공식", "평가", "차이", "관련", "분석", "순위", "랭킹", "리뷰", "비교",
        "알려줘", "설명", "정리", "특징", "포인트", "배경", "스토리", "감독", "시즌", "작가"
    ]
    # '~에 대해', '~에 관한', '~에 대하여', '~에 대한', '~이 뭐야' 등 질문 패턴도 info
    info_patterns_q = ["에 대해", "에 관한", "에 대하여", "에 대한", "이 뭐야", "가 뭐야", "란?", "란 무엇", "가 뭔데", "이 뭔데"]
    if any(p in text for p in info_patterns + info_patterns_q):
        return False
    
    # 1. 1~2글자 (단일 감탄/리액션)
    if len(text) <= 2:
        return True
    # 2. 1~4글자 흔한 짧은 의성어/감탄/리액션 (정확히 일치)
    one_two_word = [
        "야", "어", "음", "아", "읭", "엥", "응", "흠", "허", "헐", "ㅎㅇ", "ㅋ", "ㅎ", "ㅋㅋ", "ㅎㅎ", "ㅋㅋㅋ", "ㅎㅎㅎ",
        "뭐", "왜", "뭐지", "뭐야", "에?", "음...", "아...", "야!", "헉", "아니", "쩐다", "오케이"
    ]
    if len(text) <= 4 and text in one_two_word:
        return True
    # 3. 잡담/감정/리액션/일상패턴(포함만 되어도)
    smalltalk_keywords = [
        "안녕", "ㅎㅇ", "ㅋㅋ", "ㅎㅎ", "심심", "배고파", "졸려", "힘들다", "뭐함", "뭐해", "오늘 뭐 먹지",
        "요즘 뭐 재밌냐", "추천 좀", "시험 망함", "잘 지냈어", "놀자", "굿밤", "굿모닝", "고마워", "재밌다",
        "감사", "덕분", "수고", "쉬는중", "퇴근", "출근", "아침", "점심", "저녁", "사랑해", "싫어", "고생했어",
        "야", "아", "음", "어", "헐", "에휴", "에이", "음...", "하...", "쩐다", "오케이", "헉", "뭐래",
        "에구", "푸흡", "푸하하", "후", "에", "우와", "아니", "아놔", "음냐",
        "힘내", "피곤", "잘자", "고생", "대박", "화이팅", "ㅠㅠ", "ㅋㅋㅋㅋ", "ㅎㅎㅎㅎ", "zz", "zzz"
    ]
    if any(word in text for word in smalltalk_keywords):
        return True
    
    # 4. "오늘", "기분", "날씨", "컨디션", "점심" 등 잡담 키워드가 앞/뒤에만 붙어도
    easy_smalltalk = ["오늘", "기분", "날씨", "점심", "아침", "저녁", "컨디션", "어때", "좀 어때", "뭐 먹", "뭐하지", "뭐 할까"]
    if any(word in text for word in easy_smalltalk):
        return True

    return False


def smalltalk_answer(question, dialog_context):
    smalltalk_prompt = """
    [중요] 지금 질문은 일상 대화/잡담/농담/감정표현/친목 목적임.
    절대 애니 제목, 작품 정보, 등장인물 이름, 줄거리, 애니 공식 정보 등을 임의로 붙이지 말 것.
    진짜 커뮤니티 유저처럼 현실 친구한테 하듯, 짧고 센스있고 위트 있게만 답변.
    (잡담/수다/위로/공감/드립/피드백 가능, 정보 답변 금지)
    """
    chat_history = [{"role": "system", "content": smalltalk_prompt}]
    if dialog_context:
        chat_history += dialog_context
    chat_history.append({"role": "user", "content": question})
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=chat_history,
        temperature=0.85
    )
    return response.choices[0].message.content.strip()

# ───────────── 정책 질문 답변 함수
def policy_rag_answer(question, chat_history=None):
    if chat_history is None:
        chat_history = []
    policy_vector_path = os.path.join(BASE_DIR, "vectorstores", "policy_index")
    vectordb = FAISS.load_local(
        policy_vector_path, OpenAIEmbeddings(), allow_dangerous_deserialization=True
    )
    retriever = vectordb.as_retriever(search_kwargs={"k": 5})
    llm = ChatOpenAI(model="gpt-4o", temperature=0)
    from langchain.memory import ConversationBufferMemory
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        return_messages=True
    )
    from langchain.chains import ConversationalRetrievalChain
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory,
    )
    result = qa_chain.invoke({
        "question": question,
        "chat_history": chat_history
    })
    return result["answer"]

# ───────────── 정보질문 기존 함수
def classify_question_type(question):
    if any(word in question for word in ["감독", "작화", "성우", "제작자", "만든 사람", "인물", "평가", "업적"]):
        return "person"
    elif any(word in question for word in ["줄거리", "내용", "무슨 내용", "어떤 내용", "스토리", "설정"]):
        return "story"
    elif any(word in question for word in ["vs", "비교", "어떤게 더", "추천"]):
        return "comparison"
    else:
        return "default"

def extract_title_from_question(question):
    q = re.sub(r"(줄거리|내용|시즌\d+|극장판|해줘|알려줘|추천|방영일|정보|내용은|무슨|어떤)", "", question)
    q = re.sub(r"[^\wㄱ-ㅎ가-힣a-zA-Z ]", "", q)
    return q.strip()

def normalize(text):
    return str(text).replace(" ", "").lower().strip()

def similarity(a, b):
    return SequenceMatcher(None, a, b).ratio()

def search_excel_candidates(search_key):
    candidates = []
    normalized_key = normalize(search_key)
    for _, row in df.iterrows():
        for title_col in ["title_es", "title_romaji", "title_ko", "title_native"]:
            raw_title = row.get(title_col, "")
            title = normalize(raw_title)
            score = similarity(normalized_key, title)
            if score > 0.35:
                desc = str(row.get("description_ko", "")).strip()
                format_type = row.get("format", "UNKNOWN")
                cover_image = row.get("cover_image_l", "")
                if desc:
                    candidates.append((score, desc, format_type, cover_image))
    candidates = sorted(candidates, key=lambda x: -x[0])
    return candidates

def search_web(search_key):
    api_key = os.environ.get("SERPAPI_KEY")
    search_sites = [
        "site:namu.wiki", "site:myanimelist.net", "site:aniplus.co.kr",
        "site:ani.ch", "site:wikipedia.org", "site:news.naver.com"
    ]
    result_text = ""
    extra_keywords = ["신작", "방영일", "공식 발표", "2024", "2025", "개봉", "최신", "이벤트", "방영 예정"]
    for site in search_sites:
        for extra in [""] + extra_keywords:
            query = f"{search_key} {extra} {site}".strip()
            params = {
                "q": query,
                "api_key": api_key,
                "engine": "google",
                "num": 2,
                "hl": "ko"
            }
            try:
                resp = requests.get("https://serpapi.com/search", params=params, timeout=10)
                data = resp.json()
                for item in data.get("organic_results", []):
                    title = item.get("title", "")
                    snippet = item.get("snippet", "")
                    link = item.get("link", "")
                    if any(s in link for s in [
                        "namu.wiki", "myanimelist.net", "aniplus.co.kr", "ani.ch", "wikipedia.org", "news.naver.com"
                    ]):
                        if any(k in snippet for k in extra_keywords) or any(k in title for k in extra_keywords):
                            result_text += f"📰 [{title}]({link}): {snippet}\n"
                        elif site in ["site:namu.wiki", "site:wikipedia.org", "site:myanimelist.net"]:
                            result_text += f"📚 [{title}]({link}): {snippet}\n"
            except Exception:
                continue
    return result_text if result_text else "공식 위키/포털/뉴스 기준 최신 정보 없음"

def ask_gpt_full_context_v2(excel_data, web_data, question, format_type="UNKNOWN", dialog_context=None):
    format_hint = ""
    if format_type.upper() in ["MOVIE", "SPECIAL", "OVA"]:
        format_hint = f"\n\n⚠️ 참고: 이 설명은 본편 TV 시리즈가 아니라 **{format_type} 형식**임. 본편과 줄거리나 분위기가 다를 수 있음."

    def structure_web_summary(raw_web):
        import re
        summaries = []
        source_dict = {"공식": [], "위키": [], "뉴스": []}
        important_patterns = [
            r"공식", r"발표", r"방영", r"신작", r"최신", r"제작", r"뉴스", r"이벤트", r"출시", r"정보",
            r"(20[2-9][0-9])년", r"wiki", r"위키", r"나무위키", r"구글", r"트위터", r"공식 사이트",
            r"특별판", r"PV", r"티저", r"Blu-ray", r"OST", r"콜라보"
        ]
        for line in (raw_web or "").split("\n"):
            if ":" in line:
                title, content = line.split(":", 1)
                text = f"{title} {content}".lower()
                if any(text in s for src in source_dict.values() for s in src):
                    continue
                if any(re.search(p, text) for p in important_patterns):
                    if "공식" in text or "트위터" in text or "공식 사이트" in text:
                        source_dict["공식"].append(f"📌 {title.strip()}: {content.strip()}")
                    elif "위키" in text or "나무위키" in text:
                        source_dict["위키"].append(f"📌 {title.strip()}: {content.strip()}")
                    elif "뉴스" in text or "구글" in text:
                        source_dict["뉴스"].append(f"📌 {title.strip()}: {content.strip()}")
                    else:
                        summaries.append(f"📌 {title.strip()}: {content.strip()}")
        output = []
        for k, v in source_dict.items():
            if v:
                output.append(f"[{k}]\n" + "\n".join(v[:2]))
        if summaries:
            output.append("\n".join(summaries[:3]))
        return "\n\n".join(output) if output else (raw_web or "")

    web_summary = structure_web_summary(web_data or "")
    chat_history = [{"role": "system", "content": system_prompt}]
    if dialog_context:
        chat_history += dialog_context
    chat_history.append({"role": "user", "content": f"""
📋 질문: {question}

🌐 웹 검색 요약:
{web_summary or '웹 정보 없음'}

📖 엑셀 설명:
{excel_data or '엑셀 정보 없음'}
{format_hint}

※ 아래 context(엑셀/웹)는 참고만 해도 되고,
내장 지식(2023년까지 학습 데이터, 공식 정보 등)이 더 정확하면 그걸 우선으로 활용해서 답변해.
둘이 충돌하면 공식/정확성/최신성을 반드시 우선시.
정보가 부족하거나 불확실하면 “정보 없음”, “공식 위키/포털 참고” 등으로 명확하게 안내해.
"""})

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=chat_history,
        temperature=0.7
    )

    def remove_undefined_items(text):
        return re.sub(r'^.*[\'"\[]?미정[\]"\d\s\-:)]?.*\n?', '', text, flags=re.MULTILINE | re.IGNORECASE)

    def remove_placeholder_titles(text):
        return re.sub(r'^.*(작품명\d+|설명\d+).*\n?', '', text, flags=re.MULTILINE)

    raw_answer = response.choices[0].message.content.strip()
    clean_answer = remove_undefined_items(raw_answer)
    clean_answer = remove_placeholder_titles(clean_answer)
    return clean_answer

# ───────────── 추천 함수
import ast
import json

def parse_to_list(val):
    """문자열로 넘어온 리스트도 안전하게 파싱 (JSON/파이썬식/빈값 다 대응)"""
    if isinstance(val, list):
        return val
    if val is None or val == "":
        return []
    if isinstance(val, str):
        val = val.strip()
        if val.startswith("[") and val.endswith("]"):
            try:
                return ast.literal_eval(val)
            except Exception:
                try:
                    return json.loads(val)
                except Exception:
                    return []
        elif "," in val:
            return [v.strip() for v in val.split(",") if v.strip()]
        else:
            return [val]
    return []

def get_multilang(meta, field, lang="ko", fallback_order=None):
    """
    meta: dict
    field: "title", "description", "genres"
    lang: 요청 언어 ("ko"|"en"|"es")
    fallback_order: 우선순위, 예) ["ko", "en", "es"]
    """
    fallback_order = fallback_order or ["ko", "en", "es"]
    order = [lang] + [l for l in fallback_order if l != lang]
    # 타이틀은 특이하게 처리: ko/romaji/es만 사용
    if field == "title":
        if lang == "ko":
            return meta["title_ko"]
        elif lang == "es":
            return meta["title_es"]
        else:
            return meta["title_romaji"]  # 영어는 romaji
    for l in order:
        key = f"{field}_{l}"
        if key in meta and meta[key]:
            v = meta[key]
            return parse_to_list(v) if field == "genres" else v
    return [] if field == "genres" else ""

def recommend_anime_by_userlist(
    user_anime_titles, user_language="ko", top_k=3, with_detail=True,
    exclude_tags=None, exclude_genres=None
):
    exclude_tags = exclude_tags or []
    exclude_genres = exclude_genres or []

    print(f"\n[추천] 유저가 본 애니: {user_anime_titles}")
    print(f"[추천] 요청 언어: {user_language} / top_k: {top_k}")

    user_features = []
    user_genres_counter = {}
    user_tags_counter = {}

    for title in user_anime_titles:
        docs = reco_vectordb.similarity_search(title, k=1)
        if docs:
            meta = docs[0].metadata
            user_features.append(docs[0].page_content)
            genres = parse_to_list(meta.get("genres_en", []))  # 장르 통계는 영어 기준
            tags = parse_to_list(meta.get("tags", []))
            print(f" - '{title}' -> genres: {genres} / tags: {tags}")
            for g in genres:
                user_genres_counter[g] = user_genres_counter.get(g, 0) + 1
            for t in tags:
                user_tags_counter[t] = user_tags_counter.get(t, 0) + 1

    if not user_features:
        print("[추천] 유저 애니 벡터 추출 실패")
        return []

    top_user_genres = set(sorted(user_genres_counter, key=user_genres_counter.get, reverse=True)[:5])
    top_user_tags = set(sorted(user_tags_counter, key=user_tags_counter.get, reverse=True)[:7])
    print(f"[추천] top_user_genres: {top_user_genres} / top_user_tags: {top_user_tags}")

    query = " ".join(user_features)
    candidates = reco_vectordb.similarity_search(query, k=top_k + 50)
    print(f"[추천] 후보 작품 수: {len(candidates)}")

    already_seen = set([t.strip().lower() for t in user_anime_titles])
    result = []

    filtered_candidates = []
    for doc in candidates:
        meta = doc.metadata
        titles = [
            meta.get("title_ko", ""), meta.get("title_romaji", ""),
            meta.get("title_native", ""), meta.get("title_es", "")
        ]
        if any(t.strip().lower() in already_seen for t in titles if t):
            continue

        genres = set(parse_to_list(meta.get("genres_en", [])))
        tags = set(parse_to_list(meta.get("tags", [])))

        if exclude_genres and any(x in genres for x in exclude_genres):
            continue
        if exclude_tags and any(x in tags for x in exclude_tags):
            continue

        genre_match = len(top_user_genres & genres)
        tag_match = len(top_user_tags & tags)
        if genre_match == 0 and tag_match == 0:
            continue

        score = 1.0 + 0.7 * genre_match + 0.5 * tag_match
        filtered_candidates.append((score, meta))

    print(f"[추천] 필터 후 후보: {len(filtered_candidates)}")

    filtered_candidates.sort(key=lambda x: -x[0])

    for score, meta in filtered_candidates:
        # 타이틀/설명/장르: 다국어 자동 fallback
        title = get_multilang(meta, "title", user_language)
        description = get_multilang(meta, "description", user_language)
        genres = get_multilang(meta, "genres", user_language)
        cover = meta.get("cover_image_l", meta.get("cover_image", "")) or ""
        year = meta.get("start_year", None)
        format_ = meta.get("format", "")
        studio_objs = parse_to_list(meta.get("studios", []))
        studio_names = [s['node']['name'] for s in studio_objs if isinstance(s, dict) and 'node' in s and 'name' in s['node']]

        if with_detail:
            result.append({
                "title": title,
                "description": description,
                "cover_image": cover,
                "year": year,
                "genres": genres,
                "studios": studio_names,
                "format": format_,
                "reco_score": round(score, 4)
            })
        else:
            result.append(title)
        if len(result) >= top_k:
            break

    print(f"[추천] 최종 추천 result: {result[:3]} ... [총 {len(result)}개]")
    return result
