from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

BOARD_TYPE_CHOICES = [
    ('post', '게시글'),
    ('gallery', '갤러리'),
]

# 게시판 모델 정의
class BoardPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='board_posts')
    board_type = models.CharField(max_length=20, choices=BOARD_TYPE_CHOICES)
    title = models.CharField(max_length=200)
    content = models.TextField()
    views = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

# 게시글에 이미지 업로드 모델 정의
class PostImage(models.Model):
    post = models.ForeignKey(BoardPost, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField()  # S3 URL이 저장될 예정
    created_at = models.DateTimeField(auto_now_add=True)

# 게시글에 좋아요 모델 정의
class PostLike(models.Model):
    post = models.ForeignKey(BoardPost, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('post', 'user')  # 동일 유저 중복 좋아요 방지

# 게시글에 댓글 모델 정의
class BoardComment(models.Model):
    post = models.ForeignKey(BoardPost, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    tagged_nickname = models.CharField(max_length=50, null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

# 댓글에 좋아요 모델 정의
class CommentLike(models.Model):
    comment = models.ForeignKey(BoardComment, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('comment', 'user') # 동일 유저 중복 좋아요 방지
