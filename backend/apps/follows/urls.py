from django.urls import path
from .views import FollowHeartCreateView, FollowHeartDeleteView

urlpatterns = [
    path('<int:user_id>/heart/', FollowHeartCreateView.as_view(), name='heart-create'),
    path('<int:user_id>/heart/', FollowHeartDeleteView.as_view(), name='heart-delete'),
]
