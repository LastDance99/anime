from rest_framework import serializers
from apps.users.models import User  
from django.utils import timezone
from datetime import timedelta

# 사용자 설정 조회 직렬화 클래스
class UserSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "email",
            "nickname",
            "language",
            "profile_image",
            "background_image",
            "myroom_image"
        ]
        read_only_fields = ["email"]


# 사용자 닉네임 업데이트 직렬화 클래스
class UserAccountUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["nickname"]

    def validate_nickname(self, value):
        user = self.instance

        # 1. 동일한 닉네임으로 변경 불가
        if value == user.nickname:
            raise serializers.ValidationError("현재 사용 중인 닉네임입니다.")

        # 2. 중복 닉네임 불가
        if User.objects.exclude(id=user.id).filter(nickname=value).exists():
            raise serializers.ValidationError("이미 사용 중인 닉네임입니다.")

        # 3. 쿨타임 (7일 제한)
        cooldown = timedelta(days=30)
        if user.nickname_changed_at and timezone.now() < user.nickname_changed_at + cooldown:
            remaining = (user.nickname_changed_at + cooldown - timezone.now()).days
            raise serializers.ValidationError(f"닉네임은 변경 후 30일간 다시 변경할 수 없습니다. 남은 일수: {remaining}일")

        return value

    def update(self, instance, validated_data):
        instance.nickname = validated_data["nickname"]
        instance.nickname_changed_at = timezone.now()
        instance.save()
        return instance
    
# 사용자 언어 설정 업데이트 직렬화 클래스
class UserLanguageUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["language"]

    def validate_language(self, value):
        allowed = ["ko", "en", "es"]
        if value not in allowed:
            raise serializers.ValidationError("지원하지 않는 언어입니다. (ko, en, es 중 하나여야 합니다)")
        return value
    
# 사용자 이미지 업데이트 직렬화 클래스
class UserImageUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["profile_image", "background_image", "myroom_image"]
        
