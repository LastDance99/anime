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
import type { TempUser } from "../../../types/user";

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

  const handleUpload = (
    type: "profile" | "background" | "myroom",
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (file: File) => {
    const url = URL.createObjectURL(file);
    setter(url); // 미리보기용

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