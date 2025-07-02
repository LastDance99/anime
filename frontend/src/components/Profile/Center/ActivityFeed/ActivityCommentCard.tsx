import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
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
  WrapperBox,
  CommentContainer,
} from "./ActivityPostCommentCard.styled";
import { getBoardComments } from "../../../../api/board";
import type { BoardComment } from "../../../../types/comment";
import CommentListBox from "./CommentListBox";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Props {
  post_id: number;
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
  const { t, i18n } = useTranslation();
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

  useEffect(() => {
    dayjs.locale(i18n.language);
  }, [i18n.language]);

  const handleClick = async () => {
    if (!isExpanded && comments.length === 0) {
      setLoading(true);
      try {
        const res = await getBoardComments(post_id, "created");
        setComments(res.results);
      } catch (err) {
        console.error("\u274C 댓글 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    setIsExpanded((prev) => !prev);
  };

  return (
    <PostCommentCard $type="comment">
      <WrapperBox onClick={handleClick}>
        <FlexBox>
          <TopBox>
            <ProfileImg src={post_author_profile_image} alt={post_author_nickname} />
            <Nickname>{post_author_nickname}</Nickname>
          </TopBox>
          <div>
            <b>"{post_title}"</b> {t("activity.commented_on")}<br />
            {comment}
          </div>
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
            key="comments"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div ref={contentRef}>
              <CommentListBox comments={comments} />
            </div>
          </CommentContainer>
        )}
        {isExpanded && comments.length === 0 && !loading && (
          <CommentContainer
            key="empty"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 60 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div style={{ padding: "12px 16px", fontSize: 14 }}>
              {t("activity.no_comments")}
            </div>
          </CommentContainer>
        )}
      </AnimatePresence>
    </PostCommentCard>
  );
}