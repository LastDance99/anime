from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
from .utils.pagination import ActivityPagePagination, CommentPagePagination, ContentPagePagination
from rest_framework.generics import ListAPIView
from django.db.models import Q, Count, Subquery, OuterRef, IntegerField
from django.contrib.auth import get_user_model
from .models import ProfileComment, UserActivity, Attendance
from apps.boards.models import BoardPost
from apps.anime.models import AnimeReview, AnimeList
from django.shortcuts import get_object_or_404
from apps.anime.serializers import AnimeSimpleSerializer
from django.db.models import Avg, Max
from datetime import date
from .serializers import (
    UserProfileSerializer,
    ProfileCommentSerializer, 
    UserActivitySerializer,
    AnimeListStatsSerializer,
    AttendanceStatsSerializer,
    AnimeFavoriteToggleSerializer,
    AboutUpdateSerializer,
    BoardPostSummarySerializer,
    GallerySummarySerializer,
    MyAnimeListItemSerializer,
)

User = get_user_model()

# 프로필 개요 뷰
class ProfileOverviewView(APIView):

    def get(self, request, user_id=None):
        # 1. 유저 결정
        if user_id is None:
            if not request.user.is_authenticated:
                return Response({"detail": "로그인이 필요합니다."}, status=401)
            user = request.user
            Attendance.objects.get_or_create(user=user, date=date.today())
        else:
            user = get_object_or_404(User, id=user_id)

        # 2. 정적 프로필 정보
        profile_data = UserProfileSerializer(user).data

        # 3. 동적 통계/정보
        total_animes = AnimeList.objects.filter(user=user).count()
        avg_rating = AnimeReview.objects.filter(user=user).aggregate(avg=Avg('rating'))['avg']
        avg_rating = round(avg_rating, 2) if avg_rating is not None else None
        total_attendance = Attendance.objects.filter(user=user).count()
        last_attendance = Attendance.objects.filter(user=user).aggregate(last=Max('date'))['last']

        favorites = (
            AnimeList.objects.filter(user=user, is_favorite=True)
            .select_related('anime').order_by('created_at')[:16]
        )
        lang = getattr(user, 'language', 'ko')
        favorite_animes = AnimeSimpleSerializer(
            [al.anime for al in favorites],
            many=True,
            context={'lang': lang}
        ).data

        today_checked = None
        if user_id is None:
            today_checked = Attendance.objects.filter(user=user, date=date.today()).exists()

        # 4. 활동 (최신 20개)
        user_activities = UserActivity.objects.filter(user=user).order_by('-created_at')[:20]
        activity_list = UserActivitySerializer(user_activities, many=True).data

        # 5. 코멘트 (최신 20개)
        comments = ProfileComment.objects.filter(user=user).order_by('-created_at')[:20]
        comment_list = ProfileCommentSerializer(comments, many=True).data

        # 6. 통합 응답
        profile_data.update({
            "total_animes": total_animes,
            "avg_rating": avg_rating,
            "total_attendance": total_attendance,
            "last_attendance": last_attendance,
            "favorite_animes": favorite_animes,
            "activity": activity_list,
            "comments": comment_list,
        })
        if today_checked is not None:
            profile_data["today_checked"] = today_checked

        return Response(profile_data)

# 자기소개 업데이트 뷰
class UpdateAboutView(APIView):

    def patch(self, request):
        user = request.user
        serializer = AboutUpdateSerializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"about": serializer.data["about"]}, status=status.HTTP_200_OK)

# 1. 코멘트 리스트 조회 & 작성 (GET/POST)
class ProfileCommentListCreateView(generics.ListCreateAPIView):
    serializer_class = ProfileCommentSerializer
    pagination_class = CommentPagePagination

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return ProfileComment.objects.filter(user_id=user_id).order_by('-created_at')

    def perform_create(self, serializer):
        user_id = self.kwargs['user_id']
        serializer.save(user_id=user_id, author=self.request.user)

# 2. 코멘트 삭제 (DELETE)
class ProfileCommentDeleteView(generics.DestroyAPIView):
    queryset = ProfileComment.objects.all()

    def get_object(self):
        comment = super().get_object()
        user_id = self.kwargs['user_id']
        # 삭제 권한: 작성자 or 프로필 주인
        if (comment.author != self.request.user) and (comment.user_id != self.request.user.id):
            raise PermissionDenied("삭제 권한 없음: 프로필 주인 또는 작성자만 삭제할 수 있습니다.")
        return comment
    

# 프로필 통계(애니 총 갯수, 평균 점수) 조회 뷰
class AnimeListStatsView(APIView):
    def get(self, request, user_id):
        # 1. 내가 리스트에 추가한 애니 총 갯수
        total_animes = AnimeList.objects.filter(user_id=user_id).count()

        # 2. 내가 매긴 리뷰 평균 점수
        avg_rating = AnimeReview.objects.filter(user_id=user_id).aggregate(
            avg=Avg('rating')
        )['avg']
        avg_rating = round(avg_rating, 2) if avg_rating is not None else None

        data = {
            "total_animes": total_animes,
            "avg_rating": avg_rating
        }
        serializer = AnimeListStatsSerializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# 프로필 출석 통계 조회 뷰
class AttendanceStatsView(APIView):
    def get(self, request, user_id):
        # 총 출석일수
        total_attendance = Attendance.objects.filter(user_id=user_id).count()
        # 마지막 출석일
        last_attendance = Attendance.objects.filter(user_id=user_id).aggregate(
            last=Max('date')
        )['last']

        data = {
            "total_attendance": total_attendance,
            "last_attendance": last_attendance
        }
        serializer = AttendanceStatsSerializer(data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# 프로필 최애 애니메이션 목록 조회 뷰
class FavoriteAnimeListView(generics.ListAPIView):
    serializer_class = AnimeSimpleSerializer
    pagination_class = None  # 16개 제한, 무한 스크롤X

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return (
            AnimeList.objects
            .filter(user_id=user_id, is_favorite=True)
            .select_related('anime')
            .order_by('created_at')[:16]
        )

    def get_serializer_context(self):
        # lang 설정 전달 (로그인유저/헤더 등에서 가져오기)
        lang = self.request.user.language if self.request.user.is_authenticated else "ko"
        return {"lang": lang}

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        animes = [al.anime for al in queryset]
        serializer = self.get_serializer(animes, many=True)
        return Response(serializer.data)
    
# 애니메이션 최애 추가/제거 토글 뷰
class AnimeFavoriteToggleView(APIView):

    def patch(self, request, anime_id):
        serializer = AnimeFavoriteToggleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        is_favorite = serializer.validated_data["is_favorite"]

        user = request.user
        try:
            animelist = AnimeList.objects.get(user=user, anime_id=anime_id)
        except AnimeList.DoesNotExist:
            return Response({"detail": "해당 애니는 내 리스트에 추가되어 있지 않습니다."}, status=404)

        # 최애 16개 제한
        if is_favorite:
            favorite_count = AnimeList.objects.filter(user=user, is_favorite=True).count()
            if favorite_count >= 16 and not animelist.is_favorite:
                return Response({"detail": "최애 애니는 최대 16개까지만 등록할 수 있습니다."}, status=400)

        animelist.is_favorite = is_favorite
        animelist.save()

        return Response({
            "success": True,
            "anime_id": anime_id,
            "is_favorite": animelist.is_favorite,
        })

# 프로필 내활동 목록 조회 뷰
class UserActivityListView(generics.ListAPIView):
    serializer_class = UserActivitySerializer
    pagination_class = ActivityPagePagination

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return UserActivity.objects.filter(user_id=user_id)
    

# 프로필 컨텐츠 뷰
class ProfileContentListView(ListAPIView):
    pagination_class = ContentPagePagination

    # --- 시리얼라이저 분기 ---
    def get_serializer_class(self):
        content_type = self.request.GET.get('type', 'post')
        if content_type == "gallery":
            return GallerySummarySerializer
        elif content_type == "anime":
            return MyAnimeListItemSerializer
        return BoardPostSummarySerializer  # 게시글 탭(기본값)

    # --- 언어 context 동적 처리 ---
    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.request.user.is_authenticated:
            lang = getattr(self.request.user, 'language', 'ko')
        else:
            accept_lang = self.request.headers.get("Accept-Language", "").lower()
            if accept_lang.startswith("es"):
                lang = "es"
            elif accept_lang.startswith("en"):
                lang = "en"
            else:
                lang = "ko"
        context['lang'] = lang
        return context

    # --- 쿼리셋 분기 ---
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        request = self.request
        content_type = request.GET.get('type', 'post')
        lang = self.get_serializer_context().get("lang", "ko")

        if content_type == "post":
            # 게시글 탭
            q = request.GET.get('q', '')
            order = request.GET.get('order', 'latest')
            qs = BoardPost.objects.filter(author_id=user_id, board_type="post")
            qs = qs.annotate(
                like_count=Count('likes', distinct=True),
                comment_count=Count('comments', distinct=True)
            )
            if q:
                qs = qs.filter(Q(title__icontains=q) | Q(content__icontains=q))
            if order == "oldest":
                qs = qs.order_by('created_at')
            elif order == "like":
                qs = qs.order_by('-like_count', '-created_at')
            else:
                qs = qs.order_by('-created_at')
            return qs

        elif content_type == "gallery":
            # 갤러리 탭
            q = request.GET.get('q', '')
            order = request.GET.get('order', 'latest')
            qs = BoardPost.objects.filter(author_id=user_id, board_type="gallery")
            qs = qs.annotate(
                like_count=Count('likes', distinct=True),
                comment_count=Count('comments', distinct=True)
            )
            if q:
                qs = qs.filter(Q(title__icontains=q) | Q(content__icontains=q))
            if order == "oldest":
                qs = qs.order_by('created_at')
            elif order == "like":
                qs = qs.order_by('-like_count', '-created_at')
            else:
                qs = qs.order_by('-created_at')
            return qs

        elif content_type == "anime":
            # 내 애니리스트 탭 (통합검색 구조와 완전히 동일)
            qs = AnimeList.objects.filter(user_id=user_id).select_related('anime')
            query = request.GET.get("q", "")
            genres = request.GET.get("genres")
            year = request.GET.get("year")
            status = request.GET.get("status")
            season = request.GET.get("season")
            format_ = request.GET.get("format")
            source = request.GET.get("source")
            ordering = request.GET.get("ordering")

            # 검색
            if query:
                search_field_map = {
                    "ko": "anime__title_ko",
                    "es": "anime__title_es",
                    "en": "anime__title_romaji"
                }
                search_field = search_field_map.get(lang, "anime__title_ko")
                qs = qs.filter(Q(**{f"{search_field}__icontains": query}))

            # 장르
            if genres:
                genre_field = f"anime__genres_{lang}"
                for genre in genres.split(','):
                    qs = qs.filter(**{f"{genre_field}__contains": [genre]})

            if year:
                qs = qs.filter(anime__start_year=year)
            if status:
                qs = qs.filter(**{f"anime__status_{lang}": status})
            if season:
                qs = qs.filter(**{f"anime__season_{lang}": season})
            if format_:
                qs = qs.filter(anime__format=format_)
            if source:
                qs = qs.filter(**{f"anime__source_{lang}": source})

            # 정렬 4종만!
            if ordering == "favorite":
                qs = qs.order_by('-is_favorite', '-created_at')
            elif ordering == "added" or ordering is None:
                qs = qs.order_by('-created_at')
            elif ordering == "oldest":
                qs = qs.order_by('created_at')
            elif ordering == "rating":
                rating_subquery = AnimeReview.objects.filter(
                    user_id=user_id, anime=OuterRef('anime_id')
                ).values('rating')[:1]
                qs = qs.annotate(user_rating=Subquery(rating_subquery, output_field=IntegerField()))
                qs = qs.order_by('-user_rating', '-created_at')
            else:
                qs = qs.order_by('-created_at')
            return qs

        # 아무 타입도 아니면 빈 쿼리셋
        return BoardPost.objects.none()
    



