from rest_framework import serializers
from .models import BoardPost, PostImage, BoardComment


# 게시판 게시글 요약 정보 직렬화 클래스
class BoardPostSummarySerializer(serializers.ModelSerializer):
    author_nickname = serializers.CharField(source='author.nickname', read_only=True)
    board_type = serializers.CharField(read_only=True)  # ✅ 게시글/갤러리 구분
    thumbnail = serializers.SerializerMethodField()
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
            'created_at'
        ]
    # 게시글 썸네일 이미지 URL을 반환하는 메서드
    def get_thumbnail(self, obj): 
        image = obj.images.first()
        return image.image_url if image else None
    

# 게시글 이미지 직렬화 클래스
class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ['image_url']

# 게시판 게시글 상세 정보 직렬화 클래스
class BoardPostDetailSerializer(serializers.ModelSerializer):
    author_nickname = serializers.CharField(source='author.nickname', read_only=True)
    like_count = serializers.IntegerField(source='likes.count', read_only=True)
    images = PostImageSerializer(many=True, read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = BoardPost
        fields = [
            'id',
            'board_type',
            'title',
            'content',
            'author_nickname',
            'images',
            'like_count',
            'is_liked',
            'views',
            'created_at',
            'updated_at'
        ]

    def get_is_liked(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False
    
# 게시판 게시글 생성 직렬화 클래스
class BoardPostCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )

    class Meta:
        model = BoardPost
        fields = ['title', 'content', 'board_type', 'images']

    def create(self, validated_data):
        images = validated_data.pop('images', [])
        user = self.context['request'].user

        post = BoardPost.objects.create(author=user, **validated_data)

        for image in images:
            PostImage.objects.create(post=post, image_url=image)

        return post
    
# 댓글 직렬화 클래스
class BoardCommentSerializer(serializers.ModelSerializer):
    author_nickname = serializers.CharField(source='author.nickname', read_only=True)
    author_profile_image = serializers.ImageField(source='author.profile_image', read_only=True)
    like_count = serializers.IntegerField(source='likes.count', read_only=True)

    parent_id = serializers.IntegerField(required=False, allow_null=True)
    tagged_nickname = serializers.CharField(required=False, allow_blank=True)
    content = serializers.SerializerMethodField()

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
