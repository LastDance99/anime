import React, { useState } from "react";
import {
  CommentsBox,
  CommentsTitleRow,
  CommentsTitle,
  CommentAddButton,
  ChatContentBox,
  ChatScrollArea,
  ChatItem,
  ProfileImg,
  ChatTextBlock,
  ChatNickname,
  ChatText,
  ChatInputWrapper,
  ChatInput,
  DeleteButton,
} from "./CommentsBox.styled";
import type { ProfileComment } from "../../../../types/user";
import { useAuth } from "../../../../contexts/AuthContext";
import { addUserComment, deleteUserComment } from "../../../../api/profile";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  comments: ProfileComment[];
  userId: number;
  onRefresh?: () => void;
  isMyPage: boolean;
}

export default function ProfileComments({ comments, userId, onRefresh, isMyPage }: Props) {
  const { currentUser } = useAuth();
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentUser) return;
    try {
      await addUserComment(userId, input);
      setInput("");
      setShowInput(false);
      onRefresh?.();
    } catch (err) {
      console.error("댓글 작성 실패", err);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!currentUser) return;
    const ok = window.confirm(t("comment.delete_confirm"));
    if (!ok) return;

    try {
      await deleteUserComment(userId, commentId);
      onRefresh?.();
    } catch (err) {
      console.error("댓글 삭제 실패", err);
    }
  };

  const goToProfile = (authorId?: number) => {
    if (authorId) {
      navigate(`/profile/${authorId}`);
    }
  };

  return (
    <CommentsBox>
      <CommentsTitleRow>
        <CommentsTitle>{t("comment.title")}</CommentsTitle>
        {currentUser && (
          <CommentAddButton
            onClick={() => setShowInput(v => !v)}
            aria-label={showInput ? t("comment.close_input") : t("comment.add_comment")}
          >
            {showInput ? "−" : "+"}
          </CommentAddButton>
        )}
      </CommentsTitleRow>

      {showInput && (
        <form style={{ width: "100%" }} onSubmit={handleCommentSubmit}>
          <ChatInputWrapper>
            <ChatInput
              placeholder={t("comment.input_placeholder")}
              value={input}
              onChange={e => setInput(e.target.value)}
              autoFocus
            />
          </ChatInputWrapper>
        </form>
      )}

      <ChatContentBox>
        <ChatScrollArea>
          {comments.map(comment => {
            const isAuthor = currentUser?.id === comment.author?.id;
            const canDelete = isMyPage || isAuthor;

            return (
              <ChatItem key={comment.id}>
                <ProfileImg
                  src={comment.author?.profile_image || "/images/default.png"}
                  alt="profile"
                  style={{ cursor: "pointer" }}
                  onClick={() => goToProfile(comment.author?.id)}
                />
                <ChatTextBlock>
                  <ChatNickname
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => goToProfile(comment.author?.id)}
                  >
                    {comment.author?.nickname || t("comment.unknown")}
                  </ChatNickname>
                  <ChatText>{comment.content}</ChatText>
                </ChatTextBlock>
                {canDelete && (
                  <DeleteButton onClick={() => handleDelete(comment.id)}>
                    {t("comment.delete")}
                  </DeleteButton>
                )}
              </ChatItem>
            );
          })}
        </ChatScrollArea>
      </ChatContentBox>
    </CommentsBox>
  );
}