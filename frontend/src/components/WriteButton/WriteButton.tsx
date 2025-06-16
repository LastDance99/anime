import React from "react";
import { Button } from "./WriteButton.styled";
import type { ReactNode, CSSProperties } from "react";

export type WriteButtonProps = {
  onClick?: () => void;
  children?: ReactNode;
  style?: CSSProperties;
};

const WriteButton: React.FC<WriteButtonProps> = ({
  onClick,
  children = "글쓰기",
  style,
}) => (
  <Button onClick={onClick} style={style}>
    {children}
  </Button>
);

export default WriteButton;