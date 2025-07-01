import React, { useEffect, useState } from "react";
import { getBoardComments } from "../../../../api/board";
import type { BoardComment } from "../../../../types/comment";
import { ModalWrap, CloseBtn, Title } from "./CommentModal.styled";
import CommentListBox from "./CommentListBox";

interface Props {
  postId: number;
  onClose: () => void;
}

export default function CommentModal({ postId, onClose }: Props) {
  const [comments, setComments] = useState<BoardComment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchComments = async () => {
      try {
        const res = await getBoardComments(postId, "created");
        setComments(res.results);
      } catch (err) {
        // eslint-disable-next-line no-console
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
      <Title>댓글 목록</Title>
      {loading ? (
        <div style={{ padding: "18px" }}>댓글 불러오는 중...</div>
      ) : comments.length === 0 ? (
        <div style={{ padding: "28px", color: "#bbb", textAlign: "center" }}>
          아직 작성된 댓글이 없습니다.
        </div>
      ) : (
        <CommentListBox comments={comments} />
      )}
    </ModalWrap>
  );
}