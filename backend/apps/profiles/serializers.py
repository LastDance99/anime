from rest_framework import serializers
from .models import ProfileComment, UserActivity
from apps.boards.models import BoardPost
from apps.anime.models import AnimeList, AnimeReview
from apps.core.utils.sanitizer import sanitize_html
from django.contrib.auth import get_user_model

User = get_user_model()

# 유저 프로필 시리얼라이저
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'email', 'nickname', 'profile_image', 'background_image',
            'myroom_image', 'about', 'language'
        ]

# 자기소개 업데이트 시리얼라이저
class AboutUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("about",)

    def update(self, instance, validated_data):
        about = validated_data.get("about", "")
        validated_data["about"] = sanitize_html(about)
        return super().update(instance, validated_data)

# 프로필 통계(애니의 총 갯수 / 평균 점수) 시리얼라이저
class AnimeListStatsSerializer(serializers.Serializer):
    total_animes = serializers.IntegerField()
    avg_rating = serializers.FloatField(allow_null=True)

# 프로필 출석 통계 시리얼라이저
class AttendanceStatsSerializer(serializers.Serializer):
    total_attendance = serializers.IntegerField()
    last_attendance = serializers.DateField(allow_null=True)

# 최애 애니메이션 토글 시리얼라이저
class AnimeFavoriteToggleSerializer(serializers.Serializer):
    is_favorite = serializers.BooleanField()

# 프로필 코멘트 시리얼라이저
class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "nickname", "profile_image")  # 원하는 필드만 노출

class ProfileCommentSerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)  # 작성자 정보
    # user = AuthorSerializer(read_only=True)  # (프로필 주인 정보가 필요하다면 주석 해제)
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = ProfileComment
        fields = (
            "id",
            "author",      # 작성자: {id, nickname, profile_image}
            # "user",      # (프로필 주인: 필요하면 추가)
            "content",
            "created_at",
        )
        read_only_fields = ("id", "author", "created_at")

    def validate_content(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("코멘트 내용이 비어있을 수 없습니다.")
        return sanitize_html(value)
    
# 유저 활동 시리얼라이저
class UserActivitySerializer(serializers.ModelSerializer):
    
    created_at_display = serializers.SerializerMethodField()
    
    class Meta:
        model = UserActivity
        fields = [
            "id",
            "type",
            "created_at",
            "created_at_display",
            "target_id",
            "target_title",
            "target_image",
            "parent_author_nickname",
            "parent_author_profile_image",
            "parent_title"
        ]

    def get_created_at_display(self, obj):
        # 예시: '2시간 전', '어제', '2024-06-11' 등으로 포맷 (프론트 처리도 가능)
        from django.utils.timesince import timesince
        return timesince(obj.created_at) + " 전"
    
    # 게시글/갤러리 활동일 때 좋아요/댓글 수 동적 계산
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    def get_likes(self, obj):
        # 게시글/갤러리 활동만 계산
        if obj.type in ["post_create", "gallery_create"]:
            from apps.boards.models import BoardPost
            try:
                post = BoardPost.objects.get(id=obj.target_id)
                return post.likes.count()
            except BoardPost.DoesNotExist:
                return 0
        return None

    def get_comments(self, obj):
        if obj.type in ["post_create", "gallery_create"]:
            from apps.boards.models import BoardPost
            try:
                post = BoardPost.objects.get(id=obj.target_id)
                return post.comments.count()
            except BoardPost.DoesNotExist:
                return 0
        return None

    class Meta:
        model = UserActivity
        fields = [
            "id",
            "type",
            "created_at",
            "created_at_display",
            "target_id",
            "target_title",
            "target_image",
            "parent_author_nickname",
            "parent_author_profile_image",
            "parent_title",
            "likes",
            "comments"
        ]

# 내 게시글 시리얼라이저
class BoardPostSummarySerializer(serializers.ModelSerializer):
    author_nickname = serializers.CharField(source='author.nickname', read_only=True)
    board_type = serializers.CharField(read_only=True)
    thumbnail = serializers.URLField(source='thumbnail_url', read_only=True)
    like_count = serializers.IntegerField(read_only=True)
    comment_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = BoardPost
        fields = [
            'id',
            'title',
            'board_type',
            'author_nickname',
            'thumbnail',
            'like_count',
            'comment_count',
            'views',
            'created_at'
        ]

# 내 갤러리 시리얼라이저
class GallerySummarySerializer(serializers.ModelSerializer):
    author_nickname = serializers.CharField(source='author.nickname', read_only=True)
    thumbnail = serializers.URLField(source='thumbnail_url', read_only=True)
    like_count = serializers.IntegerField(read_only=True)
    comment_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = BoardPost
        fields = [
            'id', 'title', 'author_nickname', 'thumbnail',
            'like_count', 'comment_count', 'views', 'created_at'
        ]

# 내 애니리스트 시리얼라이저
class MyAnimeListItemSerializer(serializers.ModelSerializer):
    anime_id = serializers.IntegerField(source='anime.id', read_only=True)  # 상세 이동용
    title = serializers.SerializerMethodField()
    cover_image_m = serializers.CharField(source='anime.cover_image_m', read_only=True)
    genres = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    is_favorite = serializers.BooleanField(read_only=True)

    class Meta:
        model = AnimeList
        fields = [
            'id',          # AnimeList row id
            'anime_id',    # Anime(상세용) id
            'title',
            'cover_image_m',
            'genres',
            'rating',
            'is_favorite'
        ]

    def get_title(self, obj):
        lang = self.context.get("lang", "ko")
        anime = obj.anime
        if lang == "ko":
            return anime.title_ko
        elif lang == "es":
            return anime.title_es
        elif lang == "en":
            return anime.title_romaji
        else:
            return anime.title_ko

    def get_genres(self, obj):
        lang = self.context.get("lang", "ko")
        return getattr(obj.anime, f'genres_{lang}', [])

    def get_rating(self, obj):
        review = AnimeReview.objects.filter(user=obj.user, anime=obj.anime).first()
        return review.rating if review else None