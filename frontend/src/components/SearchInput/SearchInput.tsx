import React from "react";
import { InputWrapper, Input, SearchBtn } from "./SearchInput.styled";
import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
  placeholder?: string;
};

const SearchInput: React.FC<Props> = ({
  value,
  onChange,
  onSearch,
  placeholder = "검색어를 입력하세요",
}) => (
  <InputWrapper>
    <Input value={value} onChange={onChange} placeholder={placeholder} />
    <SearchBtn type="button" onClick={onSearch}>
      <Search size={22} stroke="#faaac6" />
    </SearchBtn>
  </InputWrapper>
);

export default SearchInput;
