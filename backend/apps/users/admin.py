from django.contrib import admin
from django.utils.html import format_html
from django.utils.timezone import now
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User
from apps.anime.models import AnimeReview, AnimeList
from apps.boards.models import BoardPost


@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    model = User

    # ✅ 관리자 리스트에서 보여줄 필드
    list_display = (
        "email",
        "nickname",
        "profile_thumb",
        "language",
        "is_active",
        "is_staff",
        "anime_count",
        "post_count",
        "avg_rating",
        "days_since_login",
        "created_at",
    )

    # ✅ 검색 가능 필드
    search_fields = ("email", "nickname")

    # ✅ 필터링 필드
    list_filter = ("is_active", "is_staff", "language", "gender", "created_at")

    # ✅ 정렬 기준
    ordering = ("-created_at",)

    # ✅ 상세 보기 구성
    fieldsets = (
        ("기본 정보", {"fields": ("email", "password")}),
        ("프로필", {"fields": ("nickname", "gender", "language", "about")}),
        ("이미지", {"fields": ("profile_image", "background_image", "myroom_image")}),
        ("권한", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("기타 정보", {"fields": ("nickname_changed_at", "last_login", "created_at", "updated_at")}),
    )

    # ✅ 유저 추가 시
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "nickname", "password1", "password2", "is_active", "is_staff"),
        }),
    )

    # ✅ 읽기 전용 필드
    readonly_fields = ("created_at", "updated_at", "last_login", "nickname_changed_at")

    # ✅ 프로필 이미지 썸네일
    def profile_thumb(self, obj):
        if obj.profile_image:
            return format_html(
                '<img src="{}" style="width:30px; height:30px; border-radius:50%;" />',
                obj.profile_image.url,
            )
        return "-"
    profile_thumb.short_description = "프로필"

    # ✅ 애니 등록 수 (AnimeList 기준)
    def anime_count(self, obj):
        return AnimeList.objects.filter(user=obj).count()
    anime_count.short_description = "애니 등록 수"

    # ✅ 게시글 수
    def post_count(self, obj):
        return BoardPost.objects.filter(author=obj).count()
    post_count.short_description = "게시글 수"

    # ✅ 평균 평점 (AnimeReview 기준)
    def avg_rating(self, obj):
        ratings = AnimeReview.objects.filter(user=obj).values_list("rating", flat=True)
        if ratings:
            return round(sum(ratings) / len(ratings), 2)
        return "-"
    avg_rating.short_description = "평점 평균"

    # ✅ 마지막 로그인 후 며칠 지났는지
    def days_since_login(self, obj):
        if obj.last_login:
            delta = now() - obj.last_login
            return f"{delta.days}일 전"
        return "없음"
    days_since_login.short_description = "최근 로그인"