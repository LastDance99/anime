import bleach

ALLOWED_TAGS = [
    'p', 'br', 'strong', 'em', 'ul', 'ol', 'li',
    'a', 'img', 'iframe', 'blockquote', 'h1', 'h2', 'h3'
]

ALLOWED_ATTRIBUTES = {
    'a': ['href', 'title', 'target'],
    'img': ['src', 'alt', 'width', 'height'],
    'iframe': ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen']
}

ALLOWED_PROTOCOLS = ['http', 'https']

def sanitize_html(raw_html: str) -> str:
    """
    게시글 내용 등의 HTML 문자열을 XSS 필터링하여 안전한 HTML로 반환
    """
    return bleach.clean(
        raw_html,
        tags=ALLOWED_TAGS,
        attributes=ALLOWED_ATTRIBUTES,
        protocols=ALLOWED_PROTOCOLS,
        strip=True
    )