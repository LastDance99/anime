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
import { getBoardComments } from "../../../../api/board"; // 댓글 가져오는 API
import type { BoardComment } from "../../../../types/comment";

interface Props {
  post_id: number; // 🔥 post id 필요함
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
  post_id,
  post_author_nickname,
  post_author_profile_image,
  post_title,
  comment,
  created_at,
  like_count,
  comment_count,
  thumbnail,
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
    <BaseCard $type="comment" onClick={handleClick}>
      <FlexBox>
        <TopBox>
          <ProfileImg src={post_author_profile_image} alt={post_author_nickname} />
          <Nickname>{post_author_nickname}</Nickname>
        </TopBox>

        <div>
          <b>"{post_title}"</b>에 댓글을 남겼습니다.
          <br />
          {comment}
        </div>

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

      {/* 🔽 댓글 리스트 표시 */}
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