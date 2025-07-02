from django.urls import path
from .views import (
    AnimeBotChatAPIView,
    AnimeBotChatClearAPIView,
    AnimeBotImageGenerateAPIView,
)

urlpatterns = [
    path('chat/', AnimeBotChatAPIView.as_view(), name='animebot-chat'),
    path('chat/clear/', AnimeBotChatClearAPIView.as_view(), name='animebot-chat-clear'),
    path("generate_image/", AnimeBotImageGenerateAPIView.as_view(), name="animebot_generate_image"),
]