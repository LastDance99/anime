import React, { useState, useRef, useEffect } from "react";
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
import { AnimatePresence, motion } from "framer-motion";

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
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isExpanded && contentRef.current) {
      requestAnimationFrame(() => {
        if (contentRef.current) {
          setHeight(contentRef.current.scrollHeight + 24);
        }
      });
    } else {
      setHeight(0);
    }
  }, [isExpanded, comments]);

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
    setIsExpanded(prev => !prev);
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
        {isExpanded && comments.length > 0 && (
          <CommentContainer
            initial={{ height: 0, opacity: 0 }}
            animate={{ height, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div ref={contentRef}>
              <CommentListBox comments={comments} />
            </div>
          </CommentContainer>
        )}
      </AnimatePresence>
    </PostCommentCard>
  );
}