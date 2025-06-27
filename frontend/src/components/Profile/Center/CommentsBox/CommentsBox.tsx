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

interface Props {
  comments: ProfileComment[];
  userId: number; // 댓글이 달린 프로필의 주인 ID
  onRefresh?: () => void;
}

export default function ProfileComments({ comments, userId, onRefresh }: Props) {
  const { currentUser } = useAuth();
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");

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
    const ok = window.confirm("댓글을 삭제하시겠습니까?");
    if (!ok) return;

    try {
      await deleteUserComment(userId, commentId);
      onRefresh?.();
    } catch (err) {
      console.error("댓글 삭제 실패", err);
    }
  };

  return (
    <CommentsBox>
      <CommentsTitleRow>
        <CommentsTitle>Comments</CommentsTitle>
        {currentUser && (
          <CommentAddButton
            onClick={() => setShowInput(v => !v)}
            aria-label={showInput ? "입력창 닫기" : "댓글 작성"}
          >
            {showInput ? "−" : "+"}
          </CommentAddButton>
        )}
      </CommentsTitleRow>

      {showInput && (
        <form style={{ width: "100%" }} onSubmit={handleCommentSubmit}>
          <ChatInputWrapper>
            <ChatInput
              placeholder="댓글을 입력해 주세요"
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
            const isProfileOwner = currentUser?.id === userId;

            const canDelete = isAuthor || isProfileOwner;

            return (
              <ChatItem key={comment.id}>
                <ProfileImg
                  src={comment.author?.profile_image || "/images/default.png"}
                  alt="profile"
                />
                <ChatTextBlock>
                  <ChatNickname>{comment.author?.nickname || "알 수 없음"}</ChatNickname>
                  <ChatText>{comment.content}</ChatText>
                </ChatTextBlock>
                {canDelete && (
                  <DeleteButton onClick={() => handleDelete(comment.id)}>삭제</DeleteButton>
                )}
              </ChatItem>
            );
          })}
        </ChatScrollArea>
      </ChatContentBox>
    </CommentsBox>
  );
}