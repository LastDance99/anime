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

import { createBoardPost, updateBoardPost } from "../../api/board";
import { getPresignedUrl } from "../../api/core";
import { v4 as uuidv4 } from "uuid";
import type { BoardItem } from "../../types/board";

type BoardType = "post" | "gallery";

type Props = {
  boardType?: BoardType;
  onBoardTypeChange?: (type: BoardType) => void;
  post?: BoardItem;
  mode?: "create" | "edit";
};

async function uploadImageToS3(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `uploads/${uuidv4()}.${ext}`;

  const { upload_url: presignedUrl, file_url } = await getPresignedUrl({
    file_name: fileName,
    file_type: file.type,
  });

  const uploadRes = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      "x-amz-acl": "public-read",
    },
    body: file,
  });

  if (!uploadRes.ok) throw new Error("S3 업로드 실패");
  return file_url;
}

const modules = {
  toolbar: {
    container: [["bold", "italic", "underline"], ["link", "image", "youtube"], ["clean"]],
    handlers: {
      youtube: function (this: any) {
        const url = prompt("유튜브 링크를 입력하세요");
        const match = url?.match(
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
        );
        if (match) {
          const videoId = match[1];
          const iframe = `<p class=\"ql-align-center\"><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/${videoId}\" frameborder=\"0\" allowfullscreen></iframe></p>`;
          const range = this.quill.getSelection(true);
          this.quill.clipboard.dangerouslyPasteHTML(range?.index ?? 0, iframe);
        } else {
          alert("유효한 유튜브 링크가 아닙니다.");
        }
      },
    },
  },
};

export default function WriteForm({ boardType: initialType = "post", onBoardTypeChange, post, mode = "create" }: Props) {
  const [boardType, setBoardType] = useState<BoardType>(initialType);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    onBoardTypeChange?.(boardType);
  }, [boardType, onBoardTypeChange]);

  useEffect(() => {
    if (mode === "edit" && post) {
      if (post.board_type === "post" || post.board_type === "gallery") {
        setBoardType(post.board_type);
      }
      setTitle(post.title);
      setContent(post.content);
    }
  }, [mode, post]);

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const handleDrop = async (e: DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer?.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;

      try {
        const url = await uploadImageToS3(file);
        const range = quill.getSelection(true);
        const insertAt = range?.index ?? quill.getLength();
        quill.clipboard.dangerouslyPasteHTML(
          insertAt,
          `<p class=\"ql-align-center\"><img src=\"${url}\" class=\"centered-image\" /></p>`
        );
      } catch (err) {
        alert("이미지 업로드 중 오류가 발생했습니다.");
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData("text/plain");
      const match = text?.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
      );
      if (match) {
        e.preventDefault();
        const videoId = match[1];
        const iframe = `<p class=\"ql-align-center\"><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/${videoId}\" frameborder=\"0\" allowfullscreen></iframe></p>`;
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

  useEffect(() => {
    const toolbar = document.querySelector(".ql-toolbar");
    const youtubeBtn = toolbar?.querySelector(".ql-youtube") as HTMLElement;
    if (youtubeBtn && youtubeBtn.innerHTML.trim() === "") {
      youtubeBtn.innerText = "YT";
    }
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 본문을 입력해주세요.");
      return;
    }

    const payload = {
      board_type: boardType,
      title,
      content,
    };

    try {
      if (mode === "edit" && post) {
        await updateBoardPost(post.id, payload);
        alert("게시글이 수정되었습니다.");
      } else {
        await createBoardPost(payload);
        alert("게시글이 등록되었습니다!");
      }
      navigate("/board");
    } catch (error: any) {
      console.error("게시글 저장 실패:", error);
      alert("게시글 저장에 실패했습니다.");
    }
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
          {mode === "edit" ? "수정 완료" : "작성 완료"}
        </Button>
      </FileUploadRow>
    </Form>
  );
}
