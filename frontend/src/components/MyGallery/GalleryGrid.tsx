import React from "react";
import GalleryCard from "./GalleryCard/GalleryCard";
import { GridWrapper } from "./GalleryGrid.styled";
import type { BoardItem } from "../../types/board";

type Props = {
  list: BoardItem[];
  onItemClick: (id: number) => void;
};

const GalleryGrid: React.FC<Props> = ({ list, onItemClick }) => {
  return (
    <GridWrapper>
      {list.map(item => (
        <GalleryCard
          key={item.id}
          title={item.title}
          imageUrl={item.images[0] || "/images/default-thumb.png"}
          onClick={() => onItemClick(item.id)}
        />
      ))}
    </GridWrapper>
  );
};

export default GalleryGrid;