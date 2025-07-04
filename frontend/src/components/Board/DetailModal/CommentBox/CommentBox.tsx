import { useEffect, useRef, useState, useCallback } from "react";
import {
  getBoardComments,
  addBoardComment,
  toggleCommentLike,
  deleteComment,
} from "../../../../api/board";
import { generateImage, getPresignedUrl } from "../../../../api/core";
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
  PreviewBox
} from "./CommentBox.styled";
import { useAuth } from "../../../../contexts/AuthContext";
import { ThumbsUp, CornerDownRight, ImagePlus, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const DEFAULT_PROFILE_IMG = import.meta.env.VITE_DEFAULT_PROFILE_IMG;

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

type PreviewImage = {
  url: string;
  alt: string;
  type: "ai" | "user";
};

export default function CommentBox({ contentType, contentId }: Props) {
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  const [comments, setComments] = useState<BoardComment[]>([]);
  const [input, setInput] = useState("");
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
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
  const [imageLoading, setImageLoading] = useState(false);
  const [userImageLoading, setUserImageLoading] = useState(false);

  const commentListRef = useRef<HTMLDivElement>(null);
  const replyInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 스크롤 하단 이동
  const scrollToBottom = () => {
    if (commentListRef.current) {
      commentListRef.current.scrollTo({
        top: commentListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // 댓글 가져오기
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

  const updateCommentLike = (list: BoardComment[], id: number): BoardComment[] => {
    return list.map(comment => {
      if (comment.id === id) {
        return { ...comment, like_count: comment.like_count + 1, liked: true };
      }
      if (comment.replies && comment.replies.length > 0) {
        return { ...comment, replies: updateCommentLike(comment.replies, id) };
      }
      return comment;
    });
  };

  // 댓글 좋아요
  const handleLike = async (id: number, isMyComment: boolean, alreadyLiked: boolean) => {
    if (isMyComment || alreadyLiked) return;
    try {
      await toggleCommentLike(id);
      setComments(prev => updateCommentLike(prev, id));
    } catch (err) {}
  };

  // 댓글 등록
  const handleSubmit = async () => {
    if (!currentUser || (!input.trim() && previewImages.length === 0)) return;
    try {
      let content = input;
      previewImages.forEach(img => {
        content += `<br><img src="${img.url}" alt="${img.alt}" class="${img.type}-generated-image" />`;
      });
      const newComment = await addBoardComment(contentId, { content });
      setComments(prev => sort === "createdDesc" ? [newComment, ...prev] : [...prev, newComment]);
      setInput("");
      setPreviewImages([]);
      if (sort !== "createdDesc") setTimeout(scrollToBottom, 100);
    } catch (e) {}
  };

  // AI 짤 생성
  const handleAIGenerate = async () => {
    const prompt = window.prompt(t("chat.image_tool_placeholder"));
    if (!prompt?.trim()) return;
    setImageLoading(true);
    try {
      const { image_url } = await generateImage(prompt, "comment");
      setPreviewImages(prev => [...prev, { url: image_url, alt: prompt, type: "ai" }]);
    } catch (err) {
      alert(t("chat.image_fail")); // <== AI만
    } finally {
      setImageLoading(false);
    }
  };

  // 유저 이미지 업로드 (presigned 방식)
  const handleUserImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUserImageLoading(true);
    try {
      // 1. presigned URL 요청
      const ext = file.name.split(".").pop();
      const fileName = `comment/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
      const { upload_url, file_url } = await getPresignedUrl({
        file_name: fileName,
        file_type: file.type,
      });

      // 2. S3 업로드
      const uploadRes = await fetch(upload_url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
          "x-amz-acl": "public-read"
        },
        body: file,
      });
      if (!uploadRes.ok) throw new Error("upload failed");

      console.log("S3 업로드 결과:", {
        fileName, fileType: file.type,
        upload_url, file_url, file
      });
      // 3. 프리뷰에 추가
      setPreviewImages(prev => [
        ...prev,
        { url: file_url, alt: file.name, type: "user" },
      ]);
    } catch (err) {
      alert(t("comment.image_upload_fail")); // <== 유저 업로드 실패시
    } finally {
      setUserImageLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // 미리보기 제거
  const handleRemovePreview = (idx: number) => {
    setPreviewImages(prev => prev.filter((_, i) => i !== idx));
  };

  // 답글 토글/등록/삭제 등 기존 로직 동일...
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
          <Profile
            src={comment.author_profile_image || DEFAULT_PROFILE_IMG}
            alt={comment.author_nickname}
          />
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
        <InputWrapper style={{ position: "relative" }}>
          {/* 미리보기 여러개 (AI/유저) */}
          {previewImages.length > 0 && (
            <PreviewBox>
              {previewImages.map((img, i) => (
                <div key={i} style={{ display: "inline-block", position: "relative", marginRight: 12 }}>
                  <img src={img.url} alt={img.alt} style={{ width: 120, maxHeight: 100, borderRadius: 8, border: "1px solid #eee" }} />
                  <button onClick={() => handleRemovePreview(i)} style={{
                    position: "absolute", top: 2, right: 2, background: "#fff", border: "none", borderRadius: "50%", fontSize: 16, cursor: "pointer"
                  }}>✕</button>
                  <div style={{ fontSize: 11, color: "#777", marginTop: 2, textAlign: "center" }}>
                    {img.type === "ai" ? t("chat.image_tool") : t("comment.upload_image")}
                  </div>
                </div>
              ))}
            </PreviewBox>
          )}
          <CommentInput
            placeholder={t("comment.input_placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
          <SubmitBtn onClick={handleSubmit}>{t("comment.submit")}</SubmitBtn>
          <SubmitBtn
            onClick={handleAIGenerate}
            style={{
              backgroundColor: imageLoading ? "#f0f0f0" : "#e6edff",
              color: "#4b6cc1",
            }}
            disabled={imageLoading}
          >
            {imageLoading ? t("chat.image_loading") : (
              <>
                <ImagePlus size={16} /> {t("chat.generate_image")}
              </>
            )}
          </SubmitBtn>
          <SubmitBtn
            type="button"
            style={{ backgroundColor: userImageLoading ? "#f7f7f7" : "#faffee", color: "#7b8437" }}
            disabled={userImageLoading}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={16} /> {userImageLoading ? t("comment.image_uploading") : t("comment.upload_image")}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleUserImageUpload}
              disabled={userImageLoading}
            />
          </SubmitBtn>
        </InputWrapper>
      )}
    </Wrapper>
  );
}