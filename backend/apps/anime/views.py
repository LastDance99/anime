from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q, Avg, Count
from .models import Anime, AnimeReview
from .serializers import AnimeSimpleSerializer
from operator import itemgetter

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
            for genre in genres.split(','):
                animes = animes.filter(genres_ko__contains=[genre])
        if year:
            animes = animes.filter(start_year=year)
        if status:
            animes = animes.filter(status_ko=status)
        if season:
            animes = animes.filter(season_ko=season)

        # ✅ 인기순: 가중 평점 계산
        if ordering == "popular":
            C = AnimeReview.objects.aggregate(avg=Avg('rating'))['avg'] or 0
            m = 10

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
