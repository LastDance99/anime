from django.urls import path
from .views import (
    ProfileOverviewView,
    ProfileCommentListCreateView,
    ProfileCommentDeleteView,
    UserActivityListView,
    AnimeListStatsView,
    AttendanceStatsView,
    FavoriteAnimeListView,
    AnimeFavoriteToggleView,
    UpdateAboutView,
    ProfileContentListView
)

urlpatterns = [
    path('me/overview/', ProfileOverviewView.as_view()),                 # 내 프로필
    path('<int:user_id>/overview/', ProfileOverviewView.as_view()),      # 타인 프로필
    path('me/about/', UpdateAboutView.as_view(), name='update-about'),
    path('<int:user_id>/comments/', ProfileCommentListCreateView.as_view()),
    path('<int:user_id>/comments/<int:pk>/', ProfileCommentDeleteView.as_view()),
    path('<int:user_id>/activity/', UserActivityListView.as_view(), name='profile-activity'),
    path('<int:user_id>/animelist-stats/', AnimeListStatsView.as_view()),
    path('<int:user_id>/attendance-stats/', AttendanceStatsView.as_view()),
    path('<int:user_id>/favorite-animes/', FavoriteAnimeListView.as_view()),
    path('<int:anime_id>/favorite/', AnimeFavoriteToggleView.as_view()),
    path('<int:user_id>/content/', ProfileContentListView.as_view()),
]
