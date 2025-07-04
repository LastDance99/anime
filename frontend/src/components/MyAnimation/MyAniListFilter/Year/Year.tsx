import React from "react";
import { useTranslation } from "react-i18next";
import { Wrapper, Label, Slider, YearValue, ResetButton } from "./Year.styled";

type Props = {
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
  onReset?: () => void;
};

export default function YearSlider({
  value,
  min = 1940,
  max = new Date().getFullYear(),
  onChange,
  onReset,
}: Props) {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Label>
        {t("filter.year")}
        <YearValue>
          {value === 0 ? t("common.all") : value}
        </YearValue>
        {onReset && (
          <ResetButton onClick={onReset} title={t("common.reset")}>
            {t("common.reset")}
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