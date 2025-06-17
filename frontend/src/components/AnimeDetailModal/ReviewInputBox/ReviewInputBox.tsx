import React from "react";
import {
  InputBox,
  StyledTextarea,
  SubmitButton
} from "./ReviewInputBox.styled";

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
  disabled,
  placeholder = "이 작품에 대한 평가를 남겨보세요!"
}: ReviewInputBoxProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim().length > 0) {
        onSubmit();
      }
    }
  };

  return (
    <InputBox>
      <StyledTextarea
        value={value}
        onChange={onChange}
        maxLength={500}
        rows={2}
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
      <SubmitButton
        onClick={onSubmit}
        disabled={disabled || value.trim().length === 0}
      >
        등록
      </SubmitButton>
    </InputBox>
  );
}