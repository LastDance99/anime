from rest_framework.test import APITestCase
from django.urls import reverse
from apps.users.models import User, EmailVerification
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core import mail
# Create your tests here.

class UserSignupTest(APITestCase):

    def setUp(self):
        # 이미 존재하는 유저
        self.exist_user = User.objects.create_user(
            email="exist@aaa.com",
            password="Testpass123",
            nickname="기존닉네임"
        )
        # 이미 인증된 이메일
        EmailVerification.objects.create(
            email="verified@aaa.com",
            code="123456",
            is_verified=True
        )
        # 인증요청만 있고 인증 안 된 이메일
        EmailVerification.objects.create(
            email="wait@aaa.com",
            code="654321",
            is_verified=False
        )

    def test_email_duplicate_check(self):
        url = '/api/users/check-email/?email=exist@aaa.com'
        response = self.client.get(url)
        self.assertEqual(response.data["exists"], True)
        self.assertEqual(response.data["valid"], False)

        url = '/api/users/check-email/?email=new@aaa.com'
        response = self.client.get(url)
        self.assertEqual(response.data["exists"], False)
        self.assertEqual(response.data["valid"], True)

    def test_nickname_duplicate_check(self):
        url = '/api/users/check-nickname/?nickname=기존닉네임'
        response = self.client.get(url)
        self.assertEqual(response.data["exists"], True)
        self.assertEqual(response.data["valid"], False)

        url = '/api/users/check-nickname/?nickname=새닉'
        response = self.client.get(url)
        self.assertEqual(response.data["exists"], False)
        self.assertEqual(response.data["valid"], True)

    def test_signup_success(self):
        url = '/api/users/signup/'
        EmailVerification.objects.create(
            email="test@aaa.com", code="111111", is_verified=True
        )
        data = {
            "email": "test@aaa.com",
            "password": "Testpass123",
            "password2": "Testpass123",
            "nickname": "새닉네임",
            "gender": "male",
            "language": "ko",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(User.objects.filter(email="test@aaa.com").exists())

    def test_signup_email_not_verified(self):
        url = '/api/users/signup/'
        data = {
            "email": "wait@aaa.com",  # 인증 안 된 이메일
            "password": "Testpass123",
            "password2": "Testpass123",
            "nickname": "아직닉",
            "gender": "female",
            "language": "ko",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("이메일 인증이 완료되지 않았습니다.", str(response.data))

    def test_signup_password_mismatch(self):
        url = '/api/users/signup/'
        EmailVerification.objects.create(
            email="pwmismatch@aaa.com", code="222222", is_verified=True
        )
        data = {
            "email": "pwmismatch@aaa.com",
            "password": "Testpass123",
            "password2": "wrongpass",
            "nickname": "닉네임일치x",
            "gender": "male",
            "language": "ko",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("비밀번호가 일치하지 않습니다.", str(response.data))

    def test_signup_weak_password(self):
        url = '/api/users/signup/'
        EmailVerification.objects.create(
            email="weakpass@aaa.com", code="333333", is_verified=True
        )
        data = {
            "email": "weakpass@aaa.com",
            "password": "short",
            "password2": "short",
            "nickname": "약한패스",
            "gender": "unknown",
            "language": "ko",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("비밀번호는 최소 8자리여야 합니다.", str(response.data))

    def test_signup_nickname_specialchar(self):
        url = '/api/users/signup/'
        EmailVerification.objects.create(
            email="spec@aaa.com", code="444444", is_verified=True
        )
        data = {
            "email": "spec@aaa.com",
            "password": "Testpass123",
            "password2": "Testpass123",
            "nickname": "닉네임#특수문자",
            "gender": "male",
            "language": "ko",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("닉네임은 한글, 영문, 숫자만", str(response.data))

    def test_signup_duplicate_email(self):
        url = '/api/users/signup/'
        EmailVerification.objects.create(
            email="exist@aaa.com", code="555555", is_verified=True
        )
        data = {
            "email": "exist@aaa.com",  # 이미 존재하는 이메일
            "password": "Testpass123",
            "password2": "Testpass123",
            "nickname": "새닉2",
            "gender": "male",
            "language": "ko",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("이미 존재합니다.", str(response.data))

    def test_signup_duplicate_nickname(self):
        url = '/api/users/signup/'
        EmailVerification.objects.create(
            email="uniq@aaa.com", code="666666", is_verified=True
        )
        data = {
            "email": "uniq@aaa.com",
            "password": "Testpass123",
            "password2": "Testpass123",
            "nickname": "기존닉네임",  # 이미 존재하는 닉네임
            "gender": "male",
            "language": "ko",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("이미 존재합니다.", str(response.data))

# Test 사용자 로그인 및 로그아웃
class UserLoginLogoutTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="login@aaa.com",
            password="Testpass123",
            nickname="로그인닉"
        )

    def test_login_success(self):
        url = '/api/users/login/'
        data = {"email": "login@aaa.com", "password": "Testpass123"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        # self.assertEqual(response.data["email"], "login@aaa.com") <-- JWT 토큰에는 이메일 정보가 포함되지 않음

    def test_login_fail(self):
        url = '/api/users/login/'
        data = {"email": "login@aaa.com", "password": "wrongpass"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 401)  # 인증 실패시

    def test_logout_success(self):
        refresh = str(RefreshToken.for_user(self.user))
        access = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}") # access 토큰 헤더를 세팅, 로그인 상태 설정
        url = '/api/users/logout/'
        data = {"refresh": refresh}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 205)
        self.assertIn("로그아웃 성공", response.data["message"])

    def test_logout_invalid_token(self):
        access = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}") # access 토큰 헤더를 세팅, 로그인 상태 설정
        url = '/api/users/logout/'
        data = {"refresh": "invalidtokenstring"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("유효하지 않은 refresh 토큰입니다.", str(response.data))

# Test 비밀번호 재설정 기능
class PasswordResetTest(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="pwreset@email.com",
            password="Somepass123",
            nickname="비번리셋"
        )

    def test_password_reset_request_success(self):
        url = '/api/users/password-reset/'
        data = {'email': "pwreset@email.com"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("비밀번호 재설정 링크가 이메일로 전송되었습니다.", response.data["message"])
        self.assertEqual(len(mail.outbox), 1)
        self.assertIn('비밀번호 재설정 링크입니다', mail.outbox[0].subject)

    def test_password_reset_request_no_user(self):
        url = '/api/users/password-reset/'
        data = {'email': "nouser@email.com"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("해당 이메일로 등록된 유저가 없습니다.", str(response.data))

    def test_password_reset_confirm_success(self):
        token_generator = PasswordResetTokenGenerator()
        uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        token = token_generator.make_token(self.user)
        url = '/api/users/password-reset/confirm/'
        data = {
            "uid": uid,
            "token": token,
            "new_password": "NewPass1234"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("비밀번호가 성공적으로 변경되었습니다.", response.data["message"])
        # 비번이 실제로 바뀌었는지 확인
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("NewPass1234"))

    def test_password_reset_confirm_invalid_user(self):
        url = '/api/users/password-reset/confirm/'
        data = {
            "uid": urlsafe_base64_encode(force_bytes(9999)),  # 존재하지 않는 pk
            "token": "sometoken",
            "new_password": "SomeNewPass123",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("유효하지 않은 사용자입니다.", str(response.data))

    def test_password_reset_confirm_invalid_token(self):
        token_generator = PasswordResetTokenGenerator()
        uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        token = "wrong-token"
        url = '/api/users/password-reset/confirm/'
        data = {
            "uid": uid,
            "token": token,
            "new_password": "NewPass1234"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("유효하지 않은 토큰입니다.", str(response.data))

# Test 이메일 인증 기능
class EmailVerificationTest(APITestCase):

    def test_request_verification(self):
        url = '/api/users/email-verification/'
        data = {'email': 'test@email.com'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("인증 코드가 이메일로 전송되었습니다.", response.data["message"])
        self.assertTrue(EmailVerification.objects.filter(email='test@email.com').exists())

    def test_confirm_verification_success(self):
        EmailVerification.objects.create(
            email="check@email.com", code="123456", is_verified=False
        )
        url = '/api/users/email-verification/confirm/'
        data = {'email': 'check@email.com', 'code': '123456'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("이메일 인증이 완료되었습니다.", response.data["message"])
        self.assertTrue(EmailVerification.objects.get(email="check@email.com").is_verified)

    def test_confirm_verification_fail_code(self):
        EmailVerification.objects.create(
            email="fail@email.com", code="654321", is_verified=False
        )
        url = '/api/users/email-verification/confirm/'
        data = {'email': 'fail@email.com', 'code': '123456'}  # 잘못된 코드
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("인증 코드가 일치하지 않습니다.", str(response.data))

    def test_confirm_verification_already_verified(self):
        EmailVerification.objects.create(
            email="already@email.com", code="222222", is_verified=True
        )
        url = '/api/users/email-verification/confirm/'
        data = {'email': 'already@email.com', 'code': '222222'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("이미 인증된 이메일입니다.", str(response.data))

    def test_confirm_verification_expired(self):
        from django.utils import timezone
        import datetime
        expired_time = timezone.now() - datetime.timedelta(minutes=10)
        EmailVerification.objects.create(
            email="expire@email.com",
            code="111222",
            is_verified=False,
            expires_at=expired_time
        )
        url = '/api/users/email-verification/confirm/'
        data = {'email': 'expire@email.com', 'code': '111222'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, 400)
        self.assertIn("인증 코드가 만료되었습니다.", str(response.data))