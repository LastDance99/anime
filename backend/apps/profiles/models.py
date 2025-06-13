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

# 유저 출석 모델
class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="attendances")
    date = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "date")  # 같은 날 중복 출석 방지
        ordering = ["-date"]  # 최근 출석일이 먼저

    def __str__(self):
        return f"{self.user.nickname} - {self.date}"

# 프로필 활동 모델
class UserActivity(models.Model):
    class ActivityType(models.TextChoices):
        POST_CREATE = "post_create", "게시글 작성"
        GALLERY_CREATE = "gallery_create", "갤러리 작성"
        ANIME_ADD = "anime_add", "애니 추가"
        ANIME_REMOVE = "anime_remove", "애니 삭제"
        REVIEW_ADD = "review_add", "리뷰 작성"
        REVIEW_REMOVE = "review_remove", "리뷰 삭제"
        COMMENT_CREATE = "comment_create", "댓글 작성"

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="activities")
    type = models.CharField(max_length=20, choices=ActivityType.choices)
    created_at = models.DateTimeField(auto_now_add=True)

    target_id = models.IntegerField(null=True, blank=True)
    target_title = models.CharField(max_length=255, blank=True)
    target_image = models.URLField(blank=True)

    parent_author_nickname = models.CharField(max_length=255, blank=True)
    parent_author_profile_image = models.URLField(null=True, blank=True)
    parent_title = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ["-created_at"]
