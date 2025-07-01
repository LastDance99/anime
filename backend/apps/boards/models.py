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
    thumbnail_url = models.URLField(null=True, blank=True)
    views = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    likes = models.ManyToManyField(
        User,
        through='PostLike',
        related_name='liked_board_posts'
    )

    def __str__(self):
        return f"[{self.get_board_type_display()}] {self.title} / {self.author} ({self.id})"

# 게시글에 좋아요 모델 정의
class PostLike(models.Model):
    post = models.ForeignKey(BoardPost, on_delete=models.CASCADE, related_name='post_likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('post', 'user')  # 동일 유저 중복 좋아요 방지
    
    def __str__(self):
        return f"{self.user} → '{self.post.title}' ({self.post.id})"

# 게시글에 댓글 모델 정의
class BoardComment(models.Model):
    post = models.ForeignKey(BoardPost, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    tagged_nickname = models.CharField(max_length=50, null=True, blank=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.parent:
            return f"대댓글 by {self.author} on '{self.post.title}' (id:{self.id})"
        return f"댓글 by {self.author} on '{self.post.title}' (id:{self.id})"

# 댓글에 좋아요 모델 정의
class CommentLike(models.Model):
    comment = models.ForeignKey(BoardComment, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('comment', 'user') # 동일 유저 중복 좋아요 방지

    def __str__(self):
        return f"{self.user} → 댓글(id:{self.comment.id})"
