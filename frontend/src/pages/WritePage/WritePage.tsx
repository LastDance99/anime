import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import WriteModal from "../../components/WriteModal/WriteModal";
import { Wrapper, Title } from "./WritePage.styeld";

export default function WritePage() {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") === "gallery" ? "gallery" : "post";
  const [boardType, setBoardType] = useState<"post" | "gallery">(initialType);

  return (
    <Wrapper>
      <Title>{boardType === "gallery" ? "갤러리 작성" : "게시글 작성"}</Title>
      <WriteModal boardType={boardType} onBoardTypeChange={setBoardType} />
    </Wrapper>
  );
}