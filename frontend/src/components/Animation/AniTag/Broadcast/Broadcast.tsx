import React from "react";
import { BroadcastSection, BroadcastTitle, BroadcastButtonList, BroadcastButton } from "./Broadcast.styled";

const BROADCASTS = ['방영중', '방영 종료', '방영 예정'];

interface BroadcastProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Broadcast({ value, onChange }: BroadcastProps) {
  return (
    <BroadcastSection>
      <BroadcastTitle>방영</BroadcastTitle>
      <BroadcastButtonList>
        {BROADCASTS.map(b => (
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