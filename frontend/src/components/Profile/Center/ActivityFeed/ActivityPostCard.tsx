import React from "react";
import { BaseCard, ProfileImg, Nickname, TimeText } from "./ActivityCard.styled";
import dayjs from "dayjs";

export default function ActivityPostCard({
  nickname,
  profile_image,
  post_title,
  content,
  created_at,
}: {
  nickname: string;
  profile_image: string;
  post_title: string;
  content: string;
  created_at: string;
}) {
  return (
    <BaseCard $type="post">
      <ProfileImg src={profile_image} alt={nickname} />
      <div>
        <Nickname>{nickname}</Nickname>님이 새 글을 작성했습니다.<br />
        {post_title}<br />
      </div>
      <TimeText>{dayjs(created_at).fromNow()}</TimeText>
    </BaseCard>
  );
}
