import React from "react";
import Select, { components } from "react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTheme } from "styled-components";
import { useTranslation } from "react-i18next";

type OptionType = { value: string; label: string };

type Props = {
  value?: string;
  onChange: (v: string) => void;
  options: OptionType[];
  label?: string;
  labelKey?: string;
};

export default function FormatSelect({ value, onChange, options, label, labelKey }: Props) {
  const theme = useTheme();
  const { t } = useTranslation();
  const selected = options.find(opt => opt.value === value) || null;

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      borderRadius: "10px",
      minHeight: "38px",
      background: theme.colors.background,
      borderColor: state.isFocused ? theme.colors.bordermain : theme.colors.secondary,
      boxShadow: state.isFocused ? `0 0 0 2px ${theme.colors.bordermain}33` : "none",
      fontFamily: theme.fonts.cafe24,
      fontWeight: theme.Weights.medium,
      fontSize: theme.fontSizes.sm,
      color: theme.colors.text,
      "&:hover": { borderColor: theme.colors.bordermain },
    }),
    option: (base: any, state: any) => ({
      ...base,
      background: state.isSelected
        ? theme.colors.secondary
        : state.isFocused
        ? theme.colors.primary
        : theme.colors.background,
      color: theme.colors.text,
      fontWeight: state.isSelected ? theme.Weights.bold : theme.Weights.medium,
      fontFamily: theme.fonts.cafe24,
      fontSize: theme.fontSizes.sm,
      borderRadius: 6,
      cursor: "pointer",
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: 12,
      background: theme.colors.background,
      boxShadow: `0 6px 28px 0 ${theme.colors.secondary}33`,
      marginTop: 6,
    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      paddingRight: 8,
      color: theme.colors.bordermain,
    }),
    clearIndicator: (base: any) => ({
      ...base,
      paddingRight: 6,
      color: theme.colors.subtext,
    }),
    placeholder: (base: any) => ({
      ...base,
      color: theme.colors.subtext,
      fontFamily: theme.fonts.cafe24,
      fontWeight: theme.Weights.normal,
      fontSize: theme.fontSizes.sm,
    }),
    singleValue: (base: any) => ({
      ...base,
      color: theme.colors.text,
      fontFamily: theme.fonts.cafe24,
      fontWeight: theme.Weights.medium,
      fontSize: theme.fontSizes.sm,
    }),
  };

  const DropdownIndicator = (props: any) => (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen
        ? <ChevronUp size={20} color={theme.colors.bordermain} />
        : <ChevronDown size={20} color={theme.colors.bordermain} />}
    </components.DropdownIndicator>
  );

  return (
    <div style={{ width: "100%", marginBottom: 12 }}>
      {label && (
        <div style={{
          fontWeight: theme.Weights.bold,
          marginBottom: 7,
          color: theme.colors.text,
          fontFamily: theme.fonts.cafe24,
          fontSize: theme.fontSizes.sm,
        }}>
          {labelKey ? t(labelKey) : label}
        </div>
      )}
      <Select
        options={options}
        value={selected}
        onChange={opt => onChange(opt?.value || "")}
        components={{ DropdownIndicator }}
        isClearable
        styles={customStyles}
        placeholder={t("common.select")}
      />
    </div>
  );
}