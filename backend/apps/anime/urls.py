from django.urls import path
from .views import (
    AnimeSearchView,
    AnimeDetailView,
    AnimeReviewListCreateView,
    AnimeReviewUpdateDeleteView,
    AnimeReviewLikeView,
    AnimeRatingView,
    AnimeListToggleView,
)

urlpatterns = [
    # 애니메이션 통합 검색
    path("search/", AnimeSearchView.as_view(), name="anime-search"),
    # 애니 상세 정보
    path("<int:anime_id>/", AnimeDetailView.as_view(), name="anime-detail"),
    # 리뷰 목록 조회 & 작성 (GET, POST)
    path("<int:anime_id>/review/", AnimeReviewListCreateView.as_view(), name="anime-review-list-create"),
    # 리뷰 수정 & 삭제 (PUT, DELETE)
    path("<int:anime_id>/review/<int:review_id>/", AnimeReviewUpdateDeleteView.as_view(), name="anime-review-update-delete"),
    # 리뷰 좋아요 (POST)
    path("<int:anime_id>/review/<int:review_id>/like/", AnimeReviewLikeView.as_view(), name="anime-review-like"),
    # 평점 등록/수정 (POST), 삭제 (DELETE)
    path("<int:anime_id>/rating/", AnimeRatingView.as_view(), name="anime-rating"),
    # 내 애니 리스트 추가/삭제
    path("<int:anime_id>/animelist/", AnimeListToggleView.as_view(), name="anime-animelist"),
]
