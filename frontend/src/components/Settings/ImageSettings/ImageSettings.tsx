import React, { useState } from "react";
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
import type { User } from "../../../types/user";

type Props = {
  user: User;
  setUser: (user: User) => void;
};

export default function ImageSettings({ user, setUser }: Props) {
  const [profileImg, setProfileImg] = useState<string>(user.profile_image ?? "");
  const [bgImg, setBgImg] = useState<string>(user.background_image ?? "");
  const [roomImg, setRoomImg] = useState<string>(user.myroom_image ?? "");

  const handleUpload = (
    type: "profile" | "background" | "myroom",
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (file: File) => {
    const url = URL.createObjectURL(file);
    setter(url);
    setUser({
      ...user,
      ...(type === "profile" && { profile_image: url }),
      ...(type === "background" && { background_image: url }),
      ...(type === "myroom" && { myroom_image: url }),
    });
  };

  const handleDelete = (
    type: "profile" | "background" | "myroom",
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => () => {
    setter("");
    setUser({
      ...user,
      ...(type === "profile" && { profile_image: "" }),
      ...(type === "background" && { background_image: "" }),
      ...(type === "myroom" && { myroom_image: "" }),
    });
  };

  return (
    <Section>
      <SubTitle>이미지 변경</SubTitle>
      <ImageRow>
        {/* 프로필 이미지 */}
        <ImageBox>
          <ImageLabel>프로필</ImageLabel>
          <StyledImage src={profileImg} alt="프로필 이미지" shape="circle" />
          <ButtonGroup>
            <ImageUploadButton onChange={handleUpload("profile", setProfileImg)} />
            <ActionButton onClick={handleDelete("profile", setProfileImg)}>삭제</ActionButton>
          </ButtonGroup>
        </ImageBox>

        {/* 배경 이미지 */}
        <ImageBox>
          <ImageLabel>배경 이미지</ImageLabel>
          <StyledImage src={bgImg} alt="배경 이미지" shape="rect" />
          <ButtonGroup>
            <ImageUploadButton onChange={handleUpload("background", setBgImg)} />
            <ActionButton onClick={handleDelete("background", setBgImg)}>삭제</ActionButton>
          </ButtonGroup>
        </ImageBox>

        {/* 마이룸 이미지 */}
        <ImageBox>
          <ImageLabel>마이룸</ImageLabel>
          <StyledImage src={roomImg} alt="마이룸 이미지" shape="square" />
          <ButtonGroup>
            <ImageUploadButton onChange={handleUpload("myroom", setRoomImg)} />
            <ActionButton onClick={handleDelete("myroom", setRoomImg)}>삭제</ActionButton>
          </ButtonGroup>
        </ImageBox>
      </ImageRow>
    </Section>
  );
}