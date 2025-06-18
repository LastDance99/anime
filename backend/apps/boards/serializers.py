from rest_framework import serializers
from .models import BoardPost, BoardComment

# 게시판 게시글 요약 정보 직렬화 클래스
class BoardPostSummarySerializer(serializers.ModelSerializer):
    author_nickname = serializers.CharField(source='author.nickname', read_only=True)
    board_type = serializers.CharField(read_only=True)
    thumbnail = serializers.URLField(source='thumbnail_url', read_only=True)
    like_count = serializers.IntegerField(source='likes.count', read_only=True)
    comment_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = BoardPost
        fields = [
            'id', 
            'title', 
            'board_type', 
            'author_nickname', 
            'thumbnail',
            'like_count', 
            'comment_count', 
            'views', 
            'created_at',
        ]

# 게시판 게시글 상세 정보 직렬화 클래스
class BoardPostDetailSerializer(serializers.ModelSerializer):
    author_nickname = serializers.CharField(source='author.nickname', read_only=True)
    like_count = serializers.IntegerField(source='likes.count', read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = BoardPost
        fields = [
            'id', 
            'board_type', 
            'title', 
            'content', 
            'author_nickname',
            'like_count', 
            'is_liked', 
            'views', 
            'created_at', 
            'updated_at',
        ]

    def get_is_liked(self, obj):
        request = self.context.get("request")
        return obj.likes.filter(id=request.user.id).exists() if request and request.user.is_authenticated else False
    
# 게시판 게시글 생성 직렬화 클래스
class BoardPostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BoardPost
        fields = ['title', 'content', 'board_type']

    def create(self, validated_data):
        user = self.context['request'].user
        return BoardPost.objects.create(author=user, **validated_data)
    
# 댓글 직렬화 클래스
class BoardCommentSerializer(serializers.ModelSerializer):
    author_nickname = serializers.CharField(source='author.nickname', read_only=True)
    author_profile_image = serializers.ImageField(source='author.profile_image', read_only=True)
    like_count = serializers.IntegerField(source='likes.count', read_only=True)

    parent_id = serializers.IntegerField(required=False, allow_null=True)
    tagged_nickname = serializers.CharField(required=False, allow_blank=True)
    content = serializers.CharField()

    class Meta:
        model = BoardComment
        fields = [
            'id',
            'post',
            'parent_id',
            'author_nickname',
            'author_profile_image',
            'tagged_nickname',
            'content',
            'like_count',
            'replies',
            'created_at',
        ]
        read_only_fields = [
            'id',
            'post',
            'author_nickname',
            'author_profile_image',
            'like_count',
            'created_at',
        ]

    def get_content(self, obj):
        if obj.is_deleted:
            return "삭제된 댓글입니다"
        return obj.content
    
    def get_replies(self, obj):
        children = obj.replies.all().order_by('created_at')  # 대댓글은 등록순
        return BoardCommentSerializer(children, many=True, context=self.context).data
