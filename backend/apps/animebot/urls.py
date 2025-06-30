from django.urls import path
from .views import (
    AnimeBotChatAPIView,
    AnimeBotChatClearAPIView,
)

urlpatterns = [
    path('chat/', AnimeBotChatAPIView.as_view(), name='animebot-chat'),
    path('chat/clear/', AnimeBotChatClearAPIView.as_view(), name='animebot-chat-clear'),
]