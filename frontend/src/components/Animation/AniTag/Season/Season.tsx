import React from "react";
import {
  SeasonSection,
  SeasonTitle,
  SeasonButtonList,
  SeasonButton
} from "./Season.styled";
import { useTranslation } from "react-i18next";

interface SeasonProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function Season({ value, onChange, options }: SeasonProps) {
  const { t } = useTranslation();

  if (!options || options.length === 0) return null;

  return (
    <SeasonSection>
      <SeasonTitle>{t("anime.season")}</SeasonTitle>
      <SeasonButtonList>
        {options.map(s => (
          <SeasonButton
            key={s}
            $selected={value === s}
            onClick={() => onChange(s === value ? "" : s)}
          >
            {s}
          </SeasonButton>
        ))}
      </SeasonButtonList>
    </SeasonSection>
  );
}