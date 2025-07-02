import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getBoardComments } from "../../../../api/board";
import type { BoardComment } from "../../../../types/comment";
import { ModalWrap, CloseBtn, Title } from "./CommentModal.styled";
import CommentListBox from "./CommentListBox";

interface Props {
  postId: number;
  onClose: () => void;
}

export default function CommentModal({ postId, onClose }: Props) {
  const { t } = useTranslation();
  const [comments, setComments] = useState<BoardComment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchComments = async () => {
      try {
        const res = await getBoardComments(postId, "created");
        setComments(res.results);
      } catch (err) {
        console.error("❌ 댓글 로딩 실패:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  return (
    <ModalWrap>
      <CloseBtn onClick={onClose}>×</CloseBtn>
      <Title>{t("comment.modal_title")}</Title>
      {loading ? (
        <div style={{ padding: "18px" }}>{t("comment.loading")}</div>
      ) : comments.length === 0 ? (
        <div style={{ padding: "28px", color: "#bbb", textAlign: "center" }}>
          {t("comment.no_comments")}
        </div>
      ) : (
        <CommentListBox comments={comments} />
      )}
    </ModalWrap>
  );
}