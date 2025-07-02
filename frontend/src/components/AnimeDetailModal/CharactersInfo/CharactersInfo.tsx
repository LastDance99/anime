import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { CharactersWrapper, CharacterCard, CharacterImage } from "./CharactersInfo.styled";
import "swiper/css";
import { useTranslation } from "react-i18next";

interface Props {
  characters: string[];
}

export default function CharactersInfo({ characters }: Props) {
  const { t } = useTranslation();

  if (!characters || characters.length === 0) return null;

  return (
    <CharactersWrapper>
      <h3>{t("anime.characters")}</h3>
      <Swiper spaceBetween={12} slidesPerView="auto">
        {characters
          .filter(
            (img) =>
              typeof img === "string" &&
              img.trim() !== "" &&
              !img.includes("default.jpg")
          )
          .map((imageUrl, index) => (
            <SwiperSlide key={index} style={{ width: 80 }}>
              <CharacterCard>
                <CharacterImage src={imageUrl} alt={`character-${index}`} />
              </CharacterCard>
            </SwiperSlide>
        ))}
      </Swiper>
    </CharactersWrapper>
  );
}