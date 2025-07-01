from apps.profiles.models import UserActivity

# 사용자 활동 기록 생성 함수
def create_user_activity(
    user,
    type,
    target_id=None,
    target_title="",
    target_image="",
    parent_author_nickname="",
    parent_author_profile_image="",
    parent_title="",
    extra_content="",
):
    UserActivity.objects.create(
        user=user,
        type=type,
        target_id=target_id,
        target_title=target_title,
        target_image=target_image,
        parent_author_nickname=parent_author_nickname,
        parent_author_profile_image=parent_author_profile_image,
        parent_title=parent_title,
        extra_content=extra_content,
    )
