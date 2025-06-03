from django.urls import path
from .views import (
    MyProfileView,
    UserProfileView,
    ProfileCommentCreateView,
    ProfileCommentDeleteView,
)

urlpatterns = [
    path('me/', MyProfileView.as_view(), name='my-profile'),
    path('<int:user_id>/', UserProfileView.as_view(), name='user-profile'),
    path('<int:user_id>/comments/', ProfileCommentCreateView.as_view(), name='profile-comment-create'),
    path('<int:user_id>/comments/<int:pk>/', ProfileCommentDeleteView.as_view(), name='profile-comment-delete'),
]
