import React from "react";
import dayjs from "dayjs";
import { ThumbsUp, MessageCircle } from "lucide-react";
import {
  BaseCard,
  ProfileImg,
  Nickname,
  TimeText,
  StatsBox,
  StatItem,
  SideInfoBox,
  Thumbnail,
} from "./ActivityCard.styled";

interface Props {
  post_author_nickname: string;
  post_author_profile_image: string;
  post_title: string;
  comment: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  thumbnail?: string;
}

export default function ActivityCommentCard({
  post_author_nickname,
  post_author_profile_image,
  post_title,
  comment,
  created_at,
  like_count,
  comment_count,
  thumbnail,
}: Props) {
  return (
    <BaseCard $type="comment">
      <ProfileImg src={post_author_profile_image} alt={post_author_nickname} />
      <div style={{ width: "64%" }}>
        <Nickname>{post_author_nickname}</Nickname>님의 글
        <b> "{post_title}"</b>에 댓글을 남겼습니다.<br />
        {thumbnail && <Thumbnail src={thumbnail} alt="썸네일" />}
      </div>
      

      <SideInfoBox>
        <TimeText>{dayjs(created_at).fromNow()}</TimeText>
        <StatsBox>
          <StatItem>
            <ThumbsUp size={14} />
            {like_count}
          </StatItem>
          <StatItem>
            <MessageCircle size={14} />
            {comment_count}
          </StatItem>
        </StatsBox>
      </SideInfoBox>
    </BaseCard>
  );
}