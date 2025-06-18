import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Form,
  Input,
  Select,
  EditorWrapper,
  Label,
  Button,
  FileUploadRow,
  GlobalQuillImageStyle,
} from "./WriteModal.styled";

import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

type BoardType = "post" | "gallery";

type Props = {
  boardType?: BoardType;
  onBoardTypeChange?: (type: BoardType) => void;
};

// ✅ S3 클라이언트
const s3 = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

// ✅ 이미지 업로드 함수
async function uploadImageToS3(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const key = `uploads/${uuidv4()}.${ext}`;

  const command = new PutObjectCommand({
    Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
    Key: key,
    ContentType: file.type,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 300 });
  await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  return `https://${command.input.Bucket}.s3.amazonaws.com/${key}`;
}

// ✅ Quill 모듈 커스터마이징
const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline"],
      ["link", "image", "youtube"],
      ["clean"],
    ],
    handlers: {
      youtube: function (this: any) {
        const url = prompt("유튜브 링크를 입력하세요");
        const match = url?.match(
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
        );
        if (match) {
          const videoId = match[1];
          const iframe = `<p class="ql-align-center"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></p>`;
          const range = this.quill.getSelection(true);
          this.quill.clipboard.dangerouslyPasteHTML(range?.index ?? 0, iframe);
        } else {
          alert("유효한 유튜브 링크가 아닙니다.");
        }
      },
    },
  },
};

export default function WriteForm({
  boardType: initialType = "post",
  onBoardTypeChange,
}: Props) {
  const [boardType, setBoardType] = useState<BoardType>(initialType);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    onBoardTypeChange?.(boardType);
  }, [boardType, onBoardTypeChange]);

  // ✅ 이미지 드롭 업로드 + 유튜브 자동 변환
  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer?.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;

      const url = await uploadImageToS3(file);
      const range = quill.getSelection(true);
      const insertAt = range?.index ?? quill.getLength();

      quill.clipboard.dangerouslyPasteHTML(
        insertAt,
        `<p class="ql-align-center"><img src="${url}" class="centered-image" /></p>`
      );
    };

    const handlePaste = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData("text/plain");
      if (!text) return;

      const match = text.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
      );
      if (match) {
        e.preventDefault();
        const videoId = match[1];
        const iframe = `<p class="ql-align-center"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></p>`;
        const range = quill.getSelection(true);
        quill.clipboard.dangerouslyPasteHTML(range?.index ?? 0, iframe);
      }
    };

    const editor = quill.root;
    editor.addEventListener("drop", handleDrop);
    editor.addEventListener("paste", handlePaste);
    return () => {
      editor.removeEventListener("drop", handleDrop);
      editor.removeEventListener("paste", handlePaste);
    };
  }, []);

  // ✅ 유튜브 버튼 아이콘 삽입
  useEffect(() => {
    const toolbar = document.querySelector(".ql-toolbar");
    const youtubeBtn = toolbar?.querySelector(".ql-youtube") as HTMLElement;
    if (youtubeBtn && youtubeBtn.innerHTML.trim() === "") {
      youtubeBtn.innerText = "YT";
    }
  }, []);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 본문을 입력해주세요.");
      return;
    }

    console.log({ boardType, title, content });
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
      <GlobalQuillImageStyle>
        <EditorWrapper>
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="내용을 입력하세요"
          />
        </EditorWrapper>
      </GlobalQuillImageStyle>

      <FileUploadRow>
        <Button type="button" onClick={handleSubmit}>
          작성 완료
        </Button>
      </FileUploadRow>
    </Form>
  );
}