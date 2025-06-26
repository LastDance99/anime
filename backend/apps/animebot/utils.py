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
너는 대한민국 최대 애니·만화·서브컬처 커뮤니티 웹사이트의 공식 AI 챗봇임. 
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
    └ ‘모름’도 정답임! 괜히 채워넣거나 얼버무리지 마라.
─────────────────────────────

(*이 프롬프트는 너의 답변 스타일, 신뢰도, 정보 정확성, 커뮤니티 감성을 최적화하기 위한 가이드라인임)
""".strip()
# ───────────────────────────────

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
        for title_col in ["title_en", "title_romaji", "title_ko", "title_native"]:
            raw_title = row.get(title_col, "")
            title = normalize(raw_title)
            score = similarity(normalized_key, title)
            if score > 0.35:
                desc = str(row.get("description_ko", "")).strip()
                format_type = row.get("format", "UNKNOWN")
                if desc:
                    candidates.append((score, desc, format_type))
    candidates = sorted(candidates, key=lambda x: -x[0])
    return candidates

def search_web(search_key):
    api_key = os.environ.get("SERPAPI_KEY")
    params = {
        "q": f"{search_key} 애니메이션",
        "api_key": api_key,
        "engine": "google",
        "num": 5,
        "hl": "ko"
    }
    try:
        resp = requests.get("https://serpapi.com/search", params=params, timeout=10)
        data = resp.json()
        out = ""
        for item in data.get("organic_results", []):
            title = item.get("title", "")
            snippet = item.get("snippet", "")
            combined_text = f"{title} {snippet}".lower()
            if any(word in combined_text for word in ["2025년", "2분기", "애니", "신작", "줄거리"]):
                out += f"- {title}: {snippet}\n"
        return out if out else "관련 웹 검색 결과 없음"
    except Exception as e:
        return f"웹 검색 실패: {e}"

def ask_gpt_full_context_v2(excel_data, web_data, question, format_type="UNKNOWN"):
    # format hint
    format_hint = ""
    if format_type.upper() in ["MOVIE", "SPECIAL", "OVA"]:
        format_hint = f"\n\n⚠️ 참고: 이 설명은 본편 TV 시리즈가 아니라 **{format_type} 형식**임. 본편과 줄거리나 분위기가 다를 수 있음."

    # 웹 요약 정리 함수
    def structure_web_summary(raw_web):
        summaries = []
        for line in (raw_web or "").split("\n"):
            if ":" in line:
                title, content = line.split(":", 1)
                content = content.strip()
                if any(x in content for x in ["제작", "방영", "개봉", "1기", "MAPPA", "WIT"]):
                    summaries.append(f"📌 {title.strip()}: {content}")
        return "\n".join(summaries[:5]) if summaries else (raw_web or "")

    web_summary = structure_web_summary(web_data or "")

    user_prompt = f"""
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
"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
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

# ───────────────────────────────
