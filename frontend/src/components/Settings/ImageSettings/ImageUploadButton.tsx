import React, { useRef } from "react";
import { UploadButton } from "./ImageUploadButton.styled";
import { useTranslation } from "react-i18next";

type Props = {
  onChange: (file: File) => void;
  label?: string;
};

export default function ImageUploadButton({ onChange, label }: Props) {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
      e.target.value = "";
    }
  };

  return (
    <>
      <UploadButton onClick={handleClick}>
        {label || t("image_settings.upload")}
      </UploadButton>
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