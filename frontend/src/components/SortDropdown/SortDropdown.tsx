import React from "react";
import { Dropdown, Select } from "./SortDropdown.styled";
import { ArrowUpDown } from "lucide-react";
import type { SortDropdownProps } from "./types";


const SortDropdown: React.FC<SortDropdownProps> = ({ options, value, onChange }) => (
  <Dropdown>
    <Select value={value} onChange={e => onChange(e.target.value)}>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </Select>
    <ArrowUpDown size={12} stroke="#222" style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)" }} />
  </Dropdown>
);

export default SortDropdown;
