from rest_framework import generics, permissions
from .models import FollowHeart
from .serializers import FollowHeartSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status

class FollowHeartCreateView(generics.CreateAPIView):
    serializer_class = FollowHeartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        following_id = self.kwargs["user_id"]
        if self.request.user.id == int(following_id):
            raise ValidationError("자기 자신은 하트할 수 없습니다.")
        serializer.save(follower=self.request.user, following_id=following_id)

class FollowHeartDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        following_id = self.kwargs["user_id"]
        return FollowHeart.objects.get(follower=self.request.user, following_id=following_id)
