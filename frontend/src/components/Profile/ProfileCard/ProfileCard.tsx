import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ProfileCardWrapper,
  ProfileImage,
  ProfileNameBox,
  HeartAndName,
  HeartIcon,
  UserName,
  Email,
  LikeCount,
  IntroBox,
  EditBtn,
  MenuBox,
  MenuList,
  MenuItem,
  SectionTitle,
  PointBox,
  PointText,
  SettingsBox,
  GearIcon,
  BottomBtn,
  PointShopLink,
  Iconbox,
} from "./ProfileCard.styled";
import type { ProfileCardProps }  from "../../../types/user"; // User 타입 정의가 필요합니다.


const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const [editIntro, setEditIntro] = useState(false);
  const [liked, setLiked] = useState(false);
  const [intro, setIntro] = useState(user.intro || "");


  return (
    <ProfileCardWrapper>
      <ProfileImage src={user.avatar} alt="프로필 이미지" />
      <ProfileNameBox>
        <HeartAndName>
          <HeartIcon
            size={22}
            fill={liked ? "#ff6fbc" : "none"}
            strokeWidth={2}
            onClick={() => setLiked(liked => !liked)}
            aria-label="좋아요"
            role="button"
          />
          <UserName>{user.name}</UserName>
        </HeartAndName>
        <Email>{user.email}</Email>
        <LikeCount>받은 좋아요: {user.likes}</LikeCount>
      </ProfileNameBox>
      <IntroBox>
        {editIntro ? (
          <>
            <textarea
              value={intro}
              onChange={e => setIntro(e.target.value)}
              maxLength={60}
              style={{
                width: "100%",
                height: "100px",
                fontFamily: "UhBee mysen",
                fontSize: "20px",
                color: "#222",
                border: "none",
                resize: "none",
                background: "transparent"
              }}
            />
            <div style={{fontSize: 16, color: "#555", textAlign: "right"}}>
              {intro.length} / 60
            </div>
            <EditBtn onClick={() => setEditIntro(false)}>저장</EditBtn>
          </>
        ) : (
          <>
            {intro || "자기소개를 입력해보세요."}
            <EditBtn onClick={() => setEditIntro(true)}>수정</EditBtn>
          </>
        )}
      </IntroBox>
      <MenuBox>
        <MenuList>
          <SectionTitle>목록</SectionTitle>
          <MenuItem as={Link} to='*'>게시글</MenuItem>
          <MenuItem as={Link} to='*'>갤러리</MenuItem>
          <MenuItem as={Link} to='*'>애니리스트</MenuItem>
        </MenuList>
      </MenuBox>
      <PointBox>
        <PointText>포인트: {user.points}</PointText>
        <PointShopLink>포인트 상점</PointShopLink>
      </PointBox>
      <SettingsBox>
        <Iconbox as={Link} to="*" >
          <GearIcon size={16} />
        </Iconbox>
        <BottomBtn>울집으로</BottomBtn>
        <BottomBtn>로그아웃</BottomBtn>
      </SettingsBox>
    </ProfileCardWrapper>
  );
};

export default ProfileCard;
