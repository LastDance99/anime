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
    path("", UserSettingsView.as_view(), name="user-settings"), 
    path('password-change/', PasswordChangeView.as_view(), name='password-change'),
    path("account/", UserAccountUpdateView.as_view(), name="user-settings-account"),
    path("language/", UserLanguageUpdateView.as_view(), name="user-settings-language"),
    path("image/", UserImageUpdateView.as_view(), name="user-settings-image"),
    path("image/delete/", UserImageDeleteView.as_view(), name="user-settings-image-delete"),
]