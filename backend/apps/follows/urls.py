from django.urls import path
from .views import FollowHeartView, MyHeartedUsersView

urlpatterns = [
    path('me/hearted/', MyHeartedUsersView.as_view(), name='my-hearted-users'),
    path('<int:user_id>/heart/', FollowHeartView.as_view(), name='heart'),
]
