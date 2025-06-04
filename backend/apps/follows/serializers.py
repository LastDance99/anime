from rest_framework import serializers
from .models import FollowHeart

class FollowHeartSerializer(serializers.ModelSerializer):
    following_nickname = serializers.CharField(source='following.nickname', read_only=True)
    following_profile_image = serializers.ImageField(source='following.profile_image', read_only=True)

    class Meta:
        model = FollowHeart
        fields = [
            "id",
            "follower",
            "following",
            "following_nickname",
            "following_profile_image",
            "created_at"
        ]
        read_only_fields = ["id", "created_at", "follower"]
