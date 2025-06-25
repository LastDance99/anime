import { useSearchParams, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import WriteModal from "../../components/WriteModal/WriteModal";
import { Wrapper, Title } from "./WritePage.styeld";
import { getBoardPostDetail } from "../../api/board";
import type { BoardItem } from "../../types/board";

export default function WritePage({ mode = "create" }: { mode?: "create" | "edit" }) {
  const [searchParams] = useSearchParams();
  const { id } = useParams(); // 수정 모드에서 postId를 URL에서 가져옴
  const initialType = searchParams.get("type") === "gallery" ? "gallery" : "post";

  const [boardType, setBoardType] = useState<"post" | "gallery">(initialType);
  const [post, setPost] = useState<BoardItem | null>(null);

  useEffect(() => {
    if (mode === "edit" && id) {
      getBoardPostDetail(Number(id))
        .then((data) => {
          setPost(data);
          setBoardType(data.board_type === "gallery" ? "gallery" : "post");
        })
        .catch((err) => {
          console.error("게시글 불러오기 실패", err);
          alert("게시글을 불러오는 데 실패했습니다.");
        });
    }
  }, [mode, id]);

  return (
    <Wrapper>
      <Title>
        {mode === "edit"
          ? boardType === "gallery"
            ? "갤러리 수정"
            : "게시글 수정"
          : boardType === "gallery"
          ? "갤러리 작성"
          : "게시글 작성"}
      </Title>
      <WriteModal
        boardType={boardType}
        onBoardTypeChange={setBoardType}
        post={post ?? undefined}
        mode={mode}
      />
    </Wrapper>
  );
}