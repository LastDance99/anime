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
)


urlpatterns = [
    path('signup/', UserSignupView.as_view(), name='user-signup'),
    path('login/', CustomTokenObtainPairView.as_view(), name='user-login'),
    path('logout/', UserLogoutView.as_view(), name='user-logout'),
    path('refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password-reset'),
    path('password-reset/confirm/', PasswordResetConfirmView.as_view(), name='password-reset-confirm'),
    path("email-verification/", EmailVerificationRequestView.as_view(), name="email-verification"),
    path("email-verification/confirm/", EmailVerificationConfirmView.as_view(), name="email-verification-confirm"),
]