from django.urls import path
from .views import GeneratePresignedURLView

urlpatterns = [
    path("s3/presign/", GeneratePresignedURLView.as_view(), name="s3_presign_url"),
]