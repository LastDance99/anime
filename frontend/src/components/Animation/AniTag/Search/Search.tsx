import React from "react";
import { SearchBox, SearchInput } from "./Search.styled";

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Search({ value, onChange }: SearchProps) {
  return (
    <SearchBox>
      <SearchInput
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="제목을 입력하세요"
      />
    </SearchBox>
  );
}