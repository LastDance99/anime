from django.contrib import admin
from .models import BoardPost, PostLike, BoardComment, CommentLike

# 모델별로 바로 등록!
admin.site.register(BoardPost)
admin.site.register(PostLike)
admin.site.register(BoardComment)
admin.site.register(CommentLike)