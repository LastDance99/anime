import React from "react";
import {
  ProfileSectionWrapper,
  ShadowOverlay,
  ProfileBackgroundImg,
  ProfileFloatingCard,
  CharacterImgBox,
  RowBox,
  CharacterImg,
  UserName,
} from "./ProfileSection.styled";

import type { ProfileCardProps } from "../../../types/user";
import { getFullImageUrl } from "../../../utils/getFullImageUrl"; // 경로 맞게 조정

const ProfileSection: React.FC<ProfileCardProps> = ({ user }) => {
  console.log("ProfileSection user", user);

  return (
    <ProfileSectionWrapper>
      <ShadowOverlay />
      <ProfileBackgroundImg
        src={
          user.background_image
            ? getFullImageUrl(user.background_image)
            : "/images/default-bg.png"
        }
        alt="프로필 배경"
      />
      <ProfileFloatingCard>
        <RowBox>
          <CharacterImgBox>
            <CharacterImg
              src={
                user.profile_image
                  ? getFullImageUrl(user.profile_image)
                  : "/images/default-profile.png"
              }
              alt="프로필"
            />
          </CharacterImgBox>
          <UserName>
            {user.nickname}
          </UserName>
        </RowBox>
      </ProfileFloatingCard>
    </ProfileSectionWrapper>
  );
};

export default ProfileSection;