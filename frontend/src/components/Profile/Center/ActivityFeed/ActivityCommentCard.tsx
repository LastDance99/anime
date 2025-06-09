import React from "react";
import dayjs from "dayjs";
import { BaseCard, ProfileImg, Nickname, TimeText } from "./ActivityCard.styled";

export default function ActivityCommentCard({
  post_author_nickname,
  post_author_profile_image,
  post_title,
  comment,
  created_at,
}: {
  post_author_nickname: string;
  post_author_profile_image: string;
  post_title: string;
  comment: string;
  created_at: string;
}) {
  return (
    <BaseCard $type="comment">
      <ProfileImg src={post_author_profile_image} alt={post_author_nickname} />
      <div>
        <Nickname>{post_author_nickname}</Nickname>님의 글
        <b> "{post_title}"</b>에 댓글을 남겼습니다.<br />
      </div>
      <TimeText>{dayjs(created_at).fromNow()}</TimeText>
    </BaseCard>
  );
}
