import random

from rest_framework.generics import ListCreateAPIView, ListAPIView
from django.db.models import Count, Q
from .models import BoardPost, PostLike, BoardComment, CommentLike
from .serializers import BoardPostSummarySerializer
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import generics
from django.utils import timezone
from rest_framework.exceptions import PermissionDenied
from apps.core.utils.extractor import extract_thumbnail_from_html 
from apps.core.utils.sanitizer import sanitize_html
from apps.profiles.utils.activity import create_user_activity
from apps.profiles.models import Attendance
from .serializers import (
    BoardPostDetailSerializer, 
    BoardPostCreateSerializer, 
    BoardCommentSerializer,
)

# 게시판 목록 조회/게시글 생성 API
class BoardPostListCreateView(ListCreateAPIView):

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return BoardPostCreateSerializer
        return BoardPostSummarySerializer

    def get_queryset(self):
        board_type = self.request.query_params.get('type', 'all')
        sort = self.request.query_params.get('sort', 'newest')
        search = self.request.query_params.get('search', '')

        qs = BoardPost.objects.all().annotate(
            like_count=Count('likes', distinct=True),
            comment_count=Count('comments', distinct=True)
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
        content = self.request.data.get("content", "")
        sanitized_content = sanitize_html(content)
        thumbnail_url = extract_thumbnail_from_html(sanitized_content)

        post = serializer.save(content=sanitized_content, thumbnail_url=thumbnail_url)

        create_user_activity(
            user=self.request.user,
            type="post_create",
            target_id=post.id,
            target_title=post.title
        )
        

# 게시판 게시글 상세 조회 API
class BoardPostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BoardPost.objects.all()
    serializer_class = BoardPostDetailSerializer
    lookup_field = 'id'
    lookup_url_kwarg = 'post_id'

    # 조회 시 조회수 증가
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save(update_fields=['views'])
        serializer = self.get_serializer(instance, context={"request": request})
        return Response(serializer.data)

    # 수정 권한: 작성자 본인만
    def perform_update(self, serializer):
        post = self.get_object()
        if post.author != self.request.user:
            raise PermissionDenied("게시글 수정 권한이 없습니다.")

        content = self.request.data.get("content", post.content)
        sanitized_content = sanitize_html(content)
        thumbnail_url = extract_thumbnail_from_html(sanitized_content)

        serializer.save(content=sanitized_content, thumbnail_url=thumbnail_url)

    # 삭제 권한: 작성자 본인만
    def perform_destroy(self, instance):
        if instance.author != self.request.user:
            raise PermissionDenied("게시글 삭제 권한이 없습니다.")
        instance.delete()
    
# 게시글 좋아요/좋아요 취소 API
class BoardPostLikeView(APIView):

    def post(self, request, post_id):
        post = get_object_or_404(BoardPost, id=post_id)
        user = request.user

        if PostLike.objects.filter(post=post, user=user).exists():
            return Response({"message": "이미 좋아요를 눌렀습니다."}, status=status.HTTP_400_BAD_REQUEST)

        PostLike.objects.create(post=post, user=user)
        return Response({
            "message": "좋아요 등록됨",
            "is_liked": True,
            "like_count": PostLike.objects.filter(post=post).count()
        }, status=status.HTTP_201_CREATED)

    def delete(self, request, post_id):
        post = get_object_or_404(BoardPost, id=post_id)
        user = request.user

        like = PostLike.objects.filter(post=post, user=user).first()
        if not like:
            return Response({"message": "좋아요를 누른 적이 없습니다."}, status=status.HTTP_400_BAD_REQUEST)

        like.delete()
        return Response({
            "message": "좋아요 취소됨",
            "is_liked": False,
            "like_count": PostLike.objects.filter(post=post).count()
        }, status=status.HTTP_200_OK)
    


# 댓글/대댓글 목록 조회 + 작성
class BoardCommentListCreateView(generics.ListCreateAPIView):
    serializer_class = BoardCommentSerializer

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        sort = self.request.query_params.get('sort', 'created')  # created | latest | like

        qs = BoardComment.objects.filter(
            post_id=post_id,
            parent__isnull=True,
        ).annotate(
            like_count=Count('likes')
        )

        if sort == 'latest':
            qs = qs.order_by('-created_at') # 최신순
        elif sort == 'like':
            qs = qs.order_by('-like_count')
        else:
            qs = qs.order_by('created_at')  # 등록순

        # 대댓글 및 좋아요 정보 사전 로딩
        return qs.prefetch_related('replies', 'likes')

    def perform_create(self, serializer):
        post_id = self.kwargs['post_id']
        post = BoardPost.objects.get(id=post_id)
        parent_id = self.request.data.get('parent_id')
        tagged_nickname = self.request.data.get('tagged_nickname')
        content = self.request.data.get("content", "")

        # content 필드 XSS 방어 처리
        from apps.core.utils.sanitizer import sanitize_html
        sanitized_content = sanitize_html(content)

        parent = None
        if parent_id is not None:
            try:
                parent = BoardComment.objects.get(id=parent_id, post_id=post_id)
            except BoardComment.DoesNotExist:
                raise ValidationError({"parent_id": "존재하지 않는 댓글입니다."})

        comment = serializer.save(
            author=self.request.user,
            post=post,
            parent_id=parent_id,
            tagged_nickname=tagged_nickname,
            content=sanitized_content,
        )

        # 활동 기록
        # 댓글 단 게시글 정보 조회 (게시글/갤러리 모두 대응)
        if self.request.user != post.author:
            create_user_activity(
                user=self.request.user,
                type="comment_create",
                target_id=post.id,
                parent_author_nickname=post.author.nickname,
                parent_author_profile_image=post.author.profile_image.url if post.author.profile_image else None,
                parent_title=post.title,
                extra_content=comment.content,
            )


# 댓글 좋아요 등록 (취소 불가)
class BoardCommentLikeView(APIView):

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
        else:
            parent = comment.parent
            response = super().delete(request, *args, **kwargs)  # 진짜 삭제

            # 부모 soft-delete 댓글도 대댓글 없으면 같이 삭제
            if parent and parent.is_deleted and parent.replies.count() == 0:
                parent.delete()
            return response
    
# 게시판 미니 프로필 뷰
class BoardMiniProfileView(APIView):

    def get(self, request):
        user = request.user
        post_count = BoardPost.objects.filter(author=user).count()
        comment_count = BoardComment.objects.filter(author=user).count()
        attendance_count = Attendance.objects.filter(user=user).count()
        return Response({
            "post_count": post_count,
            "comment_count": comment_count,
            "attendance_count": attendance_count
        })
    
# 게시판 공지사항 목록 조회 API
class BoardNoticeListView(ListAPIView):
    serializer_class = BoardPostSummarySerializer 
    def get_queryset(self):
        qs = BoardPost.objects.filter(is_notice=True).order_by("-created_at")
        limit = int(self.request.GET.get("limit", 3))
        return qs[:limit]
    

# 게시판 인기 게시글 목록 조회 API
class BoardPopularListView(ListAPIView):
    serializer_class = BoardPostSummarySerializer
    def get_queryset(self):
        period = self.request.GET.get("period", "today")
        limit = int(self.request.GET.get("limit", 5))
        qs = BoardPost.objects.all()
        if period == "today":
            today = timezone.now().date()
            qs = qs.filter(created_at__date=today)
        # 조회수, 좋아요 등 순 정렬
        order = self.request.GET.get("order", "views")
        if order == "likes":
            qs = qs.order_by("-like_count")
        elif order == "comments":
            qs = qs.order_by("-comment_count")
        else:
            qs = qs.order_by("-views")
        return qs[:limit]
    
# 게시판 추천 게시글 목록 조회 API
class BoardRecommendListView(ListAPIView):
    serializer_class = BoardPostSummarySerializer
    def get_queryset(self):
        limit = int(self.request.GET.get("limit", 5))
        # 랜덤 추천: 최근 100개 중 랜덤 N개
        ids = list(BoardPost.objects.order_by("-created_at").values_list("id", flat=True)[:100])
        if not ids:
            return BoardPost.objects.none()
        chosen = random.sample(ids, min(limit, len(ids)))
        return BoardPost.objects.filter(id__in=chosen)