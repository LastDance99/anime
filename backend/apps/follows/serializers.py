from rest_framework import serializers
from .models import FollowHeart

class FollowHeartSerializer(serializers.ModelSerializer):
    class Meta:
        model = FollowHeart
        fields = ["id", "follower", "following", "created_at"]
        read_only_fields = ["id", "created_at", "follower"]
