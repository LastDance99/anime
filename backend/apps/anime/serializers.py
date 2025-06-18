from rest_framework import serializers
from apps.core.utils.sanitizer import sanitize_html
from .models import Anime, AnimeReview, AnimeList, ReviewLike
from django.db.models import Avg

# 애니메이션 목록 조회 시 사용할 Serializer
class AnimeSimpleSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()

    class Meta:
        model = Anime
        fields = ["id", "title", "cover_image_l"]

    def get_lang(self):
        return self.context.get("lang", "ko")

    def get_title(self, obj):
        lang = self.get_lang()
        return getattr(obj, f"title_{lang}", obj.title_ko)
    

# 애니메이션 상세 조회 시 사용할 Serializer
class AnimeDetailSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    genres = serializers.SerializerMethodField()
    studios = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()
    source = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    user_rating = serializers.SerializerMethodField()
    user_has_in_animelist = serializers.SerializerMethodField()
    total_animelist_users = serializers.SerializerMethodField()
    start_date = serializers.SerializerMethodField()
    
    class Meta:
        model = Anime
        fields = [
            "id", "title", "cover_image_xl", "banner_image", "start_date", "status",
            "duration", "episodes", "format", "description", "genres", "studios",
            "source", "average_rating", "user_rating", "user_has_in_animelist", "total_animelist_users"
        ]

    def get_lang(self):
        return self.context.get("lang", "ko")

    def get_title(self, obj):
        lang = self.get_lang()
        return {
            "ko": obj.title_ko,
            "es": obj.title_es,
            "en": obj.title_romaji,
            "ja": obj.title_native
        }.get(lang, obj.title_ko)

    def get_description(self, obj):
        return getattr(obj, f"description_{self.get_lang()}", obj.description_ko)

    def get_status(self, obj):
        return getattr(obj, f"status_{self.get_lang()}", obj.status_ko)

    def get_source(self, obj):
        return getattr(obj, f"source_{self.get_lang()}", obj.source_ko)

    def get_genres(self, obj):
        return getattr(obj, f"genres_{self.get_lang()}", [])

    def get_studios(self, obj):
        return obj.studios or []

    def get_start_date(self, obj):
        if obj.start_year:
            y = obj.start_year
            m = f"{obj.start_month:02d}" if obj.start_month else "01"
            d = f"{obj.start_day:02d}" if obj.start_day else "01"
            return f"{y}-{m}-{d}"
        return None

    def get_average_rating(self, obj):
        return round(AnimeReview.objects.filter(anime=obj).aggregate(avg=Avg("rating"))["avg"] or 0, 1)

    def get_user_rating(self, obj):
        user = self.context.get("user")
        if user and not user.is_anonymous:
            review = AnimeReview.objects.filter(anime=obj, user=user).first()
            return review.rating if review else None
        return None

    def get_user_has_in_animelist(self, obj):
        user = self.context.get("user")
        if user and not user.is_anonymous:
            return AnimeList.objects.filter(anime=obj, user=user).exists()
        return False

    def get_total_animelist_users(self, obj):
        return AnimeList.objects.filter(anime=obj).count()


# 애니메이션 리뷰 목록 조회 시 사용할 Serializer
class AnimeReviewSerializer(serializers.ModelSerializer):
    user_nickname = serializers.CharField(source="user.nickname")
    user_profile_image = serializers.CharField(source="user.profile_image")
    like_count = serializers.SerializerMethodField()
    user_rating = serializers.IntegerField(source="rating")
    is_liked_by_me = serializers.SerializerMethodField()

    class Meta:
        model = AnimeReview
        fields = [
            "id", "user_nickname", "user_profile_image", "user_rating",
            "content", "created_at", "like_count", "is_liked_by_me"
        ]

    def get_like_count(self, obj):
        return getattr(obj, "like_count", 0)

    def get_is_liked_by_me(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return ReviewLike.objects.filter(user=request.user, review=obj).exists()
        return False


# 애니메이션 리뷰 생성 시 사용할 Serializer
class AnimeReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimeReview
        fields = ["content", "rating"]

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("평점은 1점 이상 5점 이하로 입력하세요.")
        return value
    
    def create(self, validated_data):
        validated_data["content"] = sanitize_html(validated_data.get("content", ""))
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if "content" in validated_data:
            validated_data["content"] = sanitize_html(validated_data["content"])
        return super().update(instance, validated_data)