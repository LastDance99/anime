import React from "react";
import {
  Box,
  StarBox,
  Star,
  InputArea,
  SubmitBtn,
} from "./ReviewInputBox.styled";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (content: string, rating: number) => void;
  rating: number;
  onRatingChange: (val: number) => void;
  disabled?: boolean;
};

export default function ReviewInputBox({
  value,
  onChange,
  onSubmit,
  rating,
  onRatingChange,
  disabled = false,
}: Props) {
  return (
    <Box>
      <StarBox>
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            $active={i <= rating}
            onClick={() => onRatingChange(i)}
          >
            ★
          </Star>
        ))}
      </StarBox>
      <InputArea
        value={value}
        onChange={onChange}
        placeholder="이 작품에 대한 당신의 감상을 남겨보세요!"
        maxLength={500}
        disabled={disabled}
      />
      <SubmitBtn onClick={() => onSubmit(value, rating)} disabled={disabled || !value.trim() || rating === 0}>
        등록
      </SubmitBtn>
    </Box>
  );
}