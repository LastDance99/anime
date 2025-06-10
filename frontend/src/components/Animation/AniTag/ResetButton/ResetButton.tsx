import React from "react";
import { ResetButtonBox, ResetButtonStyled } from "./ResetButton.styled";

interface ResetButtonProps {
  onClick: () => void;
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <ResetButtonBox>
      <ResetButtonStyled onClick={onClick}>
        전체 초기화
      </ResetButtonStyled>
    </ResetButtonBox>
  );
}