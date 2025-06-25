import React, { useState } from "react";
import { HeaderWrapper, BannerImage, CloseBtn } from "./Header.styled";

type Props = {
  image_url?: string | null;
  onClose: () => void;
};

const DEFAULT_BANNER = ""; // 완전 빈 이미지 (또는 /images/transparent.png 처럼 투명 PNG)

export default function Header({ image_url, onClose }: Props) {
  const valid =
    !!image_url &&
    typeof image_url === "string" &&
    image_url.trim() !== "" &&
    image_url !== "nan";

  const [showImage, setShowImage] = useState(valid); // 이미지 유효 여부
  const [imgSrc, setImgSrc] = useState(valid ? image_url : DEFAULT_BANNER);

  const handleImgError = () => {
    // 에러 나면 이미지 자체를 안 보여줌!
    setShowImage(false);
  };

  return (
    <HeaderWrapper>
      {showImage ? (
        <BannerImage
          src={imgSrc}
          alt=""
          onError={handleImgError}
          draggable={false}
        />
      ) : (
        // 이미지 없을 때 배경만 깔끔하게
        <div style={{
          width: "100%",
          height: "100%",
          background: "#FCEEF5", // 필요에 따라 색상 지정
          borderRadius: "inherit",
        }} />
      )}
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