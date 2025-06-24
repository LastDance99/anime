import React, { useState, useRef } from "react";
import {
  CardWrapper,
  Thumbnail,
  Title,
  Genre,
  Score,
  MenuBtn,
  MenuDropdown,
  MenuItem,
} from "./MyAniListCard.styled";
import { MoreVertical } from "lucide-react";

type MyAniListCardProps = {
  imgUrl?: string;
  title: string;
  genres?: string[];
  myRating?: number;
  rating?: number;
  isAdded: boolean; // ✅ 내 리스트에 있는지 여부
  onToggleFavorite?: () => void;
  onAdd?: () => void;
  onRemove?: () => void;
  onClick?: () => void;
};

export default function MyAniListCard({
  imgUrl,
  title,
  genres,
  myRating,
  isAdded,
  onToggleFavorite,
  onAdd,
  onRemove,
  onClick,
}: MyAniListCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴 바깥 클릭 시 닫기
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
    <CardWrapper
      tabIndex={0}
      role="button"
      aria-label={`${title} 상세보기`}
      onClick={onClick}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <Thumbnail src={imgUrl || "/images/no_poster.png"} alt={title} />
      <Title>{title}</Title>
      <Genre>{(genres ?? []).join(", ")}</Genre>
      <Score>{myRating !== undefined ? myRating.toFixed(1) : "-"}</Score>

      <MenuBtn
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen((v) => !v);
        }}
        aria-label="더보기"
      >
        <MoreVertical size={22} />
      </MenuBtn>

      {menuOpen && (
        <MenuDropdown ref={menuRef} onClick={(e) => e.stopPropagation()}>
          {!isAdded && onAdd && <MenuItem onClick={onAdd}>리스트에 추가</MenuItem>}
          {isAdded && onRemove && <MenuItem onClick={onRemove}>리스트에서 삭제</MenuItem>}
          <MenuItem onClick={onToggleFavorite}>즐겨찾기 토글</MenuItem>
        </MenuDropdown>
      )}
    </CardWrapper>
  );
}