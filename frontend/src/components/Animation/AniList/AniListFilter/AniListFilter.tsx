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

interface SortOptionType {
  label: string;
  value: string;
}

interface Props {
  total: number;
  sort: string; // label
  sortOptions: SortOptionType[];
  onSortChange: (value: string) => void;
}

export default function AniListFilter({
  total,
  sort,
  sortOptions,
  onSortChange,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <FilterWrapper>
      <TotalText>
        총 <b>{total}</b>개의 작품이 검색되었어요!
      </TotalText>
      <SortBox onClick={() => setOpen(v => !v)}>
        <SortLabel>{sort}</SortLabel>
        <SortIcon>
          <ChevronDown size={16} />
        </SortIcon>
        {open && (
          <SortDropdown>
            {sortOptions.map(option => (
              <SortOption
                key={option.value}
                onClick={e => {
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