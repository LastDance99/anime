from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q, Avg, Count
from django.db.models.functions import Coalesce
from .models import Anime, AnimeReview, ReviewLike, AnimeList
from .serializers import AnimeSimpleSerializer, AnimeDetailSerializer, AnimeReviewSerializer, AnimeReviewCreateSerializer
from operator import itemgetter
from rest_framework.generics import get_object_or_404
from rest_framework import status
from apps.profiles.models import Attendance
from apps.profiles.utils.activity import create_user_activity
from apps.profiles.utils.localization import get_localized_title

# Anime 통합검색 API
class AnimeSearchView(APIView):
    def get(self, request):
        # 언어 설정: 로그인 > Accept-Language > 기본 'ko'
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

        # 검색/필터 파라미터
        query = request.GET.get("q", "")
        genres = request.GET.get("genres")
        year = request.GET.get("year")
        status = request.GET.get("status")
        season = request.GET.get("season")
        format_ = request.GET.get("format")
        source = request.GET.get("source")
        order = request.GET.get("ordering", "-start_year")
        offset = int(request.GET.get("offset", 0))
        limit = int(request.GET.get("limit", 50))

        # 기본 쿼리셋 + 평점 정보
        animes = Anime.objects.annotate(
            avg_rating=Avg('animereview__rating'),
            review_count=Count('animereview')
        )
        # 헨타이 제외ㅎㅎ(커버 이미지 너무 빡셈)
        animes = animes.exclude(genres_ko__contains=['헨타이']).exclude(genres_en__contains=['Hentai']).exclude(genres_es__contains=['Hentai'])

        # 언어별 검색 필드 동적 처리
        if query:
            search_field_map = {
                "ko": "title_ko",
                "es": "title_es",
                "en": "title_romaji"
            }
            search_field = search_field_map.get(lang, "title_ko")
            animes = animes.filter(Q(**{f"{search_field}__icontains": query}))

        # 필터링
        if genres:
            genre_field = f"genres_{lang}"
            for genre in genres.split(','):
                animes = animes.filter(**{f"{genre_field}__contains": [genre]})
        if year:
            if str(year).endswith("-"):
                try:
                    year_limit = int(year.rstrip("-"))
                    animes = animes.filter(start_year__lte=year_limit)
                except ValueError:
                    pass
            elif "-" in year:
                try:
                    start, end = map(int, year.split("-"))
                    animes = animes.filter(start_year__gte=start, start_year__lte=end)
                except ValueError:
                    pass
            else:
                try:
                    animes = animes.filter(start_year=int(year))
                except ValueError:
                    pass
        if status:
            animes = animes.filter(**{f"status_{lang}": status})
        if season:
            animes = animes.filter(**{f"season_{lang}": season})
        if format_:
            animes = animes.filter(format=format_)
        if source:
            animes = animes.filter(**{f"source_{lang}": source})

        ### 정렬 분기
        if order == "popular":
            # 인기순: 애니리스트(찜) 수 기준 내림차순
            animes = animes.annotate(user_count=Count('animelist' , distinct=True)).order_by('-user_count', '-start_year')
            total_count = animes.count()
            animes = animes[offset:offset + limit]
            serializer = AnimeSimpleSerializer(animes, many=True, context={"lang": lang})
            return Response({
                "count": total_count,
                "results": serializer.data
            })

        elif order == "-rating":
            # 평점순(가중평점)
            m = 10  # 최소 리뷰수 (가중치)
            C = AnimeReview.objects.aggregate(avg=Avg('rating'))['avg'] or 0

            animes = animes.annotate(
                avg_rating=Avg('animereview__rating'),
                review_count=Count('animereview')
            )

            anime_list = []
            for anime in animes:
                v = anime.review_count or 0
                S = anime.avg_rating or 0
                score = (v / (v + m)) * S + (m / (v + m)) * C if v > 0 else 0
                anime_list.append((score, anime))

            sorted_animes = sorted(anime_list, key=lambda x: x[0], reverse=True)
            paged_animes = sorted_animes[offset:offset + limit]

            results = AnimeSimpleSerializer(
                [a for _, a in paged_animes], many=True, context={"lang": lang}
            ).data

            return Response({
                "count": len(anime_list),
                "results": results
            })

        elif order == "-start_year":
            # 최신순: 방영년도 내림차순
            animes = animes.order_by('-start_year', '-start_month', '-start_day')
        elif order == "start_year":
            # 오래된순: 방영년도 오름차순
            animes = animes.order_by('start_year', 'start_month', 'start_day')
        else:
            # 기타 정렬
            animes = animes.order_by(order)

        # 최신순, 오래된순, 기타 정렬일 때 페이징 및 응답
        total_count = animes.count()
        animes = animes[offset:offset + limit]
        serializer = AnimeSimpleSerializer(animes, many=True, context={"lang": lang})
        return Response({
            "count": total_count,
            "results": serializer.data
        })
    
# Anime 필터 메타데이터 조회 API
class AnimeFilterMetaView(APIView):
    def get(self, request):
        lang = request.GET.get('lang', 'ko')
        # genres (모든 애니의 genres_ko를 합쳐서 set)
        genres = set()
        seasons = set()
        years = set()
        formats = set()
        sources = set()
        statuses = set()

        # 모든 애니메이션 쿼리
        qs = Anime.objects.all()

        for anime in qs:
            # 장르 (JSONField, 리스트)
            genres.update(getattr(anime, f'genres_{lang}', []) or [])
            # 시즌
            seasons.add(getattr(anime, f'season_{lang}', None))
            # 연도
            years.add(anime.start_year)
            # 포맷, 소스, 상태
            formats.add(anime.format)
            sources.add(getattr(anime, f'source_{lang}', None))
            statuses.add(getattr(anime, f'status_{lang}', None))

        # None, 빈값 등 정리
        def clean_set(s): return sorted([x for x in s if x and str(x).strip() != ''])

        # genres에서 '헨타이' 제거
        genres.discard('헨타이')   
        genres.discard('Hentai')  

        return Response({
            "genres": clean_set(genres),
            "seasons": clean_set(seasons),
            "years": sorted([y for y in years if y]),
            "formats": clean_set(formats),
            "sources": clean_set(sources),
            "statuses": clean_set(statuses),
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
            review = serializer.save(user=request.user, anime=anime)

            lang = getattr(request.user, "language", "ko")
            create_user_activity(
                user=request.user,
                type="review_add",
                target_id=anime.id,
                target_title=get_localized_title(anime, lang),
                target_image=anime.cover_image_m
            )

            # 리뷰 작성 직후, 유저정보까지 포함된 리뷰 데이터 반환!
            review_data = AnimeReviewSerializer(review, context={"request": request}).data

            return Response(review_data, status=201)
        return Response(serializer.errors, status=400)


# Anime 리뷰 좋아요 API
class AnimeReviewLikeView(APIView):

    def post(self, request, anime_id, review_id):
        review = get_object_or_404(AnimeReview, id=review_id, anime_id=anime_id)

        # 중복 체크
        if ReviewLike.objects.filter(user=request.user, review=review).exists():
            return Response({"detail": "이미 좋아요를 눌렀습니다."}, status=status.HTTP_400_BAD_REQUEST)

        # 좋아요 추가
        ReviewLike.objects.create(user=request.user, review=review)

        # 확장된 응답
        like_count = ReviewLike.objects.filter(review=review).count()

        return Response({
            "id": review.id,
            "like_count": like_count,
            "liked_by_user": True,
        }, status=status.HTTP_201_CREATED)


# Anime 리뷰 수정/삭제 API
class AnimeReviewUpdateDeleteView(APIView):

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
    

# Anime 평점 등록/수정/삭제 API ####post메소드로 업데이트####
class AnimeRatingView(APIView):

    def post(self, request, anime_id):
        anime = get_object_or_404(Anime, id=anime_id)
        rating = request.data.get("rating")

        try:
            rating = int(rating)
            if not (1 <= rating <= 5):
                raise ValueError
        except:
            return Response({"detail": "평점은 1~5 사이의 정수여야 합니다."}, status=400)

        review, created = AnimeReview.objects.get_or_create(
            anime=anime, 
            user=request.user, 
            defaults={'rating': rating, 'content': ''},
            )

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

    
# Anime 미니 프로필 API
class AnimeMiniProfileView(APIView):

    def get(self, request):
        user = request.user
        animelist_count = AnimeList.objects.filter(user=user).count()
        review_count = AnimeReview.objects.filter(user=user).count()
        attendance_count = Attendance.objects.filter(user=user).count()
        return Response({
            "animelist_count": animelist_count,
            "review_count": review_count,
            "attendance_count": attendance_count
        })
    
from rest_framework.generics import ListAPIView
from django.db.models import Count, Avg, F
from .serializers import AnimeSimpleSerializer

# 인기 점수: 찜(AnimeList, is_favorite=True) 수 + (평균 평점 * 10)
class PopularAnimeRankingView(ListAPIView):
    serializer_class = AnimeSimpleSerializer

    def get_queryset(self):
        queryset = (
            Anime.objects
            .annotate(
                favorite_count=Count('animelist', distinct=True),
                avg_rating=Coalesce(Avg("animereview__rating", distinct=True), 0.0)
            )
            .annotate(
                popularity_score=F('favorite_count') + (F('avg_rating') * 10)
            )
            .order_by('-popularity_score', '-favorite_count', '-avg_rating')
        )
        limit = int(self.request.GET.get("limit", 10))
        return queryset[:limit]

# 방영예정 인기 애니 (status_ko='방영예정' 또는 status_en='upcoming' 등)
class UpcomingAnimeRankingAPIView(APIView):
    def get(self, request):
        limit = int(request.query_params.get("limit", 5))
        lang = request.query_params.get("lang", "ko")

        try:
            queryset = (
                Anime.objects
                .filter(status_ko="아직 방영되지 않음")
                .annotate(
                    favorite_count=Coalesce(Count("animelist", distinct=True), 0),
                    avg_rating=Coalesce(Avg("animereview__rating", distinct=True), 0.0),
                )
                .annotate(
                    popularity_score=F("favorite_count") + F("avg_rating") * 10
                )
                .order_by("-popularity_score")[:limit]
            )

            serializer = AnimeSimpleSerializer(queryset, many=True, context={"lang": lang})
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            print("🔥 기대작 랭킹 에러:", str(e))
            return Response({"detail": "서버 오류가 발생했습니다."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)