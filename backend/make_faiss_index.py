import os
import pandas as pd
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.docstore.document import Document
from dotenv import load_dotenv

# .env에 있는 OpenAI 키 로딩
load_dotenv()
embedding = OpenAIEmbeddings()

# 경로 설정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EXCEL_PATH = os.path.join(BASE_DIR, 'anime_fianl_true.xlsx')

# 엑셀 로딩
df = pd.read_excel(EXCEL_PATH)
df = df[df["description_ko"].notnull()]  # 설명 있는 것만

# Document 리스트로 변환
docs = [
    Document(
        page_content=str(row["description_ko"]),
        metadata={
            "title_ko": row.get("title_ko", ""),
            "title_es": row.get("title_es", ""),
            "title_romaji": row.get("title_romaji", ""),
            "title_native": row.get("title_native", "")
        }
    )
    for _, row in df.iterrows()
]

# FAISS 인덱스 생성 및 저장
vectordb = FAISS.from_documents(docs, embedding)
vectordb.save_local(os.path.join(BASE_DIR, "anime_faiss_index"))

print("✅ anime_faiss_index 인덱스 생성 완료!")
