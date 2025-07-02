import React, { useState } from "react";
import {
  FilterWrapper,
  TotalText,
  SortBox,
  SortLabel,
  SortIcon,
  SortDropdown,
  SortOption,
} from "./AniListFilter.styled";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SortOptionType {
  label: string;
  value: string;
}

interface Props {
  total: number;
  sort: string;
  sortOptions: SortOptionType[];
  onSortChange: (value: string) => void;
  isFiltered: boolean;
}

export default function AniListFilter({
  total,
  sort,
  sortOptions,
  onSortChange,
  isFiltered,
}: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <FilterWrapper>
      {isFiltered && total > 0 && (
        <TotalText>
          {t("anime.total_result", { count: total })}
        </TotalText>
      )}
      <SortBox onClick={() => setOpen((v) => !v)}>
        <SortLabel>{sort}</SortLabel>
        <SortIcon>
          <ChevronDown size={16} />
        </SortIcon>
        {open && (
          <SortDropdown>
            {sortOptions.map((option) => (
              <SortOption
                key={option.value}
                onClick={(e) => {
                  e.stopPropagation();
                  onSortChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </SortOption>
            ))}
          </SortDropdown>
        )}
      </SortBox>
    </FilterWrapper>
  );
}