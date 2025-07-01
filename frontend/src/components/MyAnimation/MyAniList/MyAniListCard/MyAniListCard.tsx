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
  CornerStar,
} from "./MyAniListCard.styled";
import { MoreVertical } from "lucide-react";

type MyAniListCardProps = {
  imgUrl?: string;
  title: string;
  genres?: string[];
  myRating?: number;
  rating?: number;
  isAdded: boolean;
  onToggleFavorite?: () => void;
  onAdd?: () => void;
  onRemove?: () => void;
  onClick?: () => void;
  isFavorite?: boolean;
  canEdit?: boolean;
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
  isFavorite,
  canEdit = false,
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
      <Score>
        {myRating !== undefined ? myRating.toFixed(1) : "-"}
        {isFavorite && <CornerStar />}
      </Score>

      {/* 👉 본인 프로필일 때만 더보기 메뉴 사용 가능 */}
      {canEdit && (
        <>
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
              {onToggleFavorite && (
                <MenuItem
                  onClick={() => {
                    const confirmed = window.confirm(
                      isFavorite
                        ? "최애의 애니에서 취소하시겠습니까?"
                        : "최애의 애니로 등록하시겠습니까?"
                    );
                    if (confirmed) onToggleFavorite();
                  }}
                >
                  {isFavorite ? "최애의 애니 취소" : "최애의 애니 등록"}
                </MenuItem>
              )}
            </MenuDropdown>
          )}
        </>
      )}
    </CardWrapper>
  );
}