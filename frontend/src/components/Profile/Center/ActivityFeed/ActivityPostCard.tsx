import React from "react";
import dayjs from "dayjs";
import { ThumbsUp, MessageCircle } from "lucide-react";
import {
  BaseCard,
  ProfileImg,
  Nickname,
  TimeText,
  SideInfoBox,
  Thumbnail,
  StatsBox,
  StatItem,
} from "./ActivityCard.styled";

interface Props {
  nickname: string;
  profile_image: string;
  post_title: string;
  content: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  thumbnail?: string;
}

export default function ActivityPostCard({
  nickname,
  profile_image,
  post_title,
  content,
  created_at,
  like_count,
  comment_count,
  thumbnail,
}: Props) {
  return (
    <BaseCard $type="post">
      <ProfileImg src={profile_image} alt={nickname} />
      <div style={{ width: "64%" }}>
        <Nickname>{nickname}</Nickname>님이 새 글을 작성했습니다.<br />
        {post_title}<br />
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