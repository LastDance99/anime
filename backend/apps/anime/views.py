from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q, Avg, Count
from .models import Anime, AnimeReview, ReviewLike, AnimeList
from .serializers import AnimeSimpleSerializer, AnimeDetailSerializer, AnimeReviewSerializer, AnimeReviewCreateSerializer
from operator import itemgetter
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework import status
from apps.profiles.utils.activity import create_user_activity
from apps.profiles.utils.localization import get_localized_title

# Anime 통합검색 API
class AnimeSearchView(APIView):
    def get(self, request):
        # ✅ 언어 설정: 로그인 > Accept-Language > 기본 'ko'
        if request.user.is_authenticated:
            lang = getattr(request.user, 'language', 'ko')
        else:
            accept_lang = request.headers.get("Accept-Language", "").lower()
            if accept_lang.startswith("es"):
                lang = "es"
            elif accept_lang.startswith("en"):
                lang = "en"
            else:
                lang = "ko"

        # ✅ 검색/필터 파라미터
        query = request.GET.get("q", "")
        genres = request.GET.get("genres")
        year = request.GET.get("year")
        status = request.GET.get("status")
        season = request.GET.get("season")
        format_ = request.GET.get("format")
        source = request.GET.get("source")
        ordering = request.GET.get("ordering", "-start_year")
        offset = int(request.GET.get("offset", 0))
        limit = int(request.GET.get("limit", 50))

        # ✅ 기본 쿼리셋 + 평점 정보
        animes = Anime.objects.annotate(
            avg_rating=Avg('animereview__rating'),
            review_count=Count('animereview')
        )

        # ✅ 언어별 검색 필드 동적 처리
        if query:
            search_field_map = {
                "ko": "title_ko",
                "es": "title_es",
                "en": "title_romaji"
            }
            search_field = search_field_map.get(lang, "title_ko")
            animes = animes.filter(Q(**{f"{search_field}__icontains": query}))

        # ✅ 필터링
        if genres:
            genre_field = f"genres_{lang}"
            for genre in genres.split(','):
                animes = animes.filter(**{f"{genre_field}__contains": [genre]})
        if year:
            animes = animes.filter(start_year=year)
        if status:
            animes = animes.filter(**{f"status_{lang}": status})
        if season:
            animes = animes.filter(**{f"season_{lang}": season})
        if format_:
            animes = animes.filter(format=format_)
        if source:
            animes = animes.filter(**{f"source_{lang}": source})

        # ✅ 인기순: 가중 평점 계산
        if ordering == "popular":
            C = AnimeReview.objects.aggregate(avg=Avg('rating'))['avg'] or 0
            m = 10 # 최소 평점 수 기준

            animes = animes.filter(review_count__gte=1)

            anime_list = []
            for anime in animes:
                v = anime.review_count
                S = anime.avg_rating or 0
                score = (v / (v + m)) * S + (m / (v + m)) * C
                anime_list.append((score, anime))

            sorted_animes = sorted(anime_list, key=itemgetter(0), reverse=True)
            paged_animes = sorted_animes[offset:offset + limit]

            results = AnimeSimpleSerializer(
                [a for _, a in paged_animes], many=True, context={"lang": lang}
            ).data

            return Response({
                "count": len(anime_list),
                "results": results
            })

        # ✅ 정렬 (최신순 / 오래된순)
        if ordering == "-start_year":
            animes = animes.order_by('-start_year', '-start_month', '-start_day')
        elif ordering == "start_year":
            animes = animes.order_by('start_year', 'start_month', 'start_day')
        else:
            animes = animes.order_by(ordering)

        # ✅ 무한스크롤 처리
        total_count = animes.count()
        animes = animes[offset:offset + limit]

        # ✅ 응답
        serializer = AnimeSimpleSerializer(animes, many=True, context={"lang": lang})
        return Response({
            "count": total_count,
            "results": serializer.data
        })

# Anime 상세 조회 API
class AnimeDetailView(APIView):
    def get(self, request, anime_id):
        anime = get_object_or_404(Anime, id=anime_id)

        # 언어 우선순위 설정
        if request.user.is_authenticated:
            lang = getattr(request.user, "language", "ko")
        else:
            accept_lang = request.headers.get("Accept-Language", "").lower()
            if accept_lang.startswith("es"):
                lang = "es"
            elif accept_lang.startswith("en"):
                lang = "en"
            else:
                lang = "ko"

        serializer = AnimeDetailSerializer(anime, context={
            "user": request.user,
            "lang": lang
        })
        return Response(serializer.data)
    

# Anime 리뷰 목록 조회/리뷰 작성 API
class AnimeReviewListCreateView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, anime_id):
        sort = request.GET.get("sort", "latest")
        qs = AnimeReview.objects.filter(anime_id=anime_id).annotate(
            like_count=Count("reviewlike")
        )

        if sort == "oldest":
            qs = qs.order_by("created_at")
        elif sort == "likes":
            qs = qs.order_by("-like_count", "-created_at")
        else:
            qs = qs.order_by("-created_at")

        serializer = AnimeReviewSerializer(qs, many=True, context={"request": request})
        return Response({"count": qs.count(), "results": serializer.data})

    def post(self, request, anime_id):
        if AnimeReview.objects.filter(anime_id=anime_id, user=request.user).exists():
            return Response({"detail": "이미 리뷰를 작성하셨습니다."}, status=400)

        anime = get_object_or_404(Anime, id=anime_id)
        serializer = AnimeReviewCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, anime=anime)

            lang = getattr(request.user, "language", "ko")
            create_user_activity(
                user=request.user,
                type="review_add",
                target_id=anime.id,
                target_title=get_localized_title(anime, lang),
                target_image=anime.cover_image_m
            )

            return Response({"detail": "리뷰가 등록되었습니다."}, status=201)
        return Response(serializer.errors, status=400)


# Anime 리뷰 좋아요 API
class AnimeReviewLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, anime_id, review_id):
        review = get_object_or_404(AnimeReview, id=review_id, anime_id=anime_id)

        # 중복 방지
        if ReviewLike.objects.filter(user=request.user, review=review).exists():
            return Response({"detail": "이미 좋아요를 눌렀습니다."}, status=status.HTTP_400_BAD_REQUEST)

        ReviewLike.objects.create(user=request.user, review=review)
        return Response({"detail": "좋아요 등록 완료!"}, status=status.HTTP_201_CREATED)


# Anime 리뷰 수정/삭제 API
class AnimeReviewUpdateDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def get_review(self, anime_id, review_id):
        return get_object_or_404(AnimeReview, id=review_id, anime_id=anime_id)

    def put(self, request, anime_id, review_id):
        review = self.get_review(anime_id, review_id)

        if review.user != request.user:
            return Response({"detail": "본인의 리뷰만 수정할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)

        serializer = AnimeReviewCreateSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "리뷰가 수정되었습니다."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, anime_id, review_id):
        review = self.get_review(anime_id, review_id)

        if review.user != request.user:
            return Response({"detail": "본인의 리뷰만 삭제할 수 있습니다."}, status=status.HTTP_403_FORBIDDEN)
        
        anime = review.anime  # 삭제 전에 애니 가져오기
        lang = getattr(request.user, "language", "ko")

        # 활동 기록
        create_user_activity(
            user=request.user,
            type="review_remove",
            target_id=anime.id,
            target_title=get_localized_title(anime, lang),
            target_image=anime.cover_image_m
        )

        review.delete()
        return Response({"detail": "리뷰가 삭제되었습니다."}, status=status.HTTP_204_NO_CONTENT)
    

# Anime 평점 등록/수정/삭제 API
class AnimeRatingView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, anime_id):
        anime = get_object_or_404(Anime, id=anime_id)
        rating = request.data.get("rating")

        try:
            rating = int(rating)
            if not (1 <= rating <= 5):
                raise ValueError
        except:
            return Response({"detail": "평점은 1~5 사이의 정수여야 합니다."}, status=400)

        review, created = AnimeReview.objects.get_or_create(anime=anime, user=request.user)

        review.rating = rating
        if created:
            review.content = ""  # 평점만 남길 땐 빈 문자열 허용
        review.save()

        return Response({"detail": "평점이 등록되었습니다." if created else "평점이 수정되었습니다."}, status=201 if created else 200)

    def delete(self, request, anime_id):
        anime = get_object_or_404(Anime, id=anime_id)
        review = AnimeReview.objects.filter(anime=anime, user=request.user).first()

        if not review:
            return Response({"detail": "등록된 평점이 없습니다."}, status=404)

        review.delete()
        return Response({"detail": "평점이 삭제되었습니다."}, status=204)

# Anime 리스트 추가/제거 API
class AnimeListToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, anime_id):
        anime = get_object_or_404(Anime, id=anime_id)

        if AnimeList.objects.filter(anime=anime, user=request.user).exists():
            return Response({"detail": "이미 리스트에 추가되어 있습니다."}, status=400)

        AnimeList.objects.create(anime=anime, user=request.user)

        # 활동 기록
        lang = getattr(request.user, "language", "ko")
        title = get_localized_title(anime, lang)

        create_user_activity(
            user=request.user,
            type="anime_add",
            target_id=anime.id,
            target_title=title,
            target_image=anime.cover_image_m
        )

        return Response({"detail": "애니 리스트에 추가되었습니다."}, status=201)

    def delete(self, request, anime_id):
        anime = get_object_or_404(Anime, id=anime_id)
        animelist = AnimeList.objects.filter(anime=anime, user=request.user).first()

        if not animelist:
            return Response({"detail": "리스트에 존재하지 않는 애니입니다."}, status=404)
        
        # 활동 기록
        lang = getattr(request.user, "language", "ko")
        title = get_localized_title(anime, lang)

        create_user_activity(
            user=request.user,
            type="anime_remove",
            target_id=anime.id,
            target_title=title,
            target_image=anime.cover_image_m
        )

        animelist.delete()
        return Response({"detail": "애니 리스트에서 제거되었습니다."}, status=204)
    