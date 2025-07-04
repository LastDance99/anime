import React from "react";
import GalleryCard from "./GalleryCard/GalleryCard";
import { GridWrapper } from "./GalleryGrid.styled";
import type { BoardItem } from "../../types/board";

type Props = {
  list: BoardItem[];
  onItemClick: (id: number) => void;
};

const GalleryGrid: React.FC<Props> = ({ list, onItemClick }) => {

  const getValidThumb = (thumb?: string) => {
    if (!thumb || thumb === "null" || thumb === "undefined") {
      return "/images/default-thumb.png";
    }
    return thumb;
  };

  return (
    <GridWrapper>
      {list.map(item => (
        <GalleryCard
          key={item.id}
          title={item.title}
          imageUrl={getValidThumb(item.thumbnail)}
          onClick={() => onItemClick(item.id)}
        />
      ))}
    </GridWrapper>
  );
};

export default GalleryGrid;