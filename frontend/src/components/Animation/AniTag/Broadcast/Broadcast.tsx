import React from "react";
import {
  BroadcastSection,
  BroadcastTitle,
  BroadcastButtonList,
  BroadcastButton,
} from "./Broadcast.styled";
import { useTranslation } from "react-i18next";

interface BroadcastProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function Broadcast({ value, onChange, options }: BroadcastProps) {
  const { t } = useTranslation();

  if (!options || options.length === 0) return null;

  return (
    <BroadcastSection>
      <BroadcastTitle>{t("anime.broadcast")}</BroadcastTitle>
      <BroadcastButtonList>
        {options.map(b => (
          <BroadcastButton
            key={b}
            $selected={value === b}
            onClick={() => onChange(b === value ? "" : b)}
          >
            {b}
          </BroadcastButton>
        ))}
      </BroadcastButtonList>
    </BroadcastSection>
  );
}