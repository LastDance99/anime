import React, { useState, useEffect } from "react";
import {
  Section,
  SubTitle,
  ImageRow,
  ImageBox,
  ImageLabel,
  StyledImage,
  ButtonGroup,
  ActionButton,
} from "./ImageSettings.styled";
import ImageUploadButton from "./ImageUploadButton";
import type { TempUser } from "../../../types/user";
import { useTranslation } from "react-i18next";

const DEFAULT_PROFILE_IMG = import.meta.env.VITE_DEFAULT_PROFILE_IMG;
const DEFAULT_BG_IMG = import.meta.env.VITE_DEFAULT_BG_IMG;
const DEFAULT_ROOM_IMG = import.meta.env.VITE_DEFAULT_ROOM_IMG;

type Props = {
  user: TempUser;
  setUser: (user: TempUser) => void;
  setProfileFile: (file: File | null) => void;
  setBgFile: (file: File | null) => void;
  setRoomFile: (file: File | null) => void;
};

export default function ImageSettings({
  user,
  setUser,
  setProfileFile,
  setBgFile,
  setRoomFile,
}: Props) {
  const [profileImg, setProfileImg] = useState<string>(
    typeof user.profile_image === "string" ? user.profile_image : ""
  );
  const [bgImg, setBgImg] = useState<string>(
    typeof user.background_image === "string" ? user.background_image : ""
  );
  const [roomImg, setRoomImg] = useState<string>(
    typeof user.myroom_image === "string" ? user.myroom_image : ""
  );
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof user.profile_image === "string") {
      setProfileImg(user.profile_image);
    }
  }, [user.profile_image]);

  useEffect(() => {
    if (typeof user.background_image === "string") {
      setBgImg(user.background_image);
    }
  }, [user.background_image]);

  useEffect(() => {
    if (typeof user.myroom_image === "string") {
      setRoomImg(user.myroom_image);
    }
  }, [user.myroom_image]);

  const handleUpload = (
    type: "profile" | "background" | "myroom",
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (file: File) => {
    const url = URL.createObjectURL(file);
    setter(url);

    if (type === "profile") setProfileFile(file);
    if (type === "background") setBgFile(file);
    if (type === "myroom") setRoomFile(file);

    setUser({
      ...user,
      ...(type === "profile" && { profile_image: file }),
      ...(type === "background" && { background_image: file }),
      ...(type === "myroom" && { myroom_image: file }),
    });
  };

  
  const handleDelete = (
    type: "profile" | "background" | "myroom",
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => () => {
    setter("");

    if (type === "profile") setProfileFile(null);
    if (type === "background") setBgFile(null);
    if (type === "myroom") setRoomFile(null);

    setUser({
      ...user,
      ...(type === "profile" && { profile_image: null }),
      ...(type === "background" && { background_image: null }),
      ...(type === "myroom" && { myroom_image: null }),
    });
  };

  return (
    <Section>
      <SubTitle>이미지 변경</SubTitle>
      <ImageRow>
        {/* 프로필 이미지 */}
        <ImageBox>
          <ImageLabel>{t("image_settings.profile")}</ImageLabel>
          <StyledImage src={profileImg || DEFAULT_PROFILE_IMG} alt="프로필 이미지" shape="circle" />
          <ButtonGroup>
            <ImageUploadButton onChange={handleUpload("profile", setProfileImg)} />
            <ActionButton onClick={handleDelete("profile", setProfileImg)}>
              {t("image_settings.delete")}
            </ActionButton>
          </ButtonGroup>
        </ImageBox>

        {/* 배경 이미지 */}
        <ImageBox>
          <ImageLabel>{t("image_settings.background")}</ImageLabel>
          <StyledImage src={bgImg || DEFAULT_BG_IMG} alt="배경 이미지" shape="rect" />
          <ButtonGroup>
            <ImageUploadButton onChange={handleUpload("background", setBgImg)} />
            <ActionButton onClick={handleDelete("background", setBgImg)}>
              {t("image_settings.delete")}
            </ActionButton>
          </ButtonGroup>
        </ImageBox>

        {/* 마이룸 이미지 */}
        <ImageBox>
          <ImageLabel>{t("image_settings.myroom")}</ImageLabel>
          <StyledImage src={roomImg || DEFAULT_ROOM_IMG} alt="마이룸 이미지" shape="square" />
          <ButtonGroup>
            <ImageUploadButton onChange={handleUpload("myroom", setRoomImg)} />
            <ActionButton onClick={handleDelete("myroom", setRoomImg)}>
              {t("image_settings.delete")}
            </ActionButton>
          </ButtonGroup>
        </ImageBox>
      </ImageRow>
    </Section>
  );
}