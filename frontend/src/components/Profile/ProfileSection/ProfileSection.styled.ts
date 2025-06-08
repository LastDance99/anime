// components/ProfileSection/ProfileSection.styled.ts
import styled from "styled-components";
import { Heart } from "lucide-react";

export const ProfileSectionWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 320px;           /* 배경 이미지 높이 */
`;

export const ProfileBackgroundImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const ProfileFloatingCard = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;    /* 아래로 띄워서 배경과 겹치게 */
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  pointer-events: none;
`;

export const HeartIcon = styled(Heart)`
  cursor: pointer;
  color: #ff6fbc;
  transition: transform 0.15s, fill 0.2s;

  &:hover {
    transform: scale(1.13);
    color: #c2185b;
  }
`;

export const RowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

export const CharacterImgBox = styled.div`
  position: relative;
  display: inline-block;
`;

export const HeartIconBox = styled.div`
  position: absolute;
  left: 52%;
  top: -30px;
  transform: translateX(-50%);
  z-index: 2;
  pointer-events: auto;
`;

export const CharacterImg = styled.img`
  width: 145px;
  height: 160px;
  object-fit: cover;
  display: block;
`;

export const UserName = styled.div`
  position: absolute;
  left: 100%;
  bottom: 0px;
  margin-left: 10px;
  font-size: 20px;
  color: #fff;
  text-shadow: 2px 2px 6px #222;
  white-space: nowrap;
`;
