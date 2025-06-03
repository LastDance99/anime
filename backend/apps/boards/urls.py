from django.urls import path
from .views import ( 
    BoardPostListCreateView, 
    BoardPostDetailView, 
    BoardPostLikeView,
    BoardCommentListCreateView,
    BoardCommentLikeView,
    BoardCommentDeleteView,
)

urlpatterns = [
    path('', BoardPostListCreateView.as_view(), name='board-post-list-create'),  # ✅ GET + POST
    path('<int:post_id>/', BoardPostDetailView.as_view(), name='board-post-detail'), # ✅ PUT + GET + DELETE
    path('<int:post_id>/like/', BoardPostLikeView.as_view(), name='board-post-like'), # ✅ DELETE + POST
    path('<int:post_id>/comments/', BoardCommentListCreateView.as_view(), name='comment-list-create'), # ✅ GET + POST
    path('comments/<int:comment_id>/like/', BoardCommentLikeView.as_view(), name='comment-like'),
    path('<int:post_id>/comments/<int:pk>/', BoardCommentDeleteView.as_view(), name='comment-delete'),
]