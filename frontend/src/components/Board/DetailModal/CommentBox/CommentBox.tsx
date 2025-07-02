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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [comments, setComments] = useState<BoardComment[]>([]);
  const [input, setInput] = useState("");
  const [replyState, setReplyState] = useState({
    targetId: null,
    parentId: null,
    tagged_nickname: undefined,
  } as {
    targetId: number | null;
    parentId: number | null;
    tagged_nickname?: string | null;
  });
  const [replyInput, setReplyInput] = useState("");
  const [sort, setSort] = useState<SortType>("createdAsc");
  const [loading, setLoading] = useState(false);

  const commentListRef = useRef<HTMLDivElement>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    if (commentListRef.current) {
      commentListRef.current.scrollTo({
        top: commentListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const fetchComments = useCallback(async (scrollToEnd = false) => {
    setLoading(true);
    try {
      const res = await getBoardComments(contentId, sortToApi[sort]);
      setComments(Array.isArray(res.results) ? res.results : []);
      if (scrollToEnd) setTimeout(scrollToBottom, 100);
    } catch (e) {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [contentId, sort]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  function updateCommentLike(list: BoardComment[], id: number): BoardComment[] {
    return list.map(comment => {
      if (comment.id === id) {
        return { ...comment, like_count: comment.like_count + 1, liked: true };
      }
      if (comment.replies && comment.replies.length > 0) {
        return { ...comment, replies: updateCommentLike(comment.replies, id) };
      }
      return comment;
    });
  }

  const handleLike = async (id: number, isMyComment: boolean, alreadyLiked: boolean) => {
    if (isMyComment || alreadyLiked) return;
    try {
      await toggleCommentLike(id);
      setComments(prev => updateCommentLike(prev, id));
    } catch (err) {}
  };

  const handleSubmit = async () => {
    if (!input.trim() || !currentUser) return;
    try {
      const newComment = await addBoardComment(contentId, { content: input });
      setComments(prev => sort === "createdDesc" ? [newComment, ...prev] : [...prev, newComment]);
      setInput("");
      if (sort !== "createdDesc") setTimeout(scrollToBottom, 100);
    } catch (e) {}
  };

  const handleReplyToggle = (target: BoardComment) => {
    const parentId = target.parent_id ?? target.id;
    setReplyState(prev => prev.targetId === target.id
      ? { targetId: null, parentId: null, tagged_nickname: undefined }
      : { targetId: target.id, parentId, tagged_nickname: target.author_nickname });
    setReplyInput("");
  };

  const handleReplySubmit = async () => {
    if (!replyInput.trim() || !currentUser || replyState.parentId == null) return;
    try {
      const newReply = await addBoardComment(contentId, {
        content: replyInput,
        parent_id: replyState.parentId,
        tagged_nickname: replyState.tagged_nickname ?? undefined,
      });
      setComments(prev => prev.map(comment =>
        comment.id === replyState.parentId
          ? { ...comment, replies: sort === "createdDesc"
              ? [newReply, ...(comment.replies || [])]
              : [...(comment.replies || []), newReply] }
          : comment
      ));
      setReplyState({ targetId: null, parentId: null, tagged_nickname: undefined });
      setReplyInput("");
      if (sort !== "createdDesc") setTimeout(scrollToBottom, 100);
    } catch (e) {}
  };

  const handleDelete = async (commentId: number) => {
    const ok = window.confirm(t("comment.confirm_delete"));
    if (!ok) return;
    await deleteComment(contentId, commentId);
    fetchComments();
  };

  const getTopLevelComments = () => comments.filter(c => !c.parent_id);

  const handleNicknameClick = (userId: number) => {
    const ok = window.confirm(t("comment.go_to_profile"));
    if (ok) navigate(`/profile/${userId}`);
  };

  const renderComment = (comment: BoardComment, depth = 0) => {
    const replies = comment.replies || [];
    const indent = 32 + 32 * depth;
    const isMyComment = !!currentUser && currentUser.id === comment.author_id;

    return (
      <div key={comment.id}>
        <CommentItem style={depth > 0 ? { marginLeft: indent } : undefined} depth={depth}>
          {depth > 0 && <CornerDownRight size={16} style={{ marginRight: 8, color: "#B4B4B4" }} />}
          <Profile src={comment.author_profile_image || "/default_profile.png"} alt={comment.author_nickname} />
          <CommentContent>
            <Nickname
              onClick={() => !comment.is_deleted && handleNicknameClick(comment.author_id)}
              style={{ cursor: comment.is_deleted ? "default" : "pointer" }}
            >
              {comment.author_nickname || t("comment.unknown")}
              {isMyComment && <span style={{ fontSize: 10, color: "#aaa", marginLeft: 6 }}>{t("comment.my_comment")}</span>}
            </Nickname>

            <Text
              dangerouslySetInnerHTML={{
                __html: comment.is_deleted
                  ? t("comment.deleted")
                  : (comment.tagged_nickname
                      ? `<span style=\"color:#6096fd; font-weight:500;\">@${comment.tagged_nickname} </span>`
                      : "") + comment.content,
              }}
            />

            <Meta>
              <span>{dayjs(comment.created_at).fromNow()}</span>
              {!comment.is_deleted && (
                <>
                  <ReplyBtn onClick={() => handleReplyToggle(comment)}>{t("comment.reply")}</ReplyBtn>
                  <LikeButton
                    liked={!!comment.liked}
                    disabled={isMyComment}
                    aria-disabled={isMyComment || !!comment.liked}
                    onClick={() => handleLike(comment.id, isMyComment, !!comment.liked)}
                  >
                    <ThumbsUp size={14} />
                    {comment.like_count}
                  </LikeButton>
                  {isMyComment && (
                    <ReplyBtn onClick={() => handleDelete(comment.id)} style={{ color: "#e57373" }}>{t("comment.delete")}</ReplyBtn>
                  )}
                </>
              )}
            </Meta>
          </CommentContent>
        </CommentItem>

        {replyState.targetId === comment.id && !comment.is_deleted && (
          <ReplyInputWrapper style={{ marginLeft: indent + 32 }}>
            <ReplyInput
              ref={replyInputRef}
              placeholder={t("comment.reply_placeholder", { nickname: replyState.tagged_nickname })}
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleReplySubmit()}
            />
            <ReplySubmitBtn onClick={handleReplySubmit}>{t("comment.submit")}</ReplySubmitBtn>
          </ReplyInputWrapper>
        )}

        {replies.map((reply) => renderComment(reply, depth + 1))}
      </div>
    );
  };

  return (
    <Wrapper>
      <TabList>
        <Tab selected={sort === "createdAsc"} onClick={() => setSort("createdAsc")}>{t("comment.sort.createdAsc")}</Tab>
        <Tab selected={sort === "createdDesc"} onClick={() => setSort("createdDesc")}>{t("comment.sort.createdDesc")}</Tab>
        <Tab selected={sort === "likeDesc"} onClick={() => setSort("likeDesc")}>{t("comment.sort.likeDesc")}</Tab>
      </TabList>

      <CommentList ref={commentListRef}>
        {loading ? (
          <div style={{ padding: "2em", textAlign: "center" }}>{t("comment.loading")}</div>
        ) : getTopLevelComments().length === 0 ? (
          <div style={{ padding: "2em", textAlign: "center", color: "#bbb" }}>{t("comment.empty")}</div>
        ) : (
          getTopLevelComments().map((c) => renderComment(c, 0))
        )}
      </CommentList>

      {currentUser && (
        <InputWrapper>
          <CommentInput
            placeholder={t("comment.input_placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <SubmitBtn onClick={handleSubmit}>{t("comment.submit")}</SubmitBtn>
        </InputWrapper>
      )}
    </Wrapper>
  );
}
