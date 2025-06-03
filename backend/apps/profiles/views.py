from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from django.contrib.auth import get_user_model
from .models import ProfileComment
from .serializers import UserProfileSerializer, ProfileCommentSerializer

User = get_user_model()

# 내 프로필 조회 뷰
class MyProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

# 타인 프로필 조회 뷰
class UserProfileView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'id'
    lookup_url_kwarg = 'user_id'

# 프로필 코멘트 작성 뷰
class ProfileCommentCreateView(generics.CreateAPIView):
    serializer_class = ProfileCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(
            user_id=self.kwargs['user_id'],
            author=self.request.user
        )

# 프로필 코멘트 삭제 뷰
class ProfileCommentDeleteView(generics.DestroyAPIView):
    queryset = ProfileComment.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        comment = self.get_object()
        is_author = comment.author == request.user
        is_profile_owner = comment.user == request.user

        if not (is_author or is_profile_owner):
            raise PermissionDenied("삭제 권한이 없습니다.")

        return super().delete(request, *args, **kwargs)
