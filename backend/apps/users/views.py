import re
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    PasswordResetRequestSerializer,
    UserSignupSerializer,
    CustomTokenObtainPairSerializer,
    LogoutSerializer,
    PasswordResetConfirmSerializer,
    EmailVerificationRequestSerializer,
    EmailVerificationConfirmSerializer,
)

User = get_user_model()

# 1. 회원가입
class UserSignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": _("회원가입이 완료되었습니다.")}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 실시간 이메일 중복 체크
class EmailDuplicateCheckView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        email = request.query_params.get('email', '').strip().lower()
        if not email:
            return Response({"valid": False, "message": _("이메일을 입력해주세요.")})
        if User.objects.filter(email=email).exists():
            return Response({"exists": True, "valid": False, "message": _("이미 가입된 이메일입니다.")})
        return Response({"exists": False, "valid": True, "message": _("사용 가능한 이메일입니다.")})

# 실시간 닉네임 중복 체크
class NicknameDuplicateCheckView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        nickname = request.query_params.get('nickname', '').strip()
        if not re.match(r'^[\uac00-\ud7a3a-zA-Z0-9]{2,16}$', nickname):
            return Response({"valid": False, "exists": False, "message": _("닉네임은 2~16자 한글/영문/숫자만 사용 가능합니다.")})
        if User.objects.filter(nickname__iexact=nickname).exists():
            return Response({"exists": True, "valid": False, "message": _("이미 사용 중인 닉네임입니다.")})
        return Response({"exists": False, "valid": True, "message": _("사용 가능한 닉네임입니다.")})
    
# 2. 로그인 (JWT 토큰 발급)
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [permissions.AllowAny]

# 3. 로그아웃 (리프레시 토큰 무효화)
class UserLogoutView(APIView):

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": _("로그아웃 성공")}, status=status.HTTP_205_RESET_CONTENT)

# 4. 비밀번호 재설정 요청
class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": _("비밀번호 재설정 링크가 이메일로 전송되었습니다.")})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 5. 비밀번호 재설정 (이메일 링크를 통한)
class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": _("비밀번호가 성공적으로 변경되었습니다.")})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 6. 이메일 인증 요청
class EmailVerificationRequestView(APIView):
    permission_classes = [permissions.AllowAny]  

    def post(self, request):
        serializer = EmailVerificationRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": _("인증 코드가 이메일로 전송되었습니다.")})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 7. 이메일 인증 확인 
class EmailVerificationConfirmView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = EmailVerificationConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": _("이메일 인증이 완료되었습니다.")})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    