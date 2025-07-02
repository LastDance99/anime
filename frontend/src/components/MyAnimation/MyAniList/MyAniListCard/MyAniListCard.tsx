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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
      aria-label={t("mylist.card_detail", { title })}
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

      {canEdit && (
        <>
          <MenuBtn
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((v) => !v);
            }}
            aria-label={t("mylist.more_menu")}
          >
            <MoreVertical size={22} />
          </MenuBtn>

          {menuOpen && (
            <MenuDropdown ref={menuRef} onClick={(e) => e.stopPropagation()}>
              {!isAdded && onAdd && (
                <MenuItem onClick={onAdd}>{t("mylist.add_to_list")}</MenuItem>
              )}
              {isAdded && onRemove && (
                <MenuItem onClick={onRemove}>{t("mylist.remove_from_list")}</MenuItem>
              )}
              {onToggleFavorite && (
                <MenuItem
                  onClick={() => {
                    const confirmed = window.confirm(
                      isFavorite
                        ? t("mylist.confirm_unfavorite")
                        : t("mylist.confirm_favorite")
                    );
                    if (confirmed) onToggleFavorite();
                  }}
                >
                  {isFavorite
                    ? t("mylist.unfavorite")
                    : t("mylist.favorite")}
                </MenuItem>
              )}
            </MenuDropdown>
          )}
        </>
      )}
    </CardWrapper>
  );
}