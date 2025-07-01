from bs4 import BeautifulSoup
import re

# HTML 콘텐츠에서 이미지 또는 유튜브 썸네일을 추출하는 함수
def extract_thumbnail_from_html(html: str) -> str | None:
    """HTML 콘텐츠에서 이미지 또는 유튜브 썸네일을 추출합니다."""
    soup = BeautifulSoup(html, "html.parser")

    # 1. <img> 태그 우선
    img_tag = soup.find("img")
    if img_tag and img_tag.has_attr("src"):
        return img_tag["src"]

    # 2. <iframe>에서 YouTube 영상이면 썸네일 추출
    iframe_tag = soup.find("iframe")
    if iframe_tag and iframe_tag.has_attr("src"):
        src = iframe_tag["src"]
        # YouTube embed 형식 감지
        match = re.search(r"(youtube\.com/embed/|youtu\.be/)([\w-]+)", src)
        if match:
            video_id = match.group(2)
            return f"https://img.youtube.com/vi/{video_id}/0.jpg"

    # 없으면 None
    return None
