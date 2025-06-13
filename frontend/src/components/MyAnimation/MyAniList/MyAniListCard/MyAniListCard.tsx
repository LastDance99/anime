import React, { useState, useRef } from "react";
import { CardWrapper, Thumbnail, Title, Genre, Score, MenuBtn, MenuDropdown, MenuItem } from "./MyAniListCard.styled";
import { MoreVertical } from "lucide-react";

type MyAniListCardProps = {
  imgUrl: string;
  title: string;
  genres: string[];
  myRating: number;
  rating: number;
  isFavorite: boolean;
  onToggleFavorite?: () => void;
  onDelete?: () => void;
};

export default function MyAniListCard({
  imgUrl,
  title,
  genres,
  rating,
  myRating,
  isFavorite,
  onToggleFavorite,
  onDelete,
}: MyAniListCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴 바깥 클릭시 닫힘
  React.useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <CardWrapper onMouseLeave={() => setMenuOpen(false)}>
      <Thumbnail src={imgUrl} alt={title} />
      <Title>{title}</Title>
      <Genre>{genres.join(", ")}</Genre>
      <Score>{myRating.toFixed(1)}</Score>
      
      <MenuBtn onClick={() => setMenuOpen(v => !v)} aria-label="더보기">
        <MoreVertical size={22} />
      </MenuBtn>
      {menuOpen && (
        <MenuDropdown>
          <MenuItem onClick={onDelete}>리스트에서 삭제</MenuItem>
          <MenuItem onClick={onToggleFavorite}>
            {isFavorite ? "최애의 애니 취소" : "최애의 애니 등록"}
          </MenuItem>
        </MenuDropdown>
      )}
    </CardWrapper>
  );
}