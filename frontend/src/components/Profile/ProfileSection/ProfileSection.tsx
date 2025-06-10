import React, { useState } from "react";
import {
  ProfileSectionWrapper,
  ShadowOverlay,
  ProfileBackgroundImg,
  ProfileFloatingCard,
  // HeartIconBox,
  // HeartIcon,
  CharacterImgBox,
  RowBox,
  CharacterImg,
  UserName,
} from "./ProfileSection.styled";

import type { ProfileCardProps } from "../../../types/user";

const ProfileSection: React.FC<ProfileCardProps> = ({ user }) => {
  // const [liked, setLiked] = useState(false);

  return (
    <ProfileSectionWrapper>
      <ShadowOverlay />
      <ProfileBackgroundImg src={user.background_image} alt="프로필 배경" />
      <ProfileFloatingCard>
        <RowBox>
          <CharacterImgBox>
            <CharacterImg src={user.profile_image} alt="프로필" />
          </CharacterImgBox>
          <UserName>
              {user.nickname}
              {/* 팔로우 기능 추후 추가 예정 */}
              {/* <HeartIconBox>
                <HeartIcon
                  size={20}
                  fill={liked ? "#ff6fbc" : "none"}
                  strokeWidth={2}
                  onClick={() => setLiked(liked => !liked)}
                  aria-label="좋아요"
                  role="button"
                />
              </HeartIconBox> */} 
            </UserName>
        </RowBox>
      </ProfileFloatingCard>
    </ProfileSectionWrapper>
  );
};

export default ProfileSection;