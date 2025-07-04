from django.contrib import admin
from .models import UserActivity

@admin.register(UserActivity)
class UserActivityAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'user',
        'get_type_display',   # 이 메서드는 자동 생성됨! 한글로 표시
        'target_title',
        'parent_author_nickname',
        'created_at',
    ]
    list_filter = ['type', 'created_at', 'user']
    search_fields = ['user__nickname', 'user__email', 'target_title', 'parent_author_nickname']
    ordering = ['-created_at']