from django.db import models
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# 사용자 관리 클래스
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("이메일은 필수입니다.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)

# 사용자 모델
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    nickname = models.CharField(max_length=30, unique=True)
    gender = models.CharField(max_length=10, choices=[("male", "남성"), ("female", "여성"), ("unknown", "선택안함")], default="unknown")
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)
    background_image = models.ImageField(upload_to='backgrounds/', null=True, blank=True)
    myroom_image = models.ImageField(upload_to='myrooms/', null=True, blank=True)
    about = models.TextField(blank=True)
    language = models.CharField(max_length=10, choices=[("ko", "한국어"), ("en", "English"), ("es", "Español")], default="ko")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["nickname"]

    def __str__(self):
        return self.email

# Email 인증 모델
class EmailVerification(models.Model):
    email = models.EmailField(unique=True)
    code = models.CharField(max_length=6)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    def is_expired(self):
        return timezone.now() > self.expires_at

    def save(self, *args, **kwargs):
        # expires_at이 비어있으면 생성 시점 + 5분
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(minutes=5)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.email} - {'인증됨' if self.is_verified else '미인증'}"