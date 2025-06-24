# 언어 설정 함수
def get_localized_title(anime, lang: str) -> str:
    return {
        "ko": anime.title_ko,
        "en": anime.title_romaji,
        "es": anime.title_es
    }.get(lang, anime.title_ko)
