import React from "react";
import { SearchBox, SearchInput } from "./Search.styled";
import { useTranslation } from "react-i18next";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ value, onChange }: SearchProps) {
  const { t } = useTranslation();

  return (
    <SearchBox>
      <SearchInput
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={t("anime.search_placeholder")}
      />
    </SearchBox>
  );
}