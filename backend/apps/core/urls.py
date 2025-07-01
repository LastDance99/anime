from django.urls import path
from .views import GeneratePresignedURLView

urlpatterns = [
    # S3 프리사인 URL 생성
    path("s3/presign/", GeneratePresignedURLView.as_view(), name="s3_presign_url"),
]