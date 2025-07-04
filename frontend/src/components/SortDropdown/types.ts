export type Option = {
  label: string;
  value: string;
};

export type SortDropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};