import random
import re
from rest_framework import serializers, exceptions
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from django.utils.timezone import now

from .models import EmailVerification

User = get_user_model()

# 1. 회원가입
class UserSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'nickname', 'gender', 'language')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate_email(self, value):
        email = value.strip().lower()
        try:
            record = EmailVerification.objects.get(email=email)
        except EmailVerification.DoesNotExist:
            raise serializers.ValidationError("이메일 인증이 필요합니다.")
        if not record.is_verified:
            raise serializers.ValidationError("이메일 인증이 완료되지 않았습니다.")
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("이미 가입된 이메일입니다.")
        return email

    def validate_nickname(self, value):
        nickname = value.strip()
        # 1. 길이 제한 (2~16자)
        if len(nickname) < 2 or len(nickname) > 16:
            raise serializers.ValidationError("닉네임은 2자 이상 16자 이하로 입력해야 합니다.")
        # 2. 한글/영문/숫자만 허용 (특수문자, 공백 포함 시 거부)
        #   - ^ : 시작, $ : 끝
        #   - 한글: \uac00-\ud7a3, 영문: a-zA-Z, 숫자: 0-9
        if not re.match(r'^[\uac00-\ud7a3a-zA-Z0-9]+$', nickname):
            raise serializers.ValidationError("닉네임은 한글, 영문, 숫자만 사용할 수 있습니다. (특수문자/공백 불가)")
        # 3. 대소문자 구분 없이 중복 체크
        if User.objects.filter(nickname__iexact=nickname).exists():
            raise serializers.ValidationError("이미 사용 중인 닉네임입니다.")
        return nickname

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("비밀번호는 최소 8자리여야 합니다.")
        if not re.search(r'[A-Za-z]', value) or not re.search(r'\d', value):
            raise serializers.ValidationError("비밀번호는 영문과 숫자를 모두 포함해야 합니다.")
        return value

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password2": "비밀번호가 일치하지 않습니다."})
        return data

    def create(self, validated_data):
        validated_data['email'] = validated_data['email'].strip().lower()
        validated_data['nickname'] = validated_data['nickname'].strip()
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

# 2. 로그인 (email 기반)
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise exceptions.AuthenticationFailed({'email': ["존재하지 않는 이메일입니다."]})

        if not user.check_password(password):
            raise exceptions.AuthenticationFailed({'password': ["비밀번호가 올바르지 않습니다."]})

        # 기본 jwt 토큰 발급 로직
        data = super().validate(attrs)
        user.last_login = now()
        user.save(update_fields=["last_login"])
        return data
    
# 3. 로그아웃용 – 리프레시 토큰 처리
class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            token = RefreshToken(self.token)
            token.blacklist()  # 토큰 블랙리스트에 등록
        except Exception as e:
            raise serializers.ValidationError('유효하지 않은 refresh 토큰입니다.')

# 4. 비밀번호 재설정용 – 이메일 전송
class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("해당 이메일로 등록된 유저가 없습니다.")
        return value

    def save(self):
        email = self.validated_data['email']
        user = User.objects.get(email=email)

        token_generator = PasswordResetTokenGenerator()
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)

        reset_link = f"http://localhost:5173/reset-password/{uid}/{token}/"

        send_mail(
            subject='[안타다] 비밀번호 재설정 링크입니다',
            message=f'다음 링크를 클릭해 비밀번호를 재설정하세요:\n{reset_link}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
        )

# 5. 비밀번호 재설정용 – 토큰 검증 및 비밀번호 변경
class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)
    new_password2 = serializers.CharField(write_only=True)

    def validate(self, attrs):
        try:
            uid = force_str(urlsafe_base64_decode(attrs['uid']))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError("유효하지 않은 사용자입니다.")

        token_generator = PasswordResetTokenGenerator()
        if not token_generator.check_token(user, attrs['token']):
            raise serializers.ValidationError("유효하지 않은 토큰입니다.")

        new_password = attrs.get('new_password')
        new_password2 = attrs.get('new_password2')

        # 비밀번호 유효성 검사
        if len(new_password) < 8:
            raise serializers.ValidationError({"new_password": "비밀번호는 최소 8자리여야 합니다."})
        if not re.search(r'[A-Za-z]', new_password) or not re.search(r'\d', new_password):
            raise serializers.ValidationError({"new_password": "비밀번호는 영문과 숫자를 모두 포함해야 합니다."})

        # 비밀번호 확인
        if new_password != new_password2:
            raise serializers.ValidationError({"new_password2": "비밀번호가 일치하지 않습니다."})

        # 기존 비밀번호와 동일한지 확인
        if user.check_password(new_password):
            raise serializers.ValidationError({"new_password": "기존 비밀번호와 동일한 비밀번호는 사용할 수 없습니다."})

        attrs['user'] = user
        return attrs

    def save(self):
        user = self.validated_data['user']
        new_password = self.validated_data['new_password']
        user.set_password(new_password)
        user.save()


# 6. 이메일 인증 요청용
class EmailVerificationRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def create_code(self):
        return f"{random.randint(100000, 999999)}"

    def validate_email(self, value):
        return value.lower()

    def save(self, **kwargs):
        email = self.validated_data["email"]
        code = self.create_code()

        # 인증 요청이 이미 있다면 업데이트, 없다면 새로 생성
        obj, created = EmailVerification.objects.update_or_create(
            email=email,
            defaults={
                "code": code,
                "is_verified": False,
                "expires_at": timezone.now() + timezone.timedelta(minutes=5),
            }
        )

        # 이메일 발송
        send_mail(
            subject="[안타다] 이메일 인증 코드",
            message=f"인증 코드는 다음과 같습니다: {code}",
            from_email=None,
            recipient_list=[email],
        )
        return obj
    
# 7. 이메일 인증 확인용
class EmailVerificationConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

    def validate(self, attrs):
        email = attrs["email"].lower()
        code = attrs["code"]

        try:
            record = EmailVerification.objects.get(email=email)
        except EmailVerification.DoesNotExist:
            raise serializers.ValidationError("인증 요청이 존재하지 않습니다.")

        if record.is_verified:
            raise serializers.ValidationError("이미 인증된 이메일입니다.")

        if record.is_expired():
            raise serializers.ValidationError("인증 코드가 만료되었습니다.")

        if record.code != code:
            raise serializers.ValidationError("인증 코드가 일치하지 않습니다.")

        attrs["record"] = record
        return attrs

    def save(self, **kwargs):
        record = self.validated_data["record"]
        record.is_verified = True
        record.save()
