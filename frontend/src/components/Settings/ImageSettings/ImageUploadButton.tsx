import React, { useRef } from "react";
import { UploadButton } from "./ImageUploadButton.styled";

type Props = {
  onChange: (file: File) => void;
  label?: string;
};

export default function ImageUploadButton({ onChange, label = "사진 변경" }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      // 👉 같은 파일 다시 선택해도 이벤트 발생하도록 리셋
      e.target.value = "";
    }
  };

  return (
    <>
      <UploadButton onClick={handleClick}>{label}</UploadButton>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        hidden
      />
    </>
  );
}