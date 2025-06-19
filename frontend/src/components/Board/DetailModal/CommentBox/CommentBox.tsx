import { useEffect, useRef, useState } from "react";
import {
  getBoardComments,
  addBoardComment,
  toggleCommentLike,
  deleteComment,
} from "../../../../api/board";
import type { BoardComment } from "../../../../types/comment";
import {
  Wrapper,
  TabList,
  Tab,
  CommentList,
  CommentItem,
  Profile,
  CommentContent,
  Nickname,
  Text,
  Meta,
  ReplyBtn,
  InputWrapper,
  CommentInput,
  SubmitBtn,
  LikeButton,
  ReplyInputWrapper,
  ReplyInput,
  ReplySubmitBtn,
  TagMention,
} from "./CommentBox.styled";
import { useAuth } from "../../../../contexts/AuthContext";
import { ThumbsUp, CornerDownRight } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type Props = {
  contentType: "post" | "gallery";
  contentId: number;
};

type SortType = "createdDesc" | "createdAsc" | "likeDesc";

export default function CommentBox({ contentType, contentId }: Props) {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState<BoardComment[]>([]);
  const [input, setInput] = useState("");
  const [replyState, setReplyState] = useState<{
    targetId: number | null;
    parentId: number | null;
    tagged_nickname?: string;
  }>({ targetId: null, parentId: null, tagged_nickname: undefined });
  const [replyInput, setReplyInput] = useState("");
  const [sort, setSort] = useState<SortType>("createdDesc");

  const commentListRef = useRef<HTMLDivElement>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getBoardComments(contentId).then(setComments);
  }, [contentId]);

  const handleLike = async (id: number) => {
    const res = await toggleCommentLike(id);
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, liked: res.liked, like_count: res.like_count } : c
      )
    );
  };

  const handleSubmit = async () => {
    if (!input.trim() || !currentUser) return;

    const newComment = await addBoardComment(contentId, { content: input });
    setComments((prev) => [...prev, newComment]);
    setInput("");
  };

  const handleReplyToggle = (target: BoardComment) => {
    const parentId = target.parent_id ?? target.id;
    setReplyState({
      targetId: replyState.targetId === target.id ? null : target.id,
      parentId: replyState.targetId === target.id ? null : parentId,
      tagged_nickname: target.author.nickname,
    });
    setReplyInput("");
  };

  const handleReplySubmit = async () => {
    if (!replyInput.trim() || !currentUser || replyState.parentId == null) return;

    const newReply = await addBoardComment(contentId, {
      content: replyInput,
      parent_id: replyState.parentId,
      tagged_nickname: replyState.tagged_nickname,
    });
    setComments((prev) => [...prev, newReply]);
    setReplyState({ targetId: null, parentId: null, tagged_nickname: undefined });
    setReplyInput("");
  };

  const handleDelete = async (commentId: number) => {
    await deleteComment(contentId, commentId);
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, is_deleted: true, content: "" } : c
      )
    );
  };

  const getSortedTopLevelComments = () => {
    const topLevel = comments.filter((c) => !c.parent_id);
    switch (sort) {
      case "createdAsc":
        return [...topLevel].sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "likeDesc":
        return [...topLevel].sort((a, b) => b.like_count - a.like_count);
      default:
        return [...topLevel].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }
  };

  const getReplies = (parentId: number) =>
    comments.filter((c) => c.parent_id === parentId);

  const renderComment = (comment: BoardComment) => {
    const replies = getReplies(comment.id);

    return (
      <div key={comment.id}>
        <CommentItem>
          <Profile src={comment.author.profile_image} />
          <CommentContent>
            <Nickname>{comment.author.nickname}</Nickname>
            <Text>
              {comment.is_deleted ? "삭제된 댓글입니다." : comment.content}
            </Text>
            <Meta>
              <span>{dayjs(comment.created_at).fromNow()}</span>
              {!comment.is_deleted && (
                <>
                  <ReplyBtn onClick={() => handleReplyToggle(comment)}>답글</ReplyBtn>
                  <LikeButton liked={comment.liked} onClick={() => handleLike(comment.id)}>
                    <ThumbsUp size={14} />
                    {comment.like_count}
                  </LikeButton>
                  {currentUser?.id === comment.author.id && (
                    <ReplyBtn onClick={() => handleDelete(comment.id)}>삭제</ReplyBtn>
                  )}
                </>
              )}
            </Meta>
          </CommentContent>
        </CommentItem>

        {replyState.targetId === comment.id && (
          <ReplyInputWrapper style={{ marginLeft: 32 }}>
            <ReplyInput
              ref={replyInputRef}
              placeholder={`@${replyState.tagged_nickname} 님에게 답글을 입력하세요`}
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleReplySubmit()}
            />
            <ReplySubmitBtn onClick={handleReplySubmit}>등록</ReplySubmitBtn>
          </ReplyInputWrapper>
        )}

        {replies.map((reply) => (
          <div key={reply.id}>
            <CommentItem style={{ marginLeft: 32 }}>
              <CornerDownRight size={16} style={{ marginRight: 8, color: "#B4B4B4" }} />
              <Profile src={reply.author.profile_image} />
              <CommentContent>
                <Nickname>{reply.author.nickname}</Nickname>
                <Text>
                  {reply.tagged_nickname && <TagMention>@{reply.tagged_nickname} </TagMention>}
                  {reply.is_deleted ? "삭제된 댓글입니다." : reply.content}
                </Text>
                <Meta>
                  <span>{dayjs(reply.created_at).fromNow()}</span>
                  {!reply.is_deleted && (
                    <>
                      <ReplyBtn onClick={() => handleReplyToggle(reply)}>답글</ReplyBtn>
                      <LikeButton liked={reply.liked} onClick={() => handleLike(reply.id)}>
                        <ThumbsUp size={14} />
                        {reply.like_count}
                      </LikeButton>
                      {currentUser?.id === reply.author.id && (
                        <ReplyBtn onClick={() => handleDelete(reply.id)}>삭제</ReplyBtn>
                      )}
                    </>
                  )}
                </Meta>
              </CommentContent>
            </CommentItem>

            {replyState.targetId === reply.id && (
              <ReplyInputWrapper style={{ marginLeft: 64 }}>
                <ReplyInput
                  ref={replyInputRef}
                  placeholder={`@${replyState.tagged_nickname} 님에게 답글을 입력하세요`}
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleReplySubmit()}
                />
                <ReplySubmitBtn onClick={handleReplySubmit}>등록</ReplySubmitBtn>
              </ReplyInputWrapper>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Wrapper>
      <TabList>
        <Tab selected={sort === "createdDesc"} onClick={() => setSort("createdDesc")}>최신순</Tab>
        <Tab selected={sort === "createdAsc"} onClick={() => setSort("createdAsc")}>오래된 순</Tab>
        <Tab selected={sort === "likeDesc"} onClick={() => setSort("likeDesc")}>따봉순</Tab>
      </TabList>

      <CommentList ref={commentListRef}>
        {getSortedTopLevelComments().map((comment) => renderComment(comment))}
      </CommentList>

      {currentUser && (
        <InputWrapper>
          <CommentInput
            placeholder="댓글을 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <SubmitBtn onClick={handleSubmit}>등록</SubmitBtn>
        </InputWrapper>
      )}
    </Wrapper>
  );
}
