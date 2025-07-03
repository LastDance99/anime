import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ThumbsUp, MessageCircle } from "lucide-react";
import {
  PostCommentCard,
  ProfileImg,
  Nickname,
  PostTimeText,
  SideInfoBox,
  Thumbnail,
  PostStatsBox,
  StatItem,
  FlexBox,
  TopBox,
  CommentContainer,
  WrapperBox,
} from "./ActivityPostCommentCard.styled";
import { getBoardComments } from "../../../../api/board";
import type { BoardComment } from "../../../../types/comment";
import CommentListBox from "./CommentListBox";
import { AnimatePresence } from "framer-motion";

dayjs.extend(relativeTime);

interface Props {
  nickname: string;
  profile_image: string;
  post_title: string;
  content: string;
  created_at: string;
  like_count: number;
  comment_count: number;
  thumbnail?: string;
  post_id: number;
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
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!isExpanded && comments.length === 0) {
      setLoading(true);
      try {
        const res = await getBoardComments(post_id, "created");
        setComments(res.results);
      } catch (err) {
        console.error("❌ 댓글 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    setIsExpanded((prev) => !prev);
  };

  return (
    <PostCommentCard $type="post">
      <WrapperBox onClick={handleClick}>
        <FlexBox>
          <TopBox>
            <ProfileImg src={profile_image} alt={nickname} />
            <Nickname>{nickname}</Nickname>
          </TopBox>
          <div>{post_title}</div>
          {content && <div>{content}</div>}
          {thumbnail && <Thumbnail src={thumbnail} alt="썸네일" />}
        </FlexBox>

        <SideInfoBox>
          <PostTimeText>{dayjs(created_at).fromNow()}</PostTimeText>
          <PostStatsBox>
            <StatItem><ThumbsUp size={14} />{like_count}</StatItem>
            <StatItem><MessageCircle size={14} />{comment_count}</StatItem>
          </PostStatsBox>
        </SideInfoBox>
      </WrapperBox>

      <AnimatePresence>
        {isExpanded && (
          <CommentContainer
            key="post-comments"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {comments.length > 0 ? (
              <CommentListBox comments={comments} />
            ) : (
              !loading && (
                <div style={{ padding: "12px 16px", fontSize: 14 }}>
                  댓글이 없습니다.
                </div>
              )
            )}
          </CommentContainer>
        )}
      </AnimatePresence>
    </PostCommentCard>
  );
}