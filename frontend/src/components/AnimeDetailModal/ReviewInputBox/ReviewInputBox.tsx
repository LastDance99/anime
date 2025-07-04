import React, { useCallback } from "react";
import {
  InputBox,
  StyledTextarea,
  SubmitButton,
} from "./ReviewInputBox.styled";
import { useTranslation } from "react-i18next";

interface ReviewInputBoxProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ReviewInputBox({
  value,
  onChange,
  onSubmit,
  disabled = false,
  placeholder,
}: ReviewInputBoxProps) {
  const { t } = useTranslation();

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (value.trim() && !disabled) {
          console.log("[ReviewInputBox] Enter로 제출");
          onSubmit();
        }
      }
    },
    [value, disabled, onSubmit]
  );

  const handleClickSubmit = useCallback(() => {
    if (value.trim() && !disabled) {
      console.log("[ReviewInputBox] 버튼 클릭 제출");
      onSubmit();
    }
  }, [value, disabled, onSubmit]);

  return (
    <InputBox>
      <StyledTextarea
        value={value}
        onChange={onChange}
        maxLength={500}
        rows={2}
        placeholder={placeholder || t("review.input_placeholder")}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
      <SubmitButton
        onClick={handleClickSubmit}
        disabled={disabled || value.trim().length === 0}
        aria-label={t("review.submit_label")}
      >
        {t("review.submit")}
      </SubmitButton>
    </InputBox>
  );
}