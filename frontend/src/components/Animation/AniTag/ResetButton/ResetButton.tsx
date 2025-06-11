import React from "react";
import { ResetButtonBox, ResetButtonStyled, FilterTitle } from "./ResetButton.styled";

interface ResetButtonProps {
  onClick: () => void;
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <ResetButtonBox>
      <FilterTitle>필터</FilterTitle>
      <ResetButtonStyled onClick={onClick}>
        전체 초기화
      </ResetButtonStyled>
    </ResetButtonBox>
  );
}