import React from "react";
import { useTranslation } from "react-i18next";
import { StatsRow, StatBox, StatNumber, StatLabel } from "./StatsBox.styled";

interface Props {
  totalAnime: number;
  avgScore: number;
  attendance: number;
}

export default function StatsBox({ totalAnime, avgScore, attendance }: Props) {
  const { t } = useTranslation();

  return (
    <StatsRow>
      <StatBox>
        <StatNumber>{totalAnime}</StatNumber>
        <StatLabel>{t("profile.stats.anime_list")}</StatLabel>
      </StatBox>
      <StatBox>
        <StatNumber>{avgScore}</StatNumber>
        <StatLabel>{t("profile.stats.avg_score")}</StatLabel>
      </StatBox>
      <StatBox>
        <StatNumber>{attendance}</StatNumber>
        <StatLabel>{t("profile.stats.attendance")}</StatLabel>
      </StatBox>
    </StatsRow>
  );
}