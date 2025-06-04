from rest_framework import generics, permissions
from .models import FollowHeart
from .serializers import FollowHeartSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

class FollowHeartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, user_id):
        if request.user.id == user_id:
            raise ValidationError("자기 자신은 하트할 수 없습니다.")

        if FollowHeart.objects.filter(follower=request.user, following_id=user_id).exists():
            return Response({"detail": "이미 하트했습니다."}, status=status.HTTP_400_BAD_REQUEST)

        FollowHeart.objects.create(follower=request.user, following_id=user_id)
        return Response({"detail": "하트 완료!"}, status=status.HTTP_201_CREATED)

    def delete(self, request, user_id):
        heart = FollowHeart.objects.filter(follower=request.user, following_id=user_id).first()
        if heart:
            heart.delete()
            return Response({"detail": "하트 취소 완료"}, status=status.HTTP_204_NO_CONTENT)
        return Response({"detail": "하트한 기록이 없습니다."}, status=status.HTTP_400_BAD_REQUEST)
    
# 내가 하트한 유저 목록 조회
class MyHeartedUsersView(generics.ListAPIView):
    serializer_class = FollowHeartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return FollowHeart.objects.filter(follower=self.request.user).select_related('following')
