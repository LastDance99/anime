import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Form,
  Input,
  Select,
  EditorWrapper,
  Label,
  ImagePreviewBox,
  Button,
  FileUploadRow,
} from "./WriteModal.styled";

type BoardType = "post" | "gallery";

type Props = {
  boardType?: BoardType; // 초기값
  onBoardTypeChange?: (type: BoardType) => void; // 부모로 알림
};

export default function WriteForm({
  boardType: initialType = "post",
  onBoardTypeChange,
}: Props) {
  const [boardType, setBoardType] = useState<BoardType>(initialType);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();

  // ✅ 내부 boardType이 바뀌면 부모에게 알림
  useEffect(() => {
    onBoardTypeChange?.(boardType);
  }, [boardType, onBoardTypeChange]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 본문을 입력해주세요.");
      return;
    }

    console.log({ boardType, title, content, images });
    navigate("/board");
  };

  return (
    <Form>
      <Label>게시판 종류</Label>
      <Select
        value={boardType}
        onChange={(e) => setBoardType(e.target.value as BoardType)}
      >
        <option value="post">게시글</option>
        <option value="gallery">갤러리</option>
      </Select>

      <Label>제목</Label>
      <Input
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Label>본문</Label>
      <EditorWrapper>
        <ReactQuill value={content} onChange={setContent} />
      </EditorWrapper>

      <Label>이미지 첨부</Label>
      <FileUploadRow>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
        <Button onClick={handleSubmit}>작성 완료</Button>
      </FileUploadRow>

      {images.length > 0 && (
        <ImagePreviewBox>
          {images.map((url, idx) => (
            <img key={idx} src={url} alt={`preview-${idx}`} />
          ))}
        </ImagePreviewBox>
      )}
    </Form>
  );
}