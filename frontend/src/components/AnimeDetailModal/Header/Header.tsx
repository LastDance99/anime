import React from "react";
import { HeaderWrapper, BannerImage, CloseBtn  } from "./Header.styled";

type Props = {
  image_url: string;
  onClose: () => void;
};

export default function Header({ image_url, onClose }: Props) {
  return (
    <HeaderWrapper>
      <BannerImage src={image_url} alt="배너" />
      <CloseBtn onClick={onClose}>×</CloseBtn>
    </HeaderWrapper>
  );
}
