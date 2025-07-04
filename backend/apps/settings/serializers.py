import re

from rest_framework import serializers
from apps.users.models import User  
from django.db import IntegrityError
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
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
            "nickname_changed_at",
        ]
        read_only_fields = ["email"]

# 비밀번호 변경용
class PasswordChangeSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)
    new_password2 = serializers.CharField(write_only=True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError(_("현재 비밀번호가 일치하지 않습니다."))
        return value

    def validate_new_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError(_("비밀번호는 최소 8자리여야 합니다."))
        if not re.search(r'[A-Za-z]', value) or not re.search(r'\d', value):
            raise serializers.ValidationError(_("비밀번호는 영문과 숫자를 모두 포함해야 합니다."))
        return value

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({"new_password2": _("비밀번호가 일치하지 않습니다.")})
        if attrs['current_password'] == attrs['new_password']:
            raise serializers.ValidationError({"new_password": _("기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다.")})
        return attrs

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user



# 사용자 닉네임 업데이트 직렬화 클래스
class UserAccountUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["nickname"]
        extra_kwargs = {
            'nickname': {'validators': []},
        }

    def validate_nickname(self, value):
        user = self.instance

        # 1. 동일한 닉네임으로 변경 불가
        if value == user.nickname:
            raise serializers.ValidationError(_("현재 사용 중인 닉네임입니다."))

        # 2. 중복 닉네임 불가
        if User.objects.exclude(id=user.id).filter(nickname=value).exists():
            raise serializers.ValidationError(_("이미 사용 중인 닉네임입니다."))

        # 3. 쿨타임 (30일 제한)
        cooldown = timedelta(days=30)
        if user.nickname_changed_at and timezone.now() < user.nickname_changed_at + cooldown:
            remaining = (user.nickname_changed_at + cooldown - timezone.now()).days
            raise serializers.ValidationError(
                _("닉네임은 변경 후 30일간 다시 변경할 수 없습니다. 남은 일수: %(days)d일") % {"days": remaining}
            )

        return value

    def update(self, instance, validated_data):
        instance.nickname = validated_data["nickname"]
        instance.nickname_changed_at = timezone.now()
        try:
            instance.save()
        except IntegrityError:
            raise serializers.ValidationError({"nickname": _("이미 사용 중인 닉네임입니다.")})
        return instance
    
# 사용자 언어 설정 업데이트 직렬화 클래스
class UserLanguageUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["language"]

    def validate_language(self, value):
        allowed = ["ko", "en", "es"]
        if value not in allowed:
            raise serializers.ValidationError(_("지원하지 않는 언어입니다. (ko, en, es 중 하나여야 합니다)"))
        return value
    
# 사용자 이미지 업데이트 직렬화 클래스
class UserImageUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["profile_image", "background_image", "myroom_image"]
        
