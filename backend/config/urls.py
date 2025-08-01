"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    # 관리자 페이지 URL
    path("admin/", admin.site.urls),
    # API 엔드포인트 URL
    path("api/users/", include("apps.users.urls")), # 사용자 인증 및 관리 기능 관련
    path("api/profiles/", include("apps.profiles.urls")), # 사용자 프로필 기능 관련
    path("api/boards/", include("apps.boards.urls")), # 게시판 기능 관련
    path("api/anime/", include("apps.anime.urls")), # 애니 기능 관련 
    path("api/core/", include("apps.core.urls")), # 공통 기능 관련
    path("api/animebot/", include("apps.animebot.urls")), # 애니 봇 기능 관련
    path("api/settings/", include("apps.settings.urls")), # 사용자 설정 관련
]

if settings.DEBUG:
    # Serve static files during development
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    # Serve media files during development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)