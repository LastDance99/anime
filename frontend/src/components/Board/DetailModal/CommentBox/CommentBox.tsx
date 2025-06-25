import { useEffect, useRef, useState, useCallback } from "react";
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
const sortToApi: Record<SortType, "latest" | "created" | "like"> = {
  createdDesc: "latest",
  createdAsc: "created",
  likeDesc: "like",
};

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
  const [sort, setSort] = useState<SortType>("createdAsc");
  const [loading, setLoading] = useState(false);

  const commentListRef = useRef<HTMLDivElement>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);

  // 댓글 목록 불러오기 (정렬 연동)
  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getBoardComments(contentId, sortToApi[sort]);
      console.log("[fetchComments] API data:", res);
      setComments(Array.isArray(res.results) ? res.results : []);
    } catch (e) {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [contentId, sort]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // 좋아요 (취소 불가)
  const handleLike = async (id: number) => {
    const res = await toggleCommentLike(id);
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              liked: res.liked ?? true,
              like_count:
                res.liked === false
                  ? c.like_count
                  : typeof c.like_count === "number"
                  ? c.like_count + 1
                  : 1,
            }
          : c
      )
    );
  };

  // 댓글 작성 (작성 후 전체 fetch)
  const handleSubmit = async () => {
    if (!input.trim() || !currentUser) return;
    await addBoardComment(contentId, { content: input });
    setInput("");
    fetchComments();
  };

  // 답글 토글/작성
  const handleReplyToggle = (target: BoardComment) => {
    const parentId = target.parent_id ?? target.id;
    setReplyState({
      targetId: replyState.targetId === target.id ? null : target.id,
      parentId: replyState.targetId === target.id ? null : parentId,
      tagged_nickname: target.author_nickname,
    });
    setReplyInput("");
  };

  const handleReplySubmit = async () => {
    if (!replyInput.trim() || !currentUser || replyState.parentId == null) return;
    await addBoardComment(contentId, {
      content: replyInput,
      parent_id: replyState.parentId,
      tagged_nickname: replyState.tagged_nickname,
    });
    setReplyState({ targetId: null, parentId: null, tagged_nickname: undefined });
    setReplyInput("");
    fetchComments();
  };

  // 댓글 삭제 (soft delete)
  const handleDelete = async (commentId: number) => {
    // 경고창 띄우기
    const ok = window.confirm("정말로 삭제하시겠습니까?");
    if (!ok) return; // 아니오 클릭 시 취소
    await deleteComment(contentId, commentId);
    fetchComments();
  };
  // 최상위 댓글만 반환
  const getSortedTopLevelComments = () => {
    if (!Array.isArray(comments)) return [];
    return comments.filter((c) => !c.parent_id);
  };

  // === ⭐️ 재귀적으로 replies 렌더링하는 함수로 수정! ===
  const renderComment = (comment: BoardComment, depth = 0) => {
    // replies가 없으면 빈 배열로
    const replies = comment.replies || [];
    const indent = 32 + 32 * depth;

    return (
      <div key={comment.id}>
        <CommentItem style={depth > 0 ? { marginLeft: indent } : undefined}>
          {depth > 0 && (
            <CornerDownRight size={16} style={{ marginRight: 8, color: "#B4B4B4" }} />
          )}
          <Profile src={comment.author_profile_image || "/default_profile.png"} />
          <CommentContent>
            <Nickname>{comment.author_nickname || "알 수 없음"}</Nickname>
            <Text>
              {comment.tagged_nickname && (
                <TagMention>@{comment.tagged_nickname} </TagMention>
              )}
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
                  {currentUser?.nickname === comment.author_nickname && (
                    <ReplyBtn onClick={() => handleDelete(comment.id)}>삭제</ReplyBtn>
                  )}
                </>
              )}
            </Meta>
          </CommentContent>
        </CommentItem>

        {/* 답글 입력창 */}
        {replyState.targetId === comment.id && (
          <ReplyInputWrapper style={{ marginLeft: indent + 32 }}>
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

        {/* 대댓글 재귀적으로 렌더 */}
        {replies.map((reply) => renderComment(reply, depth + 1))}
      </div>
    );
  };

  return (
    <Wrapper>
      <TabList>
        <Tab selected={sort === "createdAsc"} onClick={() => setSort("createdAsc")}>등록순</Tab>
        <Tab selected={sort === "createdDesc"} onClick={() => setSort("createdDesc")}>최신순</Tab>
        <Tab selected={sort === "likeDesc"} onClick={() => setSort("likeDesc")}>따봉순</Tab>
      </TabList>

      <CommentList ref={commentListRef}>
        {loading
          ? <div style={{ padding: "2em", textAlign: "center" }}>로딩중...</div>
          : getSortedTopLevelComments().map((c) => renderComment(c, 0))}
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