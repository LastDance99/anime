import React from "react";
import { Wrapper, Label, Slider } from "./Year.styled"

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
};

export default function YearSlider({ value, min = 1940, max = 2025, onChange }: Props) {
  return (
    <Wrapper>
      <Label>Year</Label>
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