import { useSearchParams, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // ✅ 추가
import WriteModal from "../../components/WriteModal/WriteModal";
import { Wrapper, Title } from "./WritePage.styeld";
import { getBoardPostDetail } from "../../api/board";
import type { BoardItem } from "../../types/board";

export default function WritePage({ mode = "create" }: { mode?: "create" | "edit" }) {
  const { t } = useTranslation(); // ✅ 추가
  const [searchParams] = useSearchParams();
  const { id } = useParams();
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
          alert(t("board.loadError")); // ✅ 번역 적용
        });
    }
  }, [mode, id, t]);

  return (
    <Wrapper>
      <Title>
        {mode === "edit"
          ? boardType === "gallery"
            ? t("board.edit.gallery")
            : t("board.edit.post")
          : boardType === "gallery"
          ? t("board.create.gallery")
          : t("board.create.post")}
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