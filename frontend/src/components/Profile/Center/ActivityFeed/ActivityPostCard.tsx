import React, { useState } from "react";
import dayjs from "dayjs";
import { ThumbsUp, MessageCircle } from "lucide-react";
import {
  BaseCard,
  ProfileImg,
  Nickname,
  PostTimeText,
  SideInfoBox,
  Thumbnail,
  PostStatsBox,
  StatItem,
  FlexBox,
  TopBox,
} from "./ActivityCard.styled";
import { getBoardComments } from "../../../../api/board"; // ← 이거 너가 만든 API
import type { BoardComment } from "../../../../types/comment";

interface Props {
  nickname: string;
  profile_image: string;
  post_title: string;
  content: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  thumbnail?: string;
  post_id: number; // 🔥 이거 추가해야 함
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
  post_id,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState<BoardComment[]>([]);

  const handleClick = async () => {
    console.log("🔥 clicked post_id:", post_id); // 🔍 확인
    if (!isExpanded) {
      try {
        const res = await getBoardComments(post_id, "created");
        console.log("📦 댓글 응답:", res);
        setComments(res.results);
      } catch (err) {
        console.error("❌ 댓글 로딩 실패:", err);
      }
    }
    setIsExpanded(prev => !prev);
  };

  return (
    <BaseCard $type="post" onClick={handleClick}>
      <FlexBox>
        <TopBox>
          <ProfileImg src={profile_image} alt={nickname} />
          <Nickname>{nickname}</Nickname>
        </TopBox> 
        
        {post_title}
        {thumbnail && <Thumbnail src={thumbnail} alt="썸네일" />}
      </FlexBox>    

      <SideInfoBox>
        <PostTimeText>{dayjs(created_at).fromNow()}</PostTimeText>
        <PostStatsBox>
          <StatItem>
            <ThumbsUp size={14} />
            {like_count}
          </StatItem>
          <StatItem>
            <MessageCircle size={14} />
            {comment_count}
          </StatItem>
        </PostStatsBox>
      </SideInfoBox>

      {/* 🔽 댓글 표시 */}
      {isExpanded && (
        <ul style={{ marginTop: "12px", paddingLeft: "20px" }}>
          {comments.map((c: BoardComment) => (
            <li key={c.id}>
              <b>{c.author_nickname}</b>: {c.is_deleted ? "(삭제됨)" : c.content}
              <ul>
                {c.replies.map((r: BoardComment) => (
                  <li key={r.id}>
                    ↳ <b>{r.author_nickname}</b>: {r.is_deleted ? "(삭제됨)" : r.content}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </BaseCard>
  );
}