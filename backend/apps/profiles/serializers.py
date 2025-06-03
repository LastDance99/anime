from rest_framework import serializers
from .models import ProfileComment
from django.contrib.auth import get_user_model

User = get_user_model()

# 유저 프로필 시리얼라이저
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'email', 'nickname', 'profile_image', 'background_image',
            'myroom_image', 'about', 'language'
        ]

# 프로필 코멘트 시리얼라이저
class ProfileCommentSerializer(serializers.ModelSerializer):
    author_nickname = serializers.CharField(source='author.nickname', read_only=True)
    author_profile_image = serializers.ImageField(source='author.profile_image', read_only=True)

    class Meta:
        model = ProfileComment
        fields = ['id', 'author_nickname', 'author_profile_image', 'content', 'created_at']
        read_only_fields = ['id', 'author_nickname', 'author_profile_image', 'created_at']