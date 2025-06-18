import styled from "styled-components";
// import { Heart } from "lucide-react";

export const ProfileSectionWrapper = styled.section`
  position: relative;
  width: 100%;
  height: 320px;
`;

export const ProfileBackgroundImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const ShadowOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 55px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  pointer-events: none;
`;

export const ProfileFloatingCard = styled.div`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  pointer-events: none;
`;

export const RowBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
`;

export const CharacterImgBox = styled.div`
  display: inline-block;
`;

export const CharacterImg = styled.img`
  width: 145px;
  height: 160px;
  object-fit: cover;
  display: block;
`;

// export const HeartIconBox = styled.div`
//   margin-left: 6px;
//   margin-bottom: -4px;
// `;

// export const HeartIcon = styled(Heart)`
//   cursor: pointer;
//   color: ${({ theme }) => theme.colors.bordermain};
//   pointer-events: auto;
//   transition: transform 0.15s, fill 0.2s;

//   &:hover {
//     transform: scale(1.13);
//     color: #c2185b;
//   }
// `;

export const UserName = styled.div`
  position: absolute;
  left: 100%;
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: ${({ theme }) => theme.colors.background};
  white-space: nowrap;
`;