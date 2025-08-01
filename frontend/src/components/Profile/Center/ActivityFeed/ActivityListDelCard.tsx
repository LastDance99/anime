import React from "react";
import { BaseCard, AnimeImg, TimeText, SideInfoBox, AniTitle, Title } from "./ActivityListReviewCard.styled";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface Props {
  anime_title: string;
  anime_img: string;
  created_at: string;
}

export default function ActivityListDelCard({ anime_title, anime_img, created_at }: Props) {
  const { t } = useTranslation();

  return (
    <BaseCard $type="list_del">
      <AnimeImg src={anime_img} alt={anime_title} />
      <AniTitle>
        <Title style={{ color: "#B79E12" }}>{anime_title}</Title>
        {t("activity.list_suffix_removed1")}
        <b style={{ color: "#e53935" }}>{t("activity.list_removed_word")}</b>
        {t("activity.list_suffix_removed2")}
      </AniTitle>
      <SideInfoBox>
        <TimeText>{dayjs(created_at).fromNow()}</TimeText>
      </SideInfoBox>
    </BaseCard>
  );
}