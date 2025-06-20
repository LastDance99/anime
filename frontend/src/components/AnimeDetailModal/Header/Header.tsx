import React from "react";
import { HeaderWrapper, BannerImage, CloseBtn } from "./Header.styled";

type Props = {
  image_url?: string | null;
  onClose: () => void;
};

const DEFAULT_BANNER = "/images/no_banner.png";

export default function Header({ image_url, onClose }: Props) {
  // "nan" 또는 undefined/null/빈값 처리
  const hasBanner =
    !!image_url &&
    typeof image_url === "string" &&
    image_url.trim() !== "" &&
    image_url !== "nan";

  // 상태 없이 직접 src를 세팅
  const bannerSrc = hasBanner ? image_url! : DEFAULT_BANNER;

  // onError로 이미지 실패시 대체 (만약 CDN 문제/죽은 링크 등)
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.src !== DEFAULT_BANNER) {
      e.currentTarget.src = DEFAULT_BANNER;
    }
  };

  // 확인용 로그
  console.log("Header bannerSrc:", bannerSrc);

  return (
    <HeaderWrapper>
      <BannerImage
        src={bannerSrc}
        alt={hasBanner ? "애니 배너" : "배너 없음"}
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