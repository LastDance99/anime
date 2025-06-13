from apps.profiles.models import UserActivity

def create_user_activity(
    user,
    type,
    target_id=None,
    target_title="",
    target_image="",
    parent_author_nickname="",
    parent_author_profile_image="",
    parent_title=""
):
    UserActivity.objects.create(
        user=user,
        type=type,
        target_id=target_id,
        target_title=target_title,
        target_image=target_image,
        parent_author_nickname=parent_author_nickname,
        parent_author_profile_image=parent_author_profile_image,
        parent_title=parent_title
    )
