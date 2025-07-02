import React from "react";
import { InputWrapper, Input, SearchBtn } from "./SearchInput.styled";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

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
  placeholder,
}) => {
  const { t } = useTranslation();
  return (
    <InputWrapper>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? t("search.placeholder")}
      />
      <SearchBtn type="button" onClick={onSearch}>
        <Search size={22} stroke="#faaac6" />
      </SearchBtn>
    </InputWrapper>
  );
};

export default SearchInput;