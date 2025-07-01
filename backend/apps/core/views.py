import uuid
import boto3
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# S3 프리사인 URL 생성 API
class GeneratePresignedURLView(APIView):
    def post(self, request):
        file_name = request.data.get("file_name")
        file_type = request.data.get("file_type")
        folder = request.data.get("folder", "uploads/")

        if not file_name or not file_type:
            return Response({"error": "file_name과 file_type은 필수입니다."}, status=400)

        ext = file_name.split('.')[-1]
        key = f"{folder}{uuid.uuid4()}.{ext}"

        s3 = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )

        try:
            presigned_url = s3.generate_presigned_url(
                ClientMethod="put_object",
                Params={
                    "Bucket": settings.AWS_STORAGE_BUCKET_NAME,
                    "Key": key,
                    "ContentType": file_type,
                    "ACL": "public-read", # 파일을 공개적으로 읽을 수 있도록 설정
                },
                ExpiresIn=300
            )

            file_url = f"https://{settings.AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/{key}"

            return Response({
                "upload_url": presigned_url,
                "file_url": file_url
            })

        except Exception as e:
            return Response({"error": str(e)}, status=500)