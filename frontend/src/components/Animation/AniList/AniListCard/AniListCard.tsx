import React from "react";
import { CardBox, ShadowBox, AniImg, AniTitle, AddButton, ImgBox } from "./AniListCard.styled";
import { Plus } from "lucide-react";
import type { AnimeItem } from "../../../../types/anime";

interface Props {
  anime: AnimeItem;
  onAdd?: () => void;
  onClick?: (anime: AnimeItem) => void;
}

export default function AniListCard({ anime, onAdd, onClick }: Props) {
  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd?.();
  };

  // 이미지 url 우선순위 적용!
  const posterUrl =
    anime.cover_image_xl ||
    anime.cover_image_l ||
    anime.imgUrl ||
    anime.image_url ||
    "/images/no_poster.png"; // 대체 이미지 경로

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
          aria-label="리스트에 추가"
          tabIndex={-1}
        >
          <Plus size={18} strokeWidth={2.4} />
        </AddButton>
      </ImgBox>
    </CardBox>
  );
}