// EditBoardPage.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoardPostDetail } from "../api/board";
import WriteForm from "./WriteModal/WriteModal";

export default function EditBoardPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      getBoardPostDetail(Number(id)).then(setPost);
    }
  }, [id]);

  return post ? <WriteForm mode="edit" post={post} /> : <div>불러오는 중...</div>;
}