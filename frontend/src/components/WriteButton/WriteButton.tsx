import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./WriteButton.styled";
import type { ReactNode, CSSProperties } from "react";

type Props = {
  to?: string; // ← 새롭게 추가
  children?: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
};

const WriteButton: React.FC<Props> = ({
  to = "/board/write?type=post", // 기본값
  children = "글쓰기",
  style,
  onClick,
}) => {
  return (
    <Link to={to} onClick={onClick}>
      <Button style={style}>{children}</Button>
    </Link>
  );
};

export default WriteButton;