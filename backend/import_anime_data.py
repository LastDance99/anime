import os
import django
import pandas as pd
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.anime.models import Anime

df = pd.read_excel('anime_fianl_true.xlsx')

def parse_json_list(x):
    if pd.isna(x) or x in ['', 'nan', None]:
        return []
    # 혹시 이미 리스트 타입이면 그대로 반환
    if isinstance(x, list):
        return x
    try:
        # 홑따옴표 → 쌍따옴표 변환 (json.loads 호환)
        x = x.replace("'", '"')
        value = json.loads(x)
        if not isinstance(value, list):
            return []
        return value
    except Exception:
        return []

for _, row in df.iterrows():
    Anime.objects.create(
        title_romaji=row['title_romaji'],
        title_native=row['title_native'],
        title_ko=row['title_ko'],
        title_es=row['title_es'],
        description_ko=row.get('description_ko', ''),
        description_en=row.get('description_en', ''),
        description_es=row.get('description_es', ''),
        format=row['format'],
        episodes=row['episodes'] if not pd.isna(row['episodes']) else None,
        duration=row['duration'] if not pd.isna(row['duration']) else None,
        start_year=row['start_year'],
        start_month=row['start_month'] if not pd.isna(row['start_month']) else None,
        start_day=row['start_day'] if not pd.isna(row['start_day']) else None,
        end_year=row['end_year'] if not pd.isna(row['end_year']) else None,
        end_month=row['end_month'] if not pd.isna(row['end_month']) else None,
        end_day=row['end_day'] if not pd.isna(row['end_day']) else None,
        season_ko=row.get('season_ko', ''),
        season_en=row.get('season_en', ''),
        season_es=row.get('season_es', ''),
        status_ko=row['status_ko'],
        status_en=row['status_en'],
        status_es=row['status_es'],
        source_ko=row.get('source_ko', ''),
        source_en=row.get('source_en', ''),
        source_es=row.get('source_es', ''),
        cover_image_xl=row['cover_image_xl'],
        cover_image_l=row['cover_image_l'],
        cover_image_m=row['cover_image_m'],
        banner_image=row.get('banner_image', ''),
        genres_ko=parse_json_list(row['genres_ko']),
        genres_en=parse_json_list(row['genres_en']),
        genres_es=parse_json_list(row['genres_es']),
        studios=parse_json_list(row['studios']),
        tags=parse_json_list(row['tags']),
        characters=parse_json_list(row['characters']),
        staff=parse_json_list(row['staff']),
    )
print("✅ 애니 데이터 등록 완료!")
# python import_anime_data.py