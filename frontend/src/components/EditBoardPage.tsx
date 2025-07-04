// EditBoardPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getBoardPostDetail } from "../api/board";
import WriteForm from "./WriteModal/WriteModal";
import type { BoardItem } from "../types/board";

export default function EditBoardPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BoardItem | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      getBoardPostDetail(Number(id)).then(setPost);
    }
  }, [id]);

  return post ? <WriteForm mode="edit" post={post} /> : <div>{t("common.loading")}</div>;
}