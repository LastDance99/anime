from django.urls import path
from .views import AnimeSearchView

urlpatterns = [
    path("search/", AnimeSearchView.as_view(), name="anime-search"),
]