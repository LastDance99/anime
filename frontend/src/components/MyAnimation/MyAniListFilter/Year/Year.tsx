import React from "react";
import { Wrapper, Label, Slider, YearValue, ResetButton } from "./Year.styled"

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  onReset?: () => void; // 리셋 핸들러 추가 (optional)
};

export default function YearSlider({ value, min = 1940, max = 2025, onChange, onReset }: Props) {
  return (
    <Wrapper>
      <Label>
        출시년도
        <YearValue>{value === 0 ? "전체" : value}</YearValue>
        {onReset && (
          <ResetButton onClick={onReset} title="초기화">
            초기화
          </ResetButton>
        )}
      </Label>
      <Slider
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </Wrapper>
  );
}