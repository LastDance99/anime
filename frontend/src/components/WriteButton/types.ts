import type { ReactNode, CSSProperties } from "react";

export type WriteButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
};