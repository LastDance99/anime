from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
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
    permission_classes = []

    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "회원가입이 완료되었습니다."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 2. 로그인 (JWT 토큰 발급)
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# 3. 로그아웃 (리프레시 토큰 무효화)
class UserLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "로그아웃 성공"}, status=status.HTTP_205_RESET_CONTENT)

# 4. 비밀번호 재설정 요청
class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "비밀번호 재설정 링크가 이메일로 전송되었습니다."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 5. 비밀번호 재설정 (이메일 링크를 통한)
class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "비밀번호가 성공적으로 변경되었습니다."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 6. 이메일 인증 요청 (추가 기능)
class EmailVerificationRequestView(APIView):
    permission_classes = []  # 누구나 접근 가능

    def post(self, request):
        serializer = EmailVerificationRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "인증 코드가 이메일로 전송되었습니다."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# 7. 이메일 인증 확인 (추가 기능)
class EmailVerificationConfirmView(APIView):
    permission_classes = []

    def post(self, request):
        serializer = EmailVerificationConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "이메일 인증이 완료되었습니다."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    