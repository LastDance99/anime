from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from apps.boards.models import BoardPost, PostLike, BoardComment, CommentLike
from rest_framework import status
# Create your tests here.

User = get_user_model()

def auth_headers(token):
    return {"HTTP_AUTHORIZATION": f"Bearer {token}"}

class BoardAPITest(APITestCase):
    def setUp(self):
        # 유저 2명 생성 (권한/댓글테스트용)
        self.user = User.objects.create_user(
            email="user@abc.com", password="pw123456", nickname="유저", language="ko"
        )
        self.user2 = User.objects.create_user(
            email="other@abc.com", password="pw123456", nickname="상대", language="ko"
        )

        # 토큰 발급
        resp = self.client.post('/api/users/login/', {"email": "user@abc.com", "password": "pw123456"})
        self.access = resp.data["access"]

        resp2 = self.client.post('/api/users/login/', {"email": "other@abc.com", "password": "pw123456"})
        self.access2 = resp2.data["access"]

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access}")

    def test_create_board_post(self):
        url = "/api/boards/"
        data = {
            "title": "첫글",
            "content": "내용테스트",
            "board_type": "post"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(BoardPost.objects.count(), 1)
        post = BoardPost.objects.first()
        self.assertEqual(post.title, "첫글")

    def test_list_board_posts(self):
        BoardPost.objects.create(author=self.user, title="글1", content="내용", board_type="post")
        BoardPost.objects.create(author=self.user, title="글2", content="내용", board_type="gallery")
        url = "/api/boards/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.data), 2)

    def test_board_post_detail_retrieve(self):
        post = BoardPost.objects.create(author=self.user, title="글상세", content="내용", board_type="post")
        url = f"/api/boards/{post.id}/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["title"], "글상세")

    def test_board_post_update_and_delete_auth(self):
        post = BoardPost.objects.create(author=self.user, title="글수정", content="내용", board_type="post")
        url = f"/api/boards/{post.id}/"

        # 본인 수정
        response = self.client.put(url, {"title": "수정후", "content": "수정내용", "board_type": "post"})
        self.assertEqual(response.status_code, 200)
        post.refresh_from_db()
        self.assertEqual(post.title, "수정후")

        # 본인 삭제
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(BoardPost.objects.count(), 0)

        # 타인 권한 테스트
        post2 = BoardPost.objects.create(author=self.user, title="타인글", content="내용", board_type="post")
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access2}")
        url2 = f"/api/boards/{post2.id}/"
        response = self.client.put(url2, {"title": "불가", "content": "불가", "board_type": "post"})
        self.assertEqual(response.status_code, 403)
        response = self.client.delete(url2)
        self.assertEqual(response.status_code, 403)

    def test_board_post_like_unlike(self):
        post = BoardPost.objects.create(author=self.user, title="좋아요", content="내용", board_type="post")
        url = f"/api/boards/{post.id}/like/"
        # 좋아요
        response = self.client.post(url)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(PostLike.objects.count(), 1)
        # 중복 좋아요 방지
        response = self.client.post(url)
        self.assertEqual(response.status_code, 400)
        # 좋아요 취소
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(PostLike.objects.count(), 0)
        # 취소 중복 방지
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 400)

    def test_comment_create_and_list(self):
        post = BoardPost.objects.create(author=self.user, title="댓글테스트", content="c", board_type="post")
        url = f"/api/boards/{post.id}/comments/"
        # 댓글 작성 (parent_id 없이)
        response = self.client.post(url, {"content": "댓글"})
        print("댓글 작성 응답:", response.data)
        self.assertEqual(response.status_code, 201)
        # 대댓글 작성 (parent_id 지정)
        comment = BoardComment.objects.first()
        response = self.client.post(url, {"content": "대댓글", "parent_id": comment.id})
        self.assertEqual(response.status_code, 201)
        # 목록 조회
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) >= 1)

    def test_comment_like(self):
        post = BoardPost.objects.create(author=self.user, title="댓글글", content="c", board_type="post")
        comment = BoardComment.objects.create(post=post, author=self.user, content="댓글")
        url = f"/api/boards/comments/{comment.id}/like/"
        response = self.client.post(url)
        self.assertEqual(response.status_code, 201)
        # 중복 좋아요 방지
        response = self.client.post(url)
        self.assertEqual(response.status_code, 400)

    def test_comment_delete_and_soft_delete(self):
        post = BoardPost.objects.create(author=self.user, title="댓글글", content="c", board_type="post")
        comment = BoardComment.objects.create(post=post, author=self.user, content="댓글")
        reply = BoardComment.objects.create(post=post, author=self.user, content="대댓글", parent=comment)
        url = f"/api/boards/{post.id}/comments/{comment.id}/"
        # soft delete (자식 대댓글 있을 때)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 200)
        comment.refresh_from_db()
        self.assertTrue(comment.is_deleted)
        self.assertEqual(comment.content, "")

        # 대댓글(자식이 없는 댓글) 완전 삭제
        url_reply = f"/api/boards/{post.id}/comments/{reply.id}/"
        response = self.client.delete(url_reply)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(BoardComment.objects.count(), 1)

    def test_comment_delete_permission(self):
        post = BoardPost.objects.create(author=self.user, title="댓글글", content="c", board_type="post")
        comment = BoardComment.objects.create(post=post, author=self.user, content="댓글")
        url = f"/api/boards/{post.id}/comments/{comment.id}/"
        # 타인이 삭제 시도
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access2}")
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 403)

    def test_board_post_list_filter_sort_search(self):
        # 게시글/갤러리/추천순/검색어 필터 동작 테스트
        user = self.user
        # 게시글 1, 2, 갤러리 1, 2 생성
        BoardPost.objects.create(author=user, title="일반글", content="본문", board_type="post")
        BoardPost.objects.create(author=user, title="갤러리글", content="이미지", board_type="gallery")
        # 추천수 10, 30 테스트용
        post10 = BoardPost.objects.create(author=user, title="추천10", content="본문", board_type="post")
        post30 = BoardPost.objects.create(author=user, title="추천30", content="본문", board_type="post")
        # 좋아요 각각 10/30개씩 생성
        for _ in range(10):
            u = User.objects.create_user(email=f"tmp{_}@a.com", password="pw123456", nickname=f"tmp{_}", language="ko")
            PostLike.objects.create(post=post10, user=u)
        for _ in range(30):
            u = User.objects.create_user(email=f"tmpx{_}@a.com", password="pw123456", nickname=f"tmpx{_}", language="ko")
            PostLike.objects.create(post=post30, user=u)
    
        url = "/api/boards/"
        # 전체 조회
        resp = self.client.get(url)
        results = resp.data.get('results', resp.data)
        self.assertGreaterEqual(len(results), 4)

        # 게시글만
        resp = self.client.get(url, {"type": "post"})
        results = resp.data.get('results', resp.data)
        self.assertTrue(all(x["board_type"] == "post" for x in results))

        # 갤러리만
        resp = self.client.get(url, {"type": "gallery"})
        results = resp.data.get('results', resp.data)
        self.assertTrue(all(x["board_type"] == "gallery" for x in results))

        # 추천 10이상
        resp = self.client.get(url, {"type": "like10"})
        results = resp.data.get('results', resp.data)
        self.assertTrue(any("추천10" in x["title"] for x in results))

        # 추천 30이상
        resp = self.client.get(url, {"type": "like30"})
        results = resp.data.get('results', resp.data)
        self.assertTrue(any("추천30" in x["title"] for x in results))

        # 검색(제목/본문)
        resp = self.client.get(url, {"search": "이미지"})
        results = resp.data.get('results', resp.data)
        self.assertTrue(any("갤러리글" in x["title"] for x in results))

        # 정렬 테스트 (oldest)
        resp = self.client.get(url, {"sort": "oldest"})
        results = resp.data.get('results', resp.data)
        if len(results) >= 2:
            self.assertLessEqual(results[0]["created_at"], results[-1]["created_at"])

    def test_board_post_not_found(self):
        resp = self.client.get("/api/boards/999999/")
        self.assertEqual(resp.status_code, 404)

    def test_post_like_nonexistent(self):
        resp = self.client.post("/api/boards/999999/like/")
        self.assertEqual(resp.status_code, 404)

    def test_comment_create_missing_content(self):
        post = BoardPost.objects.create(author=self.user, title="댓글글", content="c", board_type="post")
        url = f"/api/boards/{post.id}/comments/"
        resp = self.client.post(url, {})
        self.assertEqual(resp.status_code, 400)

    def test_board_post_create_missing_field(self):
        url = "/api/boards/"
        # title 빠짐
        resp = self.client.post(url, {"content": "본문", "board_type": "post"})
        self.assertEqual(resp.status_code, 400)
        # board_type 빠짐
        resp = self.client.post(url, {"title": "테스트", "content": "본문"})
        self.assertEqual(resp.status_code, 400)

    def test_reply_to_nonexistent_comment(self):
        post = BoardPost.objects.create(author=self.user, title="댓글글", content="c", board_type="post")
        url = f"/api/boards/{post.id}/comments/"
        resp = self.client.post(url, {"content": "대댓글", "parent_id": 999999})
        self.assertEqual(resp.status_code, 400)

    def test_comment_delete_twice(self):
        post = BoardPost.objects.create(author=self.user, title="댓글글", content="c", board_type="post")
        comment = BoardComment.objects.create(post=post, author=self.user, content="댓글")
        url = f"/api/boards/{post.id}/comments/{comment.id}/"
        resp = self.client.delete(url)
        self.assertIn(resp.status_code, [200, 204])
        resp2 = self.client.delete(url)
        self.assertEqual(resp2.status_code, 404)

    def test_post_create_and_thumbnail_extract(self):
        """썸네일 자동 추출 & XSS 필터 동작"""
        # img 태그 있는 HTML
        html = '<p>텍스트<img src="http://a.com/a.png"></p>'
        url = reverse("board-post-list-create")
        resp = self.client.post(url, {"title": "img", "content": html, "board_type": "post"})
        self.assertEqual(resp.status_code, 201)
        post = BoardPost.objects.latest('id')
        self.assertIn('img', post.content) # 원본의 img 태그가 sanitize됨
        self.assertEqual(post.thumbnail_url, "http://a.com/a.png")

        # 유튜브 iframe
        html2 = '<iframe src="https://www.youtube.com/embed/abcDEF123"></iframe>'
        resp2 = self.client.post(url, {"title": "yt", "content": html2, "board_type": "post"})
        self.assertEqual(resp2.status_code, 201)
        post2 = BoardPost.objects.latest('id')
        self.assertTrue("iframe" in post2.content)
        self.assertEqual(post2.thumbnail_url, "https://img.youtube.com/vi/abcDEF123/0.jpg")

        # 아무것도 없을 때
        resp3 = self.client.post(url, {"title": "no", "content": "글만있음", "board_type": "post"})
        post3 = BoardPost.objects.latest('id')
        self.assertIsNone(post3.thumbnail_url)

    def test_post_update_content_and_thumbnail(self):
        """수정시에도 XSS 필터와 썸네일 변경"""
        post = BoardPost.objects.create(author=self.user, title="수정", content="초기", board_type="post")
        url = reverse("board-post-detail", kwargs={"post_id": post.id})
        new_html = '<img src="http://a.com/img.png">'
        resp = self.client.put(url, {"title": "수정", "content": new_html, "board_type": "post"})
        self.assertEqual(resp.status_code, 200)
        post.refresh_from_db()
        self.assertEqual(post.thumbnail_url, "http://a.com/img.png")
        self.assertIn("img", post.content)

    def test_comment_create_xss_and_parent_error(self):
        """댓글/대댓글 XSS, 존재X parent_id 예외"""
        post = BoardPost.objects.create(author=self.user, title="T", content="c", board_type="post")
        url = reverse("comment-list-create", kwargs={"post_id": post.id})
        # 댓글 XSS
        html = "<script>alert(1)</script>댓글"
        resp = self.client.post(url, {"content": html})
        self.assertEqual(resp.status_code, 201)
        comment = BoardComment.objects.latest('id')
        self.assertNotIn("<script>", comment.content)
        # 존재하지 않는 parent_id
        resp2 = self.client.post(url, {"content": "test", "parent_id": 999999})
        self.assertEqual(resp2.status_code, 400)
        self.assertIn("존재하지 않는 댓글", str(resp2.data))
        
