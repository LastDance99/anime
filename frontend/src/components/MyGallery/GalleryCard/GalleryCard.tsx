import React from "react";
import { Card, Thumbnail, Caption } from "./GalleryCard.styled";

type Props = {
  title: string;
  imageUrl: string;
  onClick?: () => void;
};

const GalleryCard: React.FC<Props> = ({ title, imageUrl, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Thumbnail src={imageUrl} alt={title} />
      <Caption>{title}</Caption>
    </Card>
  );
};

export default GalleryCard;