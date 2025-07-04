import React, { useState, useEffect } from "react";
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
  CommentText,
} from "./ActivityPostCommentCard.styled";
import { getBoardComments } from "../../../../api/board";
import type { BoardComment } from "../../../../types/comment";
import CommentListBox from "./CommentListBox";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";

const DEFAULT_PROFILE_IMG = import.meta.env.VITE_DEFAULT_PROFILE_IMG;

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
        console.error("❌ 댓글 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    }
    setIsExpanded((prev) => !prev);
  };

  function renderCommentContent(comment: string) {
    if (/<img[\s\S]*src=/.test(comment)) {
      return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment) }} />;
    }
    if (/^https?:\/\/.*\.(png|jpe?g|gif|webp)$/i.test(comment.trim())) {
      return (
        <img
          src={comment.trim()}
          alt="첨부 이미지"
          style={{ maxWidth: 320, borderRadius: 8, marginTop: 8 }}
        />
      );
    }
    return <div>{comment}</div>;
  }

  return (
    <PostCommentCard $type="comment">
      <WrapperBox onClick={handleClick}>
        <FlexBox>
          <TopBox>
            <ProfileImg
              src={post_author_profile_image || DEFAULT_PROFILE_IMG}
              alt={post_author_nickname}
            />
            <Nickname>{post_author_nickname}</Nickname>
          </TopBox>
          <CommentText>
            <b>"{post_title}"</b> {t("activity.commented_on")}<br />
            {renderCommentContent(comment)}
          </CommentText>
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
            key="comments"
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
                  {t("activity.no_comments")}
                </div>
              )
            )}
          </CommentContainer>
        )}
      </AnimatePresence>
    </PostCommentCard>
  );
}