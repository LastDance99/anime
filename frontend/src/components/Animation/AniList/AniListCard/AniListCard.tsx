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
  return (
    <CardBox
      onClick={() => onClick?.(anime)}
      tabIndex={0}
      role="button"
      aria-label={`${anime.title} 상세보기`}
      >
      <ImgBox>
        <AniImg src={anime.imgUrl} alt={anime.title} />
        <ShadowBox />
        <AniTitle>{anime.title}</AniTitle>
        <AddButton onClick={onAdd} aria-label="리스트에 추가">
          <Plus size={18} strokeWidth={2.4} />
        </AddButton>
      </ImgBox>
    </CardBox>
  );
}