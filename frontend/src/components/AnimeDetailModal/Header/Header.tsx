import React, { useState } from "react";
import { HeaderWrapper, BannerImage, CloseBtn } from "./Header.styled";

type Props = {
  image_url?: string | null;
  onClose: () => void;
};

const DEFAULT_BANNER = "/images/no_banner.png";

export default function Header({ image_url, onClose }: Props) {
  const valid =
    !!image_url &&
    typeof image_url === "string" &&
    image_url.trim() !== "" &&
    image_url !== "nan";

  const [imgSrc, setImgSrc] = useState(valid ? image_url : DEFAULT_BANNER);

  const handleImgError = () => {
    if (imgSrc !== DEFAULT_BANNER) {
      setImgSrc(DEFAULT_BANNER);
    }
  };

  return (
    <HeaderWrapper>
      <BannerImage
        src={imgSrc}
        alt={valid ? "애니 배너" : "배너 없음"}
        onError={handleImgError}
        draggable={false}
      />
      <CloseBtn
        onClick={onClose}
        aria-label="닫기"
        title="닫기"
        type="button"
        tabIndex={0}
      >
        ×
      </CloseBtn>
    </HeaderWrapper>
  );
}