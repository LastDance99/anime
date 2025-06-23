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

interface Props {
  anime: AnimeItem;
  onClick?: (anime: AnimeItem) => void;
  isAdded?: boolean;
  onToggle?: () => void;
}

export default function AniListCard({
  anime,
  onClick,
  isAdded = false,
  onToggle,
}: Props) {
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
      aria-label={`${anime.title} 상세보기`}
    >
      <ImgBox>
        <AniImg src={posterUrl} alt={anime.title} />
        <ShadowBox />
        <AniTitle>{anime.title}</AniTitle>
        <AddButton
          onClick={handleAddClick}
          aria-label="리스트에 추가 또는 제거"
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