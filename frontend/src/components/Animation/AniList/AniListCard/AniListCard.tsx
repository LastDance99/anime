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
  // AddButton 클릭 시 부모 CardBox 클릭 방지
  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd?.();
  };

  return (
    <CardBox
      onClick={() => onClick?.(anime)}
      tabIndex={0}
      role="button"
      aria-label={`${anime.title} 상세보기`}
    >
      <ImgBox>
        <AniImg src={anime.image_url} alt={anime.title} />
        <ShadowBox />
        <AniTitle>{anime.title}</AniTitle>
        <AddButton
          onClick={handleAddClick}
          aria-label="리스트에 추가"
          tabIndex={-1} // 카드에만 포커스 가게 하려면
        >
          <Plus size={18} strokeWidth={2.4} />
        </AddButton>
      </ImgBox>
    </CardBox>
  );
}