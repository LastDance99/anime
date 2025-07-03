import { useSearchParams, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import WriteModal from "../../components/WriteModal/WriteModal";
import { Wrapper, Title } from "./WritePage.styeld";
import { getBoardPostDetail } from "../../api/board";
import { getMyProfile } from "../../api/profile";
import type { BoardItem } from "../../types/board";

// BoardType은 실제로는 "post" | "gallery"이지만, UI에서는 "notice"를 추가로 표시
type BoardType = "post" | "gallery" | "notice";

export default function WritePage({ mode = "create" }: { mode?: "create" | "edit" }) {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const type = searchParams.get("type");

  const initialType: BoardType =
    type === "gallery" ? "gallery" : type === "notice" ? "notice" : "post";

  const [boardType, setBoardType] = useState<BoardType>(initialType);
  const [post, setPost] = useState<BoardItem | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // 관리자 여부 확인
  useEffect(() => {
    getMyProfile()
      .then((user) => setIsAdmin(user.is_staff === true))
      .catch((err) => {
        console.error("관리자 여부 확인 실패", err);
        setIsAdmin(false);
      });
  }, []);

  // 게시글 상세 불러오기 (수정 모드)
  useEffect(() => {
    if (mode === "edit" && id) {
      getBoardPostDetail(Number(id))
        .then((data) => {
          setPost(data);
          // boardType은 실제로는 "post" | "gallery"지만, 공지면 "notice"
          if (data.is_notice) setBoardType("notice");
          else if (data.board_type === "gallery") setBoardType("gallery");
          else setBoardType("post");
        })
        .catch((err) => {
          console.error("게시글 불러오기 실패", err);
          alert(t("board.loadError"));
        });
    }
  }, [mode, id, t]);

  return (
    <Wrapper>
      <Title>
        {mode === "edit"
          ? boardType === "gallery"
            ? t("board.edit.gallery")
            : boardType === "notice"
            ? t("board.edit.notice")
            : t("board.edit.post")
          : boardType === "gallery"
          ? t("board.create.gallery")
          : boardType === "notice"
          ? t("board.create.notice")
          : t("board.create.post")}
      </Title>
      <WriteModal
        boardType={boardType}
        onBoardTypeChange={setBoardType}
        post={post ?? undefined}
        mode={mode}
        isAdmin={isAdmin}
      />
    </Wrapper>
  );
}