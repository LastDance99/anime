import React from "react";
import {
  ResetButtonBox,
  ResetButtonStyled,
  FilterTitle,
} from "./ResetButton.styled";
import { useTranslation } from "react-i18next";

interface ResetButtonProps {
  onClick: () => void;
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  const { t } = useTranslation();

  return (
    <ResetButtonBox>
      <FilterTitle>{t("anime.filter")}</FilterTitle>
      <ResetButtonStyled onClick={onClick}>
        {t("anime.reset")}
      </ResetButtonStyled>
    </ResetButtonBox>
  );
}