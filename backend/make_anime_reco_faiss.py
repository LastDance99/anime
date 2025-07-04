# make_anime_reco_faiss.py
import os
import pandas as pd
import json
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OpenAIEmbeddings
from langchain.docstore.document import Document
from dotenv import load_dotenv

load_dotenv()
embedding = OpenAIEmbeddings()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
EXCEL_PATH = os.path.join(BASE_DIR, 'anime_fianl_true.xlsx')

df = pd.read_excel(EXCEL_PATH)
df = df[df["description_ko"].notnull()]

def row_to_text(row):
    # 추천 품질 향상을 위해 모든 feature를 합쳐 임베딩 (자연어 문장으로)
    def join_json_field(val):
        if isinstance(val, str):
            try:
                parsed = json.loads(val)
                if isinstance(parsed, list):
                    # 장르: ["Action", ...], 스태프: ["누구", ...]
                    return ", ".join([str(x) if not isinstance(x, dict) else x.get("name") for x in parsed])
                if isinstance(parsed, dict):
                    return parsed.get("name", str(parsed))
            except:
                return val
        return val

    genres = join_json_field(row.get("genres_en", ""))
    tags = join_json_field(row.get("tags", ""))
    studios = ", ".join([studio["node"]["name"] for studio in json.loads(row.get("studios", "[]")) if "node" in studio])
    staff = join_json_field(row.get("staff", ""))
    source = row.get("source_en", "")
    format_ = row.get("format", "")
    # 핵심 특징들을 한 문장으로 합치기
    return f"{row.get('title_en', '')} | Genres: {genres} | Tags: {tags} | Studios: {studios} | Staff: {staff} | Source: {source} | Format: {format_}"

docs = []
for _, row in df.iterrows():
    docs.append(
        Document(
            page_content=row_to_text(row),
            metadata={
                "id": int(row["id"]),
                "title_ko": row.get("title_ko", ""),
                "title_en": row.get("title_romaji", ""),
                "title_es": row.get("title_es", ""),
                "description_ko": row.get("description_ko", ""),
                "description_en": row.get("description_en", ""),
                "description_es": row.get("description_es", ""),
                "genres_ko": row.get("genres_ko", ""),
                "genres_en": row.get("genres_en", ""),
                "genres_es": row.get("genres_es", ""),
                "tags": row.get("tags", ""),
                "studios": row.get("studios", ""),
                "staff": row.get("staff", ""),
                "format": row.get("format", ""),
                "source_ko": row.get("source_ko", ""),
                "source_en": row.get("source_en", ""),
                "source_es": row.get("source_es", ""),
                "start_year": row.get("start_year", ""),
                "cover_image": row.get("cover_image_l", ""),
                # 필요시 추가 필드
            }
        )
    )

vectordb = FAISS.from_documents(docs, embedding)
vectordb.save_local(os.path.join(BASE_DIR, "anime_reco_faiss_index"))
print("✅ anime_reco_faiss_index 인덱스 생성 완료!")
