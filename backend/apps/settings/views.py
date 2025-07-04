from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.utils.translation import gettext_lazy as _
from rest_framework import status
from .serializers import (
    UserSettingsSerializer, 
    PasswordChangeSerializer,
    UserAccountUpdateSerializer,
    UserLanguageUpdateSerializer,
    UserImageUpdateSerializer,
)

# 사용자 설정 조회 API
class UserSettingsView(APIView):

    def get(self, request):
        serializer = UserSettingsSerializer(request.user)
        return Response(serializer.data)
    
# 비밀번호 변경 API
class PasswordChangeView(APIView):
    def post(self, request):
        serializer = PasswordChangeSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": _("비밀번호가 성공적으로 변경되었습니다.")})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 사용자 닉네임 업데이트 API
class UserAccountUpdateView(APIView):
    def put(self, request):
        serializer = UserAccountUpdateSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": _("닉네임이 성공적으로 변경되었습니다.")})

        # ❗️ nickname 관련 에러만 단일 메시지로 추출해서 반환
        errors = serializer.errors
        if "nickname" in errors:
            # 리스트 첫 번째 메시지만 뽑아서 반환
            return Response({"detail": errors["nickname"][0]}, status=400)
        # 혹시라도 nickname이 아니면 전체 에러를 string 처리해서 반환
        return Response({"detail": str(errors)}, status=400)
    
# 사용자 언어 설정 업데이트 API
class UserLanguageUpdateView(APIView):

    def put(self, request):
        serializer = UserLanguageUpdateSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"detail": _("언어 설정이 변경되었습니다.")})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 사용자 이미지 업데이트 API
class UserImageUpdateView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request):
        print("request.FILES:", request.FILES)  # 디버그
        serializer = UserImageUpdateSerializer(
            request.user,
            data=request.data,
            partial=True  # 일부만 업데이트 가능
        )
        if serializer.is_valid():
            try:
                instance = serializer.save()
                print("업로드 결과:", instance.profile_image, instance.background_image, instance.myroom_image)
                return Response(
                    {"detail": _("이미지가 성공적으로 업로드되었습니다.")},
                    status=status.HTTP_200_OK
                )
            except Exception as e:
                print("이미지 저장 오류:", e)
                return Response({"detail": _("이미지 저장 중 에러: ") + str(e)}, status=500)
        print("유효성 검사 에러:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 사용자 이미지 삭제 API
class UserImageDeleteView(APIView):

    def delete(self, request):
        user = request.user
        target = request.data.get("target")

        if target not in ["profile_image", "background_image", "myroom_image"]:
            return Response({"detail": _("삭제할 이미지 종류가 유효하지 않습니다.")}, status=status.HTTP_400_BAD_REQUEST)

        # 실제 필드 제거
        current_image = getattr(user, target)
        if current_image:
            current_image.delete(save=False)  
            setattr(user, target, None)
            user.save()

        return Response({"detail": _("%(target)s가 삭제되었습니다.") % {"target": target}}, status=status.HTTP_200_OK)
    