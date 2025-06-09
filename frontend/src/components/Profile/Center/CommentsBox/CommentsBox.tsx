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
} from "./CommentsBox.styled";
import { mockUsers } from "../../../../data/userList";
import type { ProfileComment } from "../../../../types/user";

export default function ProfileComments({ comments }: { comments: ProfileComment[] }) {
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    alert("댓글 작성: " + input);
    setInput("");
    setShowInput(false);
  };

  return (
    <CommentsBox>
      <CommentsTitleRow>
        <CommentsTitle>Comments</CommentsTitle>
        <CommentAddButton
          onClick={() => setShowInput(v => !v)}
          aria-label={showInput ? "입력창 닫기" : "댓글 작성"}
        >
          {showInput ? "−" : "+"}
        </CommentAddButton>
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
            const author = mockUsers.find(u => u.id === comment.author_id);
            return (
              <ChatItem key={comment.id}>
                <ProfileImg src={author?.profile_image} alt="profile" />
                <ChatTextBlock>
                  <ChatNickname>{author?.nickname}</ChatNickname>
                  <ChatText>{comment.content}</ChatText>
                </ChatTextBlock>
              </ChatItem>
            );
          })}
        </ChatScrollArea>
      </ChatContentBox>
    </CommentsBox>
  );
}