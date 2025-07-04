import React from "react";
import {
  CardBox,
  ShadowBox,
  AniImg,
  AniTitle,
  AddButton,
  ImgBox,
} from "./AniListCard.styled";
import { Plus, Minus } from "lucide-react";
import type { AnimeItem } from "../../../../types/anime";
import { useTranslation } from "react-i18next";

// AnimeItem에 isAdded를 포함한 확장 타입 정의
type AnimeItemWithAdded = AnimeItem & { isAdded?: boolean };

interface Props {
  anime: AnimeItemWithAdded;
  onClick?: (anime: AnimeItemWithAdded) => void;
  isAdded?: boolean;
  onToggle?: () => void;
}

export default function AniListCard({
  anime,
  onClick,
  isAdded = false,
  onToggle,
}: Props) {
  const { t } = useTranslation();

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle?.();
  };

  const posterUrl =
    anime.cover_image_xl ||
    anime.cover_image_l ||
    anime.imgUrl ||
    anime.image_url ||
    "/images/no_poster.png";

  return (
    <CardBox
      onClick={() => onClick?.(anime)}
      tabIndex={0}
      role="button"
      aria-label={t("anime.view_detail", { title: anime.title })}
    >
      <ImgBox>
        <AniImg src={posterUrl} alt={anime.title} />
        <ShadowBox />
        <AniTitle>{anime.title}</AniTitle>
        <AddButton
          onClick={handleAddClick}
          aria-label={t("anime.toggle_add")}
          tabIndex={-1}
        >
          {isAdded ? (
            <Minus size={16} strokeWidth={2.4} />
          ) : (
            <Plus size={16} strokeWidth={2.4} />
          )}
        </AddButton>
      </ImgBox>
    </CardBox>
  );
}