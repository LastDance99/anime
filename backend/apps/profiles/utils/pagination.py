from rest_framework.pagination import PageNumberPagination

# 프로필 내 활동 페이지네이션
class ActivityPagePagination(PageNumberPagination):
    page_size = 20  # 내 활동 뷰 전용
    page_size_query_param = 'page_size'  # 프론트에서 조절하려면
    max_page_size = 50

# 프로필 코멘트 페이지네이션
class CommentPagePagination(PageNumberPagination):
    page_size = 20  # 기본 20개
    page_size_query_param = 'page_size'  
    max_page_size = 50

# 프로필 콘텐츠 페이지네이션 (예: 내 애니메이션, 게시글, 갤러리)
class ContentPagePagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 50