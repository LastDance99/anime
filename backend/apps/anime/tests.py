from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from apps.anime.models import Anime, AnimeReview, ReviewLike, AnimeList

User = get_user_model()

class AnimeAPITestCase(APITestCase):
    def setUp(self):
        # 1. 유저 생성 및 로그인 (JWT/Session 없이 강제 로그인)
        self.user = User.objects.create_user(
            email='tester@example.com', password='testpw1234', nickname='테스터'
        )
        self.client.force_authenticate(self.user)

        # 2. 테스트용 애니 생성
        self.anime = Anime.objects.create(
            title_romaji='Demon Slayer',
            title_native='鬼滅の刃',
            title_ko='귀멸의 칼날',
            title_es='Guardianes de la Noche',
            description_ko='일본 시대의 귀살대 이야기.',
            description_en='A tale of demon slayers in Japan.',
            description_es='Una historia de cazadores de demonios en Japón.',
            format='TV',
            episodes=26,
            duration=24,
            start_year=2019,
            start_month=4,
            start_day=6,
            end_year=2019,
            end_month=9,
            end_day=28,
            season_ko='봄',
            season_en='Spring',
            season_es='Primavera',
            status_ko='방영완료',
            status_en='Finished',
            status_es='Terminado',
            source_ko='만화',
            source_en='Manga',
            source_es='Manga',
            cover_image_xl='https://test.com/xl.jpg',
            cover_image_l='https://test.com/l.jpg',
            cover_image_m='https://test.com/m.jpg',
            banner_image='https://test.com/banner.jpg',
            genres_ko=["액션", "판타지"],
            genres_en=["Action", "Fantasy"],
            genres_es=["Acción", "Fantasía"],
            studios=["ufotable"]
        )

    def test_애니_검색(self):
        # 통합검색(AnimeSearchView)
        url = reverse('anime-search')
        response = self.client.get(url, {'q': '귀멸'})
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(response.data['count'], 1)
        self.assertEqual(response.data['results'][0]['title'], '귀멸의 칼날')

    def test_애니_상세(self):
        # AnimeDetailView
        url = reverse('anime-detail', kwargs={'anime_id': self.anime.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], '귀멸의 칼날')
        self.assertIn('genres', response.data)
        self.assertEqual(response.data['format'], 'TV')

    def test_애니_필터메타(self):
        url = '/api/anime/filters/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertIn('genres', response.data)
        self.assertIn('봄', response.data['seasons'])

    def test_리뷰_작성_및_조회(self):
        # AnimeReviewListCreateView POST
        url = reverse('anime-review-list-create', kwargs={'anime_id': self.anime.id})
        data = {'content': '인생작입니다', 'rating': 5}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['detail'], '리뷰가 등록되었습니다.')

        # GET 리뷰 목록
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['results'][0]['content'], '인생작입니다')
        self.assertEqual(response.data['results'][0]['user_rating'], 5)

    def test_리뷰_수정_삭제(self):
        # 리뷰 선 작성
        review = AnimeReview.objects.create(
            anime=self.anime, user=self.user, content='수정전', rating=3
        )
        url = reverse('anime-review-update-delete', kwargs={'anime_id': self.anime.id, 'review_id': review.id})

        # PUT (수정)
        data = {'content': '수정후', 'rating': 4}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, 200)
        review.refresh_from_db()
        self.assertEqual(review.content, '수정후')
        self.assertEqual(review.rating, 4)

        # DELETE (삭제)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        self.assertFalse(AnimeReview.objects.filter(id=review.id).exists())

    def test_리뷰_좋아요(self):
        review = AnimeReview.objects.create(
            anime=self.anime, user=self.user, content='좋아요용', rating=5
        )
        url = reverse('anime-review-like', kwargs={'anime_id': self.anime.id, 'review_id': review.id})
        response = self.client.post(url)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['detail'], '좋아요 등록 완료!')
        # 중복 좋아요 방지
        response = self.client.post(url)
        self.assertEqual(response.status_code, 400)

    def test_평점_등록_수정_삭제(self):
        # 평점 등록
        url = reverse('anime-rating', kwargs={'anime_id': self.anime.id})
        response = self.client.post(url, {'rating': 5})
        self.assertEqual(response.status_code, 201)
        self.assertIn('평점이 등록되었습니다.', response.data['detail'])
        # 평점 수정
        response = self.client.post(url, {'rating': 3})
        self.assertEqual(response.status_code, 200)
        self.assertIn('평점이 수정되었습니다.', response.data['detail'])
        # 평점 삭제
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)

    def test_애니_리스트_추가_제거(self):
        url = reverse('anime-animelist', kwargs={'anime_id': self.anime.id})
        # 추가
        response = self.client.post(url)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data['detail'], '애니 리스트에 추가되었습니다.')
        # 중복 추가 방지
        response = self.client.post(url)
        self.assertEqual(response.status_code, 400)
        # 제거
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)

class AnimeAPIExceptionTestCase(APITestCase):
    def setUp(self):
        # 로그인 유저 2명
        self.user1 = User.objects.create_user(
            email='u1@test.com', password='pw1234', nickname='테스터1'
        )
        self.user2 = User.objects.create_user(
            email='u2@test.com', password='pw1234', nickname='테스터2'
        )
        self.anime = Anime.objects.create(
            title_romaji='Attack on Titan',
            title_native='進撃の巨人',
            title_ko='진격의 거인',
            title_es='Ataque a los Titanes',
            description_ko='거인과의 사투.',
            description_en='Battle with titans.',
            description_es='Batalla con titanes.',
            format='TV',
            episodes=25,
            duration=24,
            start_year=2013,
            start_month=4,
            start_day=6,
            end_year=2013,
            end_month=9,
            end_day=28,
            season_ko='봄',
            season_en='Spring',
            season_es='Primavera',
            status_ko='방영완료',
            status_en='Finished',
            status_es='Terminado',
            source_ko='만화',
            source_en='Manga',
            source_es='Manga',
            cover_image_xl='https://test.com/aot_xl.jpg',
            cover_image_l='https://test.com/aot_l.jpg',
            cover_image_m='https://test.com/aot_m.jpg',
            banner_image='https://test.com/aot_banner.jpg',
            genres_ko=["액션", "판타지"],
            genres_en=["Action", "Fantasy"],
            genres_es=["Acción", "Fantasía"],
            studios=["WIT STUDIO"]
        )

    def test_존재하지_않는_애니(self):
        self.client.force_authenticate(self.user1)
        url = reverse('anime-detail', kwargs={'anime_id': 99999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)

        url = reverse('anime-rating', kwargs={'anime_id': 99999})
        response = self.client.post(url, {'rating': 4})
        self.assertEqual(response.status_code, 404)

    def test_리뷰_중복작성(self):
        self.client.force_authenticate(self.user1)
        url = reverse('anime-review-list-create', kwargs={'anime_id': self.anime.id})
        self.client.post(url, {'content': '최고!', 'rating': 5})
        # 중복 작성
        response = self.client.post(url, {'content': '또써', 'rating': 5})
        self.assertEqual(response.status_code, 400)
        self.assertIn('이미 리뷰를 작성하셨습니다.', str(response.data))

    def test_리뷰_타인_수정삭제(self):
        # user1이 리뷰 작성
        self.client.force_authenticate(self.user1)
        url = reverse('anime-review-list-create', kwargs={'anime_id': self.anime.id})
        review = self.client.post(url, {'content': '유저1', 'rating': 3})
        review_id = AnimeReview.objects.first().id

        # user2가 해당 리뷰 수정/삭제 시도
        self.client.force_authenticate(self.user2)
        url = reverse('anime-review-update-delete', kwargs={'anime_id': self.anime.id, 'review_id': review_id})
        response = self.client.put(url, {'content': '해킹수정', 'rating': 2})
        self.assertEqual(response.status_code, 403)
        self.assertIn('본인의 리뷰만', str(response.data))
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 403)

    def test_존재하지_않는_리뷰_수정삭제(self):
        self.client.force_authenticate(self.user1)
        url = reverse('anime-review-update-delete', kwargs={'anime_id': self.anime.id, 'review_id': 99999})
        response = self.client.put(url, {'content': 'no', 'rating': 1})
        self.assertEqual(response.status_code, 404)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 404)

    def test_리뷰_평점_유효성(self):
        self.client.force_authenticate(self.user1)
        url = reverse('anime-review-list-create', kwargs={'anime_id': self.anime.id})
        # 평점 0 (범위 벗어남)
        response = self.client.post(url, {'content': '0점', 'rating': 0})
        self.assertEqual(response.status_code, 400)
        # 평점 6 (범위 벗어남)
        response = self.client.post(url, {'content': '6점', 'rating': 6})
        self.assertEqual(response.status_code, 400)

    def test_좋아요_중복_방지(self):
        self.client.force_authenticate(self.user1)
        # 리뷰 생성
        review = AnimeReview.objects.create(anime=self.anime, user=self.user2, content='타인', rating=5)
        url = reverse('anime-review-like', kwargs={'anime_id': self.anime.id, 'review_id': review.id})
        response = self.client.post(url)
        self.assertEqual(response.status_code, 201)
        # 같은 유저가 또 좋아요 → 실패
        response = self.client.post(url)
        self.assertEqual(response.status_code, 400)
        # 다른 유저가 좋아요 → 성공
        self.client.force_authenticate(self.user2)
        response = self.client.post(url)
        self.assertEqual(response.status_code, 201)

    def test_애니리스트_중복추가_및_없는_애니_제거(self):
        self.client.force_authenticate(self.user1)
        url = reverse('anime-animelist', kwargs={'anime_id': self.anime.id})
        # 최초 추가 → 성공
        self.assertEqual(self.client.post(url).status_code, 201)
        # 중복 추가 → 실패
        self.assertEqual(self.client.post(url).status_code, 400)
        # 제거 → 성공
        self.assertEqual(self.client.delete(url).status_code, 204)
        # 또 제거(이미 없음) → 실패
        self.assertEqual(self.client.delete(url).status_code, 404)

    def test_평점_정수범위_유효성(self):
        self.client.force_authenticate(self.user1)
        url = reverse('anime-rating', kwargs={'anime_id': self.anime.id})
        # 0점
        response = self.client.post(url, {'rating': 0})
        self.assertEqual(response.status_code, 400)
        # 6점
        response = self.client.post(url, {'rating': 6})
        self.assertEqual(response.status_code, 400)
        # 평점 없는 삭제
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 404)

    def test_리뷰작성시_필수필드_누락(self):
        self.client.force_authenticate(self.user1)
        url = reverse('anime-review-list-create', kwargs={'anime_id': self.anime.id})
        # content 누락
        response = self.client.post(url, {'rating': 5})
        self.assertEqual(response.status_code, 400)
        # rating 누락
        response = self.client.post(url, {'content': '평점없음'})
        self.assertEqual(response.status_code, 400)

