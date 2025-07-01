from django.urls import path
from .views import (
    UserSettingsView, 
    UserAccountUpdateView, 
    UserLanguageUpdateView, 
    UserImageUpdateView,
    UserImageDeleteView,
    PasswordChangeView,
)

urlpatterns = [
    # 사용자 설정 조회 
    path("", UserSettingsView.as_view(), name="user-settings"), 
    
    # 비밀번호 변경
    path('password-change/', PasswordChangeView.as_view(), name='password-change'), 

    # 사용자 닉네임 업데이트
    path("account/", UserAccountUpdateView.as_view(), name="user-settings-account"),

    # 사용자 언어 설정 업데이트
    path("language/", UserLanguageUpdateView.as_view(), name="user-settings-language"), 

    # 사용자 이미지 업데이트
    path("image/", UserImageUpdateView.as_view(), name="user-settings-image"), 

    # 사용자 이미지 삭제
    path("image/delete/", UserImageDeleteView.as_view(), name="user-settings-image-delete"), 
]