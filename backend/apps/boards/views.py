from rest_framework import permissions
from rest_framework.generics import ListCreateAPIView
from django.db.models import Count, Q
from .models import BoardPost, PostLike, BoardComment, CommentLike
from .serializers import BoardPostSummarySerializer
from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from .serializers import BoardPostDetailSerializer, BoardPostCreateSerializer, BoardCommentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.exceptions import PermissionDenied



# 게시판 목록 조회 API
class BoardPostListCreateView(ListCreateAPIView):

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [AllowAny()]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BoardPostCreateSerializer
        return BoardPostSummarySerializer

    def get_queryset(self):
        board_type = self.request.query_params.get('type', 'all')
        sort = self.request.query_params.get('sort', 'newest')
        search = self.request.query_params.get('search', '')

        qs = BoardPost.objects.all().annotate(
            like_count=Count('likes'),
            comment_count=Count('comments')
        )

        if board_type == 'post':
            qs = qs.filter(board_type='post')
        elif board_type == 'gallery':
            qs = qs.filter(board_type='gallery')
        elif board_type == 'like10':
            qs = qs.filter(like_count__gte=10)
        elif board_type == 'like30':
            qs = qs.filter(like_count__gte=30)

        if search:
            qs = qs.filter(Q(title__icontains=search) | Q(content__icontains=search))

        if sort == 'oldest':
            qs = qs.order_by('created_at')
        else:
            qs = qs.order_by('-created_at')

        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

# 게시판 게시글 상세 조회 API
class BoardPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BoardPost.objects.all()
    serializer_class = BoardPostDetailSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'id'
    lookup_url_kwarg = 'post_id'

    # ✅ 조회 시 조회수 증가
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save(update_fields=['views'])
        serializer = self.get_serializer(instance, context={"request": request})
        return Response(serializer.data)

    # ✅ 수정 권한: 작성자 본인만
    def perform_update(self, serializer):
        post = self.get_object()
        if post.author != self.request.user:
            raise PermissionDenied("게시글 수정 권한이 없습니다.")
        serializer.save()

    # ✅ 삭제 권한: 작성자 본인만
    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionDenied("게시글 삭제 권한이 없습니다.")
        instance.delete()
    
# 게시글 좋아요/좋아요 취소 API
class BoardPostLikeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id):
        post = get_object_or_404(BoardPost, id=post_id)
        user = request.user

        # 이미 좋아요 한 경우
        if PostLike.objects.filter(post=post, user=user).exists():
            return Response({"message": "이미 좋아요를 눌렀습니다."}, status=status.HTTP_400_BAD_REQUEST)

        PostLike.objects.create(post=post, user=user)
        return Response({"message": "좋아요 등록됨"}, status=status.HTTP_201_CREATED)

    def delete(self, request, post_id):
        post = get_object_or_404(BoardPost, id=post_id)
        user = request.user

        like = PostLike.objects.filter(post=post, user=user).first()
        if not like:
            return Response({"message": "좋아요를 누른 적이 없습니다."}, status=status.HTTP_400_BAD_REQUEST)

        like.delete()
        return Response({"message": "좋아요 취소됨"}, status=status.HTTP_204_NO_CONTENT)
    


# 댓글/대댓글 목록 조회 + 작성
class BoardCommentListCreateView(generics.ListCreateAPIView):
    serializer_class = BoardCommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        sort = self.request.query_params.get('sort', 'created')  # created | latest | like

        qs = BoardComment.objects.filter(
            post_id=post_id,
            parent__isnull=True
        ).annotate(
            like_count=Count('likes')
        )

        if sort == 'latest':
            qs = qs.order_by('-created_at')
        elif sort == 'like':
            qs = qs.order_by('-like_count')
        else:
            qs = qs.order_by('created_at')  # 등록순

        # 대댓글 및 좋아요 정보 사전 로딩
        return qs.prefetch_related('replies', 'likes')

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        parent_id = self.request.data.get('parent_id')
        tagged_nickname = self.request.data.get('tagged_nickname')

        serializer.save(
            author=self.request.user,
            post_id=post_id,
            parent_id=parent_id,
            tagged_nickname=tagged_nickname
        )


# 댓글 좋아요 등록 (취소 불가)
class BoardCommentLikeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, comment_id):
        comment = get_object_or_404(BoardComment, id=comment_id)
        user = request.user

        if CommentLike.objects.filter(comment=comment, user=user).exists():
            return Response({"message": "이미 좋아요를 누르셨습니다."}, status=status.HTTP_400_BAD_REQUEST)

        CommentLike.objects.create(comment=comment, user=user)
        return Response({"message": "좋아요 완료"}, status=status.HTTP_201_CREATED)


# 댓글 삭제 (대댓글 존재 시 soft delete)
class BoardCommentDeleteView(generics.DestroyAPIView):
    queryset = BoardComment.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        comment = self.get_object()

        if comment.author != request.user:
            raise PermissionDenied("삭제 권한이 없습니다.")

        has_replies = comment.replies.exists()

        if has_replies:
            comment.is_deleted = True
            comment.content = ""
            comment.save()
            return Response({"message": "댓글 내용이 삭제 처리되었습니다."}, status=200)

        return super().delete(request, *args, **kwargs)
    