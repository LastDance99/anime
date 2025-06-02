from django.urls import path
from .views import ProfileCommentListCreateView, ProfileCommentDeleteView

urlpatterns = [
    path('<int:user_id>/comments/', ProfileCommentListCreateView.as_view(), name='profile-comment-list-create'),
    path('<int:user_id>/comments/<int:pk>/', ProfileCommentDeleteView.as_view(), name='profile-comment-delete'),
]
