import React, { useState } from "react";
import {
  ProfileSectionWrapper,
  ProfileBackgroundImg,
  ProfileFloatingCard,
  HeartIconBox,
  HeartIcon,
  CharacterImgBox,
  RowBox,
  CharacterImg,
  UserName,
} from "./ProfileSection.styled";

import type { ProfileCardProps } from "../../../types/user";

const ProfileSection: React.FC<ProfileCardProps> = ({ user }) => {
  const [liked, setLiked] = useState(false);

  return (
    <ProfileSectionWrapper>
      <ProfileBackgroundImg src={user.backimg} alt="프로필 배경" />
      <ProfileFloatingCard>
        <RowBox>
          <CharacterImgBox>
            <HeartIconBox>
              <HeartIcon
                size={30}
                fill={liked ? "#ff6fbc" : "none"}
                strokeWidth={2}
                onClick={() => setLiked(liked => !liked)}
                aria-label="좋아요"
                role="button"
              />
            </HeartIconBox>
            <CharacterImg src={user.avatar} alt="프로필" />
            <UserName>{user.name}</UserName>
          </CharacterImgBox>
        </RowBox>
      </ProfileFloatingCard>
    </ProfileSectionWrapper>
  );
};

export default ProfileSection;