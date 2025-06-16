from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    UserSettingsSerializer, 
    UserAccountUpdateSerializer,
    UserLanguageUpdateSerializer,
    UserImageUpdateSerializer,
)

# 사용자 설정 조회 API
class UserSettingsView(APIView):

    def get(self, request):
        serializer = UserSettingsSerializer(request.user)
        return Response(serializer.data)
    
# 사용자 닉네임 업데이트 API
class UserAccountUpdateView(APIView):

    def put(self, request):
        serializer = UserAccountUpdateSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "닉네임이 성공적으로 변경되었습니다."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 사용자 언어 설정 업데이트 API
class UserLanguageUpdateView(APIView):

    def put(self, request):
        serializer = UserLanguageUpdateSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "언어 설정이 변경되었습니다."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 사용자 이미지 업데이트 API
class UserImageUpdateView(APIView):

    def put(self, request):
        serializer = UserImageUpdateSerializer(request.user, data=request.data, files=request.FILES, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "이미지가 성공적으로 업로드되었습니다."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 사용자 이미지 삭제 API
class UserImageDeleteView(APIView):

    def delete(self, request):
        user = request.user
        target = request.data.get("target")

        if target not in ["profile_image", "background_image", "myroom_image"]:
            return Response({"detail": "삭제할 이미지 종류가 유효하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)

        # 실제 필드 제거
        current_image = getattr(user, target)
        if current_image:
            current_image.delete(save=False)  # 실제 파일 삭제
            setattr(user, target, None)
            user.save()

        return Response({"detail": f"{target}가 삭제되었습니다."}, status=status.HTTP_200_OK)
    