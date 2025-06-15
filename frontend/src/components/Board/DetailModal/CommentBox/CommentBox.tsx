import { useState, useRef, useEffect } from "react";
import { dummyComments } from "../../../../data/comment";
import type { Comment } from "../../../../types/comment";
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
  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [input, setInput] = useState("");
  const [replyState, setReplyState] = useState<{
    targetId: number | null;        // 입력폼이 나타날 대상(댓글 or 답글)의 id
    parentId: number | null;        // 실제 답글이 등록될 parentId (항상 1뎁스 댓글 id)
    taggedNickname?: string;
  }>({ targetId: null, parentId: null });
  const [replyInput, setReplyInput] = useState("");
  const [sort, setSort] = useState<SortType>("createdDesc");

  const commentListRef = useRef<HTMLDivElement>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commentListRef.current) {
      commentListRef.current.scrollTop = commentListRef.current.scrollHeight;
    }
  }, [comments, replyState.targetId]);

  useEffect(() => {
    if (replyState.targetId !== null) {
      replyInputRef.current?.focus();
    }
  }, [replyState.targetId]);

  const handleLike = (id: number) => {
    setComments(prev =>
      prev.map(c =>
        c.id === id ? { ...c, liked: !c.liked, likeCount: (c.likeCount ?? 0) + (c.liked ? -1 : 1) } : c
      )
    );
  };

  const handleSubmit = () => {
    if (!input.trim() || !currentUser) return;

    const newComment: Comment = {
      id: comments.length + 1,
      postId: contentId,
      authorId: currentUser.id,
      nickname: currentUser.nickname,
      profileImage: currentUser.profile_image,
      content: input,
      createdAt: new Date().toISOString(),
      isDeleted: false,
    };

    setComments(prev => [...prev, newComment]);
    setInput("");
  };

  // 답글 버튼 클릭: targetId는 폼이 떠야 할 댓글/답글의 id, parentId는 실제 1뎁스 댓글 id!
  const handleReplyToggle = (target: Comment) => {
    // 1뎁스 댓글이면 본인 id, 2뎁스 답글이면 그 답글의 parentId
    const parentCommentId = target.parentId ? target.parentId : target.id;
    if (replyState.targetId === target.id) {
      setReplyState({ targetId: null, parentId: null });
      setReplyInput("");
    } else {
      setReplyState({
        targetId: target.id,
        parentId: parentCommentId,
        taggedNickname: target.nickname,
      });
      setReplyInput("");
    }
  };

  const handleReplySubmit = () => {
    if (!replyInput.trim() || !currentUser || replyState.parentId == null) return;

    const newReply: Comment = {
      id: comments.length + 1,
      postId: contentId,
      authorId: currentUser.id,
      nickname: currentUser.nickname,
      profileImage: currentUser.profile_image,
      content: replyInput,
      createdAt: new Date().toISOString(),
      parentId: replyState.parentId, // ← 항상 1뎁스 댓글 id
      taggedNickname: replyState.taggedNickname,
      isDeleted: false,
    };

    setComments(prev => [...prev, newReply]);
    setReplyState({ targetId: null, parentId: null });
    setReplyInput("");
  };

  const getSortedTopLevelComments = () => {
    const topLevel = comments.filter(c => !c.parentId);
    switch (sort) {
      case "createdAsc":
        return [...topLevel].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "createdDesc":
        return [...topLevel].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "likeDesc":
        return [...topLevel].sort(
          (a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0)
        );
      default:
        return topLevel;
    }
  };

  const getReplies = (parentId: number) =>
    comments
      .filter(c => c.parentId === parentId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  // 1뎁스 댓글 + 그 아래 답글, 답글 입력폼을 렌더링
  const renderComment = (comment: Comment) => {
    const replies = getReplies(comment.id);

    return (
      <div key={comment.id}>
        {/* 1뎁스 댓글 */}
        <CommentItem>
          <Profile src={comment.profileImage} />
          <CommentContent>
            <Nickname>{comment.nickname}</Nickname>
            <Text>{comment.isDeleted ? "삭제된 댓글입니다." : comment.content}</Text>
            <Meta>
              <span>{dayjs(comment.createdAt).fromNow()}</span>
              <ReplyBtn onClick={() => handleReplyToggle(comment)}>
                답글
              </ReplyBtn>
              <LikeButton liked={comment.liked} onClick={() => handleLike(comment.id)}>
                <ThumbsUp size={14} />
                {comment.likeCount ?? 0}
              </LikeButton>
            </Meta>
          </CommentContent>
        </CommentItem>
        {/* 1뎁스 댓글에 폼이 떠야 할 때 */}
        {replyState.targetId === comment.id && (
          <ReplyInputWrapper style={{ marginLeft: 32 }}>
            <ReplyInput
              ref={replyInputRef}
              placeholder={
                replyState.taggedNickname
                  ? `@${replyState.taggedNickname} 님에게 답글을 입력하세요`
                  : "답글을 입력하세요"
              }
              value={replyInput}
              onChange={e => setReplyInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleReplySubmit();
                }
              }}
            />
            <ReplySubmitBtn onClick={handleReplySubmit}>등록</ReplySubmitBtn>
          </ReplyInputWrapper>
        )}

        {/* 답글(2뎁스)들 */}
        {replies.map(reply => (
          <div key={reply.id}>
            <CommentItem style={{ marginLeft: 32 }}>
              <CornerDownRight size={16} style={{ marginRight: 8, color: "#B4B4B4" }} />
              <Profile src={reply.profileImage} />
              <CommentContent>
                <Nickname>{reply.nickname}</Nickname>
                <Text>
                  {reply.taggedNickname && <TagMention>@{reply.taggedNickname} </TagMention>}
                  {reply.isDeleted ? "삭제된 댓글입니다." : reply.content}
                </Text>
                <Meta>
                  {dayjs(reply.createdAt).fromNow()} ·{" "}
                  <ReplyBtn onClick={() => handleReplyToggle(reply)}>
                    답글
                  </ReplyBtn>
                  <LikeButton liked={reply.liked} onClick={() => handleLike(reply.id)}>
                    <ThumbsUp size={14} />
                    {reply.likeCount ?? 0}
                  </LikeButton>
                </Meta>
              </CommentContent>
            </CommentItem>
            {/* 답글(2뎁스) 바로 밑에 입력폼 */}
            {replyState.targetId === reply.id && (
              <ReplyInputWrapper style={{ marginLeft: 64 }}>
                <ReplyInput
                  ref={replyInputRef}
                  placeholder={
                    replyState.taggedNickname
                      ? `@${replyState.taggedNickname} 님에게 답글을 입력하세요`
                      : "답글을 입력하세요"
                  }
                  value={replyInput}
                  onChange={e => setReplyInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleReplySubmit();
                    }
                  }}
                />
                <ReplySubmitBtn onClick={handleReplySubmit}>등록</ReplySubmitBtn>
              </ReplyInputWrapper>
            )}
          </div>
        ))}
      </div>
    );
  };

  const sortedTopLevelComments = getSortedTopLevelComments();

  return (
    <Wrapper>
      <TabList>
        <Tab selected={sort === "createdDesc"} onClick={() => setSort("createdDesc")}>최신순</Tab>
        <Tab selected={sort === "createdAsc"} onClick={() => setSort("createdAsc")}>오래된 순</Tab>
        <Tab selected={sort === "likeDesc"} onClick={() => setSort("likeDesc")}>따봉순</Tab>
      </TabList>

      <CommentList ref={commentListRef}>
        {sortedTopLevelComments.map(comment => renderComment(comment))}
      </CommentList>

      <InputWrapper>
        <CommentInput
          placeholder="댓글을 입력하세요"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <SubmitBtn onClick={handleSubmit}>등록</SubmitBtn>
      </InputWrapper>
    </Wrapper>
  );
}