from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied

from django.contrib.auth import get_user_model
from .models import ProfileComment
from .serializers import UserProfileSerializer, ProfileCommentSerializer

User = get_user_model()




class ProfileCommentListCreateView(generics.ListCreateAPIView):
    serializer_class = ProfileCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        return ProfileComment.objects.filter(user_id=user_id)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ProfileCommentDeleteView(generics.DestroyAPIView):
    queryset = ProfileComment.objects.all()
    serializer_class = ProfileCommentSerializer
    permission_classes = [permissions.IsAuthenticated]
