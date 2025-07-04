from django.urls import path
from .views import ( 
    BoardPostListCreateView, 
    BoardPostDetailView, 
    BoardPostLikeView,
    BoardCommentListCreateView,
    BoardCommentLikeView,
    BoardCommentDeleteView,
    BoardMiniProfileView,
    BoardNoticeListView,
    BoardPopularListView,
    BoardRecommendListView,
)

urlpatterns = [
    # 게시판 목록 조회/게시글 생성 GET + POST
    path('', BoardPostListCreateView.as_view(), name='board-post-list-create'),

    # 게시판 게시글 상세 조회 PUT + GET + DELETE
    path('<int:post_id>/', BoardPostDetailView.as_view(), name='board-post-detail'), 

    # 게시글 좋아요/좋아요 취소 DELETE + POST
    path('<int:post_id>/like/', BoardPostLikeView.as_view(), name='board-post-like'),

    # 댓글/대댓글 목록 조회 + 작성 
    path('<int:post_id>/comments/', BoardCommentListCreateView.as_view(), name='comment-list-create'),

    # 댓글 좋아요 등록
    path('comments/<int:comment_id>/like/', BoardCommentLikeView.as_view(), name='comment-like'),
    
    # 댓글 삭제
    path('<int:post_id>/comments/<int:pk>/', BoardCommentDeleteView.as_view(), name='comment-delete'),

    # 게시판 미니프로필 조회
    path('postcount/', BoardMiniProfileView.as_view(), name='post-count'),

    # 게시판 공지사항 목록 조회
    path("notices/", BoardNoticeListView.as_view()),

    # 게시판 인기 게시글 목록 조회
    path("popular/", BoardPopularListView.as_view()),

    # 게시판 추천 게시글 목록 조회
    path("recommend/", BoardRecommendListView.as_view()),
]