import { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Form, Input, Select, EditorWrapper, Label, Button, FileUploadRow, GlobalQuillImageStyle,
} from "./WriteModal.styled";
import { createBoardPost, updateBoardPost } from "../../api/board";
import { getPresignedUrl } from "../../api/core";
import { v4 as uuidv4 } from "uuid";
import type { BoardItem } from "../../types/board";
import { useTranslation } from "react-i18next";

type BoardType = "post" | "gallery";
type WriteType = "post" | "gallery" | "notice";

type Props = {
  boardType?: BoardType | "notice";
  onBoardTypeChange?: (type: WriteType) => void;
  post?: BoardItem;
  mode?: "create" | "edit";
  isAdmin?: boolean;
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
    headers: { "Content-Type": file.type, "x-amz-acl": "public-read" },
    body: file,
  });
  if (!uploadRes.ok) throw new Error("S3 업로드 실패");
  return file_url;
}

// 타입 변환 함수
function toWriteType(post?: BoardItem): WriteType {
  if (!post) return "post";
  if (post.is_notice) return "notice";
  if (post.board_type === "gallery") return "gallery";
  return "post";
}

const WriteForm = ({
  boardType: initialBoardType = "post",
  onBoardTypeChange,
  post,
  mode = "create",
  isAdmin = false,
}: Props) => {
  const { t } = useTranslation();

  const [writeType, setWriteType] = useState<WriteType>(
    post ? toWriteType(post) : (initialBoardType as WriteType)
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    onBoardTypeChange?.(writeType);
  }, [writeType, onBoardTypeChange]);

  useEffect(() => {
    if (mode === "edit" && post) {
      setWriteType(toWriteType(post));
      setTitle(post.title);
      setContent(post.content);
    }
  }, [mode, post]);

  // modules를 useMemo로! (핸들러 안에서 번역 사용 가능)
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        ["link", "image", "youtube"],
        ["clean"],
      ],
      handlers: {
        image: function (this: any) {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");
          input.click();
          input.onchange = async () => {
            const file = input.files?.[0];
            if (file) {
              try {
                const url = await uploadImageToS3(file);
                const range = this.quill.getSelection(true);
                this.quill.clipboard.dangerouslyPasteHTML(
                  range?.index ?? this.quill.getLength(),
                  `<p class="ql-align-center"><img src="${url}" class="centered-image" /></p>`
                );
              } catch {
                alert(t("board.write.alert_image_upload_fail", "이미지 업로드 실패"));
              }
            }
          };
        },
        youtube: function (this: any) {
          const url = prompt(t("board.write.input_youtube", "유튜브 링크를 입력하세요"));
          const match = url?.match(
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
          );
          if (match) {
            const videoId = match[1];
            const iframe = `<p class="ql-align-center"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></p>`;
            const range = this.quill.getSelection(true);
            this.quill.clipboard.dangerouslyPasteHTML(range?.index ?? 0, iframe);
          } else {
            alert(t("board.write.alert_invalid_youtube", "유효한 유튜브 링크가 아닙니다."));
          }
        },
      },
    },
  }), [t]);

  // 이미지 드래그/붙여넣기 등 이벤트
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
          `<p class="ql-align-center"><img src="${url}" class="centered-image" /></p>`
        );
      } catch (err) {
        alert(t("board.write.alert_image_upload_error", "이미지 업로드 중 오류가 발생했습니다."));
      }
    };
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (const item of items) {
          if (item.type.indexOf("image") !== -1) {
            const file = item.getAsFile();
            if (file) {
              e.preventDefault();
              try {
                const url = await uploadImageToS3(file);
                const range = quill.getSelection(true);
                quill.clipboard.dangerouslyPasteHTML(
                  range?.index ?? quill.getLength(),
                  `<p class="ql-align-center"><img src="${url}" class="centered-image" /></p>`
                );
              } catch {
                alert(t("board.write.alert_image_upload_fail", "이미지 업로드 실패"));
              }
              return;
            }
          }
        }
      }
      const text = e.clipboardData?.getData("text/plain") ?? "";
      if (text.startsWith("data:image/")) {
        e.preventDefault();
        try {
          const arr = text.split(",");
          const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          const file = new File([u8arr], `clipboard.${mime.split("/")[1]}`, { type: mime });
          const url = await uploadImageToS3(file);
          const range = quill.getSelection(true);
          quill.clipboard.dangerouslyPasteHTML(
            range?.index ?? quill.getLength(),
            `<p class="ql-align-center"><img src="${url}" class="centered-image" /></p>`
          );
        } catch {
          alert(t("board.write.alert_image_upload_fail", "이미지 업로드 실패"));
        }
        return;
      }
      const youtubeMatch = text.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
      );
      if (youtubeMatch) {
        e.preventDefault();
        const videoId = youtubeMatch[1];
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
  }, [t]);

  useEffect(() => {
    const toolbar = document.querySelector(".ql-toolbar");
    const youtubeBtn = toolbar?.querySelector(".ql-youtube") as HTMLElement;
    if (youtubeBtn && youtubeBtn.innerHTML.trim() === "") {
      youtubeBtn.innerText = "YT";
    }
  }, []);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert(t("board.write.alert_required", "제목과 본문을 입력해주세요."));
      return;
    }
    if (writeType === "gallery" && !/<img\s+[^>]*src=["'][^"']+["']/i.test(content)) {
      alert(t("board.write.alert_gallery_image", "갤러리 글은 이미지를 최소 1개 이상 포함해야 합니다."));
      return;
    }
    const payload: any = {
      board_type: writeType === "notice" ? "post" : writeType,
      title,
      content,
    };
    if (writeType === "notice") payload.is_notice = true;
    try {
      if (mode === "edit" && post) {
        await updateBoardPost(post.id, payload);
        alert(t("board.write.success_edit", "게시글이 수정되었습니다."));
      } else {
        await createBoardPost(payload);
        alert(t("board.write.success_create", "게시글이 등록되었습니다!"));
      }
      navigate("/board");
    } catch (error: any) {
      console.error("게시글 저장 실패:", error);
      alert(t("board.write.fail", "게시글 저장에 실패했습니다."));
    }
  };

  return (
    <Form>
      <Label>{t("board.write.label_type", "게시판 종류")}</Label>
      <Select
        value={writeType}
        onChange={(e) => setWriteType(e.target.value as WriteType)}
      >
        <option value="post">{t("board.write.type_post", "게시글")}</option>
        <option value="gallery">{t("board.write.type_gallery", "갤러리")}</option>
        {isAdmin && <option value="notice">{t("board.write.type_notice", "공지")}</option>}
      </Select>
      <Label>{t("board.write.label_title", "제목")}</Label>
      <Input
        placeholder={t("board.write.placeholder_title", "제목을 입력하세요")}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Label>{t("board.write.label_content", "본문")}</Label>
      <GlobalQuillImageStyle>
        <EditorWrapper>
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder={t("board.write.placeholder_content", "내용을 입력하세요")}
          />
        </EditorWrapper>
      </GlobalQuillImageStyle>
      <FileUploadRow>
        <Button type="button" onClick={handleSubmit}>
          {mode === "edit"
            ? t("board.write.button_edit", "수정 완료")
            : t("board.write.button_submit", "작성 완료")}
        </Button>
      </FileUploadRow>
    </Form>
  );
};

export default WriteForm;