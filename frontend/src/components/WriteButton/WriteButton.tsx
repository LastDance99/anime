import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./WriteButton.styled";
import type { ReactNode, CSSProperties } from "react";
import { useTranslation } from "react-i18next"; // ✅ i18n 훅 추가

type Props = {
  to?: string;
  children?: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
};

const WriteButton: React.FC<Props> = ({
  to = "/board/write?type=post",
  children,
  style,
  onClick,
}) => {
  const { t } = useTranslation(); // ✅ 훅 사용

  return (
    <Link to={to} onClick={onClick}>
      <Button style={style}>
        {children ?? t("common.write")} {/* ✅ 다국어 처리 */}
      </Button>
    </Link>
  );
};

export default WriteButton;