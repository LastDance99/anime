import React from "react";
import Select, { components } from "react-select";
import { ChevronDown, ChevronUp } from "lucide-react";

const themeColors = {
  primary: "#FCEEF5",
  secondary: "#FFD1DC",
  bordermain: "#FFB2C6",
  subcolor: "#F0F8FF",
  text: "#222",
  subtext: "#999",
  background: "#fff",
};

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    borderRadius: "10px",
    minHeight: "38px",
    background: themeColors.background,
    borderColor: state.isFocused ? themeColors.bordermain : themeColors.secondary,
    boxShadow: state.isFocused ? `0 0 0 2px ${themeColors.bordermain}33` : "none",
    fontFamily: "'Cafe24 Ssurround', 'sans-serif'",
    fontWeight: 500,
    fontSize: "0.75rem",
    color: themeColors.text,
    "&:hover": { borderColor: themeColors.bordermain },
    transition: "box-shadow 0.15s, border-color 0.13s",
  }),
  option: (base: any, state: any) => ({
    ...base,
    background: state.isSelected
      ? themeColors.secondary
      : state.isFocused
      ? themeColors.primary
      : themeColors.background,
    color: themeColors.text,
    fontWeight: state.isSelected ? 700 : 500,
    fontFamily: "'Cafe24 Ssurround', 'sans-serif'",
    fontSize: "0.75rem",
    borderRadius: 6,
    cursor: "pointer",
    transition: "background 0.15s",
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: 12,
    background: themeColors.background,
    zIndex: 30,
    boxShadow: `0 6px 28px 0 ${themeColors.secondary}33`,
    marginTop: 6,
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    paddingRight: 8,
    color: themeColors.bordermain,
  }),
  clearIndicator: (base: any) => ({
    ...base,
    paddingRight: 6,
    color: themeColors.subtext,
  }),
  placeholder: (base: any) => ({
    ...base,
    color: themeColors.subtext,
    fontFamily: "'Cafe24 Ssurround', 'sans-serif'",
    fontWeight: 400,
    fontSize: "0.75rem",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: themeColors.text,
    fontFamily: "'Cafe24 Ssurround', 'sans-serif'",
    fontWeight: 500,
    fontSize: "0.75rem",
  }),
};

// 메뉴가 "열려있으면" 위 화살표, 닫혀있으면 아래 화살표!
const DropdownIndicator = (props: any) => {
  const { selectProps } = props;
  return (
    <components.DropdownIndicator {...props}>
      {selectProps.menuIsOpen
        ? <ChevronUp size={20} color={themeColors.bordermain} />
        : <ChevronDown size={20} color={themeColors.bordermain} />}
    </components.DropdownIndicator>
  );
};

type OptionType = { value: string; label: string };

type Props = {
  value: string;
  onChange: (v: string) => void;
  options: OptionType[];
  label?: string;
};

export default function FormatSelect({ value, onChange, options, label }: Props) {
  const selected = options.find(opt => opt.value === value) || null;

  return (
    <div style={{ width: "100%", marginBottom: 12 }}>
      {label && (
        <div style={{
          fontWeight: 700,
          marginBottom: 7,
          color: themeColors.text,
          fontFamily: "'Cafe24 Ssurround', 'sans-serif'",
          fontSize: "0.75rem",
        }}>
          {label}
        </div>
      )}
      <Select
        options={options}
        value={selected}
        onChange={opt => onChange(opt?.value || "")}
        components={{ DropdownIndicator }}
        isClearable
        styles={customStyles}
        theme={t => ({
          ...t,
          borderRadius: 10,
          colors: {
            ...t.colors,
            primary: themeColors.secondary,
            primary25: themeColors.primary,
            neutral0: themeColors.background,
            neutral20: themeColors.bordermain,
            neutral80: themeColors.text,
          },
        })}
        placeholder="선택"
      />
    </div>
  );
}