import React from "react";
import { BaseCard, AnimeImg, TimeText } from "./ActivityListReviewCard.styled";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface Props {
  anime_title: string;
  anime_img: string;
  created_at: string;
}

export default function ActivityListAddCard({
  anime_title,
  anime_img,
  created_at,
}: Props) {
  const { t } = useTranslation();

  return (
    <BaseCard $type="list_add">
      <AnimeImg src={anime_img} alt={anime_title} />
      <span>
        <b style={{ color: "#B79E12" }}>{anime_title}</b>{" "}
        {t("activity.list_added_prefix")}{" "}
        <b style={{ color: "#2196f3" }}>{t("activity.list_added_action")}</b>
        {t("activity.list_added_suffix")}
      </span>
      <TimeText>{dayjs(created_at).fromNow()}</TimeText>
    </BaseCard>
  );
}