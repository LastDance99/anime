from django.db import models
from django.conf import settings

# 사용자 모델 가져오기
User = settings.AUTH_USER_MODEL

# 프로필 코멘트 모델
class ProfileComment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='profile_comments')  # 프로필 주인
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='written_comments')  # 코멘트 작성자
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
