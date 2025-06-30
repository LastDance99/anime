import React, { useEffect, useState } from "react";
import { getBoardComments } from "../../../../api/board";
import type { BoardComment } from "../../../../types/comment";

interface Props {
  postId: number;
  onClose: () => void;
}

export default function CommentModal({ postId, onClose }: Props) {
  const [comments, setComments] = useState<BoardComment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await getBoardComments(postId, "created");
      setComments(res.results);
    };
    fetchComments();
  }, [postId]);

  return (
    <div className="modal">
      <button onClick={onClose}>닫기</button>
      <h3>댓글 목록</h3>
      <ul>
        {comments.map((c) => (
          <li key={c.id} style={{ marginBottom: "16px" }}>
            <div>
              <b>{c.author_nickname}</b>: {c.is_deleted ? "(삭제됨)" : c.content}
            </div>
            <div style={{ fontSize: "12px", color: "#888" }}>
              좋아요 {c.like_count}개 | {c.created_at}
            </div>
            {c.replies.length > 0 && (
              <ul style={{ marginLeft: "20px", marginTop: "4px" }}>
                {c.replies.map((r: BoardComment) => (
                  <li key={r.id}>
                    <b>{r.author_nickname}</b>: {r.is_deleted ? "(삭제됨)" : r.content}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}