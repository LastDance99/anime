from django.urls import path
from .views import (
    AnimeBotChatAPIView,
)

urlpatterns = [
    path('chat/', AnimeBotChatAPIView.as_view(), name='animebot-chat'),
]