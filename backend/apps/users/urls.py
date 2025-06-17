from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserSignupView,
    CustomTokenObtainPairView,
    UserLogoutView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    EmailVerificationRequestView,
    EmailVerificationConfirmView,
    EmailDuplicateCheckView,
    NicknameDuplicateCheckView,
)


urlpatterns = [
    # 사용자 회원가입
    path('signup/', UserSignupView.as_view(), name='user-signup'),
    # 실시간 이메일 중복 체크
    path('check-email/', EmailDuplicateCheckView.as_view()),
    # 실시간 닉네임 중복 체크
    path('check-nickname/', NicknameDuplicateCheckView.as_view()),
    # 사용자 로그인 (JWT 토큰 발급)
    path('login/', CustomTokenObtainPairView.as_view(), name='user-login'),
    # 사용자 로그아웃 (리프레시 토큰 무효화)
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    # JWT 토큰 리프레시
    path('refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    # 비밀번호 재설정 요청
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    # 비밀번호 재설정 확인 (이메일 링크를 통한)
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    # 이메일 인증 요청
    path("email-verification/", EmailVerificationRequestView.as_view(), name="email-verification"),
    # 이메일 인증 확인 (이메일 링크를 통한)
    path("email-verification/confirm/", EmailVerificationConfirmView.as_view(), name="email-verification-confirm"),
]