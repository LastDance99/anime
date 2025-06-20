import React from "react";
import { BroadcastSection, BroadcastTitle, BroadcastButtonList, BroadcastButton } from "./Broadcast.styled";

interface BroadcastProps {
  value: string;
  onChange: (value: string) => void;
  options: string[]; // ✨ ← 하드코딩 NO, 서버에서 받은 옵션!
}

export default function Broadcast({ value, onChange, options }: BroadcastProps) {
  if (!options || options.length === 0) return null;

  return (
    <BroadcastSection>
      <BroadcastTitle>방영</BroadcastTitle>
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