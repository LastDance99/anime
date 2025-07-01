from rest_framework.test import APITestCase
from django.urls import reverse
from apps.users.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone
from datetime import timedelta
from io import BytesIO
from PIL import Image
# Create your tests here.

# PIL 라이브러리로 테스트용 이미지 생성 함수
def generate_test_image(color="red"):
    io = BytesIO()
    image = Image.new("RGB", (10, 10), color=color)
    image.save(io, format="JPEG")
    io.seek(0)
    return SimpleUploadedFile(f"test_{color}.jpg", io.read(), content_type="image/jpeg")

class UserSettingsTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="tester@abc.com",
            password="Password123",
            nickname="테스터",
            language="ko"
        )
        self.client.login(email="tester@abc.com", password="Password123")
        # 직접 로그인은 JWT 기반이면 아래처럼 인증 헤더 추가 필요
        response = self.client.post('/api/users/login/', {"email": "tester@abc.com", "password": "Password123"})
        self.access = response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {self.access}")

    def test_settings_view(self):
        url = '/api/settings/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], "tester@abc.com")
        self.assertEqual(response.data['nickname'], "테스터")
        self.assertIn('profile_image', response.data)

    def test_update_nickname_success(self):
        url = '/api/settings/account/'
        response = self.client.put(url, {"nickname": "변경된닉네임"})
        self.assertEqual(response.status_code, 200)
        self.assertIn("성공적으로 변경", response.data["detail"])
        self.user.refresh_from_db()
        self.assertEqual(self.user.nickname, "변경된닉네임")

    def test_update_nickname_same(self):
        url = '/api/settings/account/'
        response = self.client.put(url, {"nickname": "테스터"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("현재 사용 중인 닉네임입니다.", str(response.data))

    def test_update_nickname_duplicate(self):
        User.objects.create_user(email="other@abc.com", password="Password123", nickname="중복닉네임")
        url = '/api/settings/account/'
        response = self.client.put(url, {"nickname": "중복닉네임"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("이미 존재합니다.", str(response.data))

    def test_update_nickname_cooldown(self):
        self.user.nickname_changed_at = timezone.now() - timedelta(days=20)
        self.user.save()
        url = '/api/settings/account/'
        response = self.client.put(url, {"nickname": "새로운닉네임"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("닉네임은 변경 후 30일간 다시 변경할 수 없습니다", str(response.data))

    def test_update_language_success(self):
        url = '/api/settings/language/'
        response = self.client.put(url, {"language": "en"})
        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual(self.user.language, "en")

    def test_update_language_invalid(self):
        url = '/api/settings/language/'
        response = self.client.put(url, {"language": "jp"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("유효하지 않은 선택", str(response.data))

    def test_update_profile_image(self):
        url = '/api/settings/image/'
        img = generate_test_image("blue")
        response = self.client.patch(url, {"profile_image": img}, format="multipart")
        print("프로필 응답:", response.data)
        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertTrue(bool(self.user.profile_image))

    def test_update_background_image(self):
        url = '/api/settings/image/'
        img = generate_test_image("green")
        response = self.client.patch(url, {"background_image": img}, format="multipart")
        print("배경 응답:", response.data)
        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertTrue(bool(self.user.background_image))

    def test_update_myroom_image(self):
        url = '/api/settings/image/'
        img = generate_test_image("yellow")
        response = self.client.patch(url, {"myroom_image": img}, format="multipart")
        print("마이룸 응답:", response.data)
        self.assertEqual(response.status_code, 200)
        self.user.refresh_from_db()
        self.assertTrue(bool(self.user.myroom_image))

    def test_delete_profile_image(self):
        # 우선 프로필 이미지 업로드
        self.user.profile_image.save("del_test.jpg", generate_test_image("navy"))
        self.user.save()
        url = '/api/settings/image/delete/'
        response = self.client.delete(url, {"target": "profile_image"}, format="json")
        print("프로필 이미지 삭제 응답:", response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("profile_image가 삭제되었습니다.", response.data["detail"])
        self.user.refresh_from_db()
        self.assertFalse(bool(self.user.profile_image))

    def test_delete_background_image(self):
        self.user.background_image.save("del_bg.jpg", generate_test_image("teal"))
        self.user.save()
        url = '/api/settings/image/delete/'
        response = self.client.delete(url, {"target": "background_image"}, format="json")
        print("배경 이미지 삭제 응답:", response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("background_image가 삭제되었습니다.", response.data["detail"])
        self.user.refresh_from_db()
        self.assertFalse(bool(self.user.background_image))

    def test_delete_myroom_image(self):
        self.user.myroom_image.save("del_room.jpg", generate_test_image("gray"))
        self.user.save()
        url = '/api/settings/image/delete/'
        response = self.client.delete(url, {"target": "myroom_image"}, format="json")
        print("마이룸 이미지 삭제 응답:", response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("myroom_image가 삭제되었습니다.", response.data["detail"])
        self.user.refresh_from_db()
        self.assertFalse(bool(self.user.myroom_image))

    def test_delete_invalid_target(self):
        url = '/api/settings/image/delete/'
        response = self.client.delete(url, {"target": "wrong_field"}, format="json")
        print("잘못된 삭제 응답:", response.data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("삭제할 이미지 종류가 유효하지 않습니다.", response.data["detail"])
