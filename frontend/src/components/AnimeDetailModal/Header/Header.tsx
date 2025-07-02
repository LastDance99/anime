import React, { useState } from "react";
import { HeaderWrapper, BannerImage, CloseBtn } from "./Header.styled";
import { useTranslation } from "react-i18next";

type Props = {
  image_url?: string | null;
  onClose: () => void;
};

const DEFAULT_BANNER = ""; // 빈 이미지 또는 /images/transparent.png

export default function Header({ image_url, onClose }: Props) {
  const { t } = useTranslation();

  const valid =
    !!image_url &&
    typeof image_url === "string" &&
    image_url.trim() !== "" &&
    image_url !== "nan";

  const [showImage, setShowImage] = useState(valid);
  const [imgSrc, setImgSrc] = useState(valid ? image_url : DEFAULT_BANNER);

  const handleImgError = () => {
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
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#FCEEF5",
            borderRadius: "inherit",
          }}
        />
      )}
      <CloseBtn
        onClick={onClose}
        aria-label={t("common.close")}
        title={t("common.close")}
        type="button"
        tabIndex={0}
      >
        ×
      </CloseBtn>
    </HeaderWrapper>
  );
}