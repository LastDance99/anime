import styled from "styled-components";
import { Settings } from "lucide-react";
import { Heart } from "lucide-react";

export const ProfileCardWrapper = styled.section`
  width: 200px;
  height: 715px;
  background: #FCEEF5;
  border: 1px solid #FFB6C1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
`;

export const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 9999px;
  object-fit: cover;
  border: 1px solid #FFB6C1;
  margin-bottom: 10px;
`;

export const ProfileNameBox = styled.div`
  width: 180px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #FFB6C1;
`;

export const HeartAndName = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  padding-right: 24px;
`;


export const HeartIcon = styled(Heart)`
  padding-top: 2px;
  cursor: pointer;
  color: #ff6fbc;
  transition: transform 0.15s, fill 0.2s;

  &:hover {
    transform: scale(1.13);
    color: #c2185b;
  }
`;

export const UserName = styled.div`
  font-size: 20px;
  font-family: 'Cafe24Ssurround', sans-serif;
  color: #222;
  font-weight: 600;
`;

export const Email = styled.div`
  font-size: 12px;
  font-family: 'Quicksand', sans-serif;
  color: #999;
`;

export const LikeCount = styled.div`
  font-size: 12px;
  font-family: 'Cafe24SsurroundAir', sans-serif;
  color: #999;
  margin-top: 4px;
`;

export const IntroBox = styled.div`
  width: 180px;
  height: 140px;
  margin-top: 20px;
  padding: 0 10px 10px 10px;
  border-bottom: 1px solid #FFB6C1;
  font-family: 'UhBee mysen', sans-serif;
  font-size: 22px;
  color: #222;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const EditBtn = styled.button`
  position: absolute;
  right: 2px;
  top: -20px;
  font-size: 12px;
  color: #999;
  font-family: 'Quicksand', sans-serif;
`;

export const MenuBox = styled.nav`
  width: 180px;
  height: 160px;
  border-bottom: 1px solid #FFB6C1;
  margin-bottom: 8px;
  padding: 10px;
`;

export const MenuList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-family: 'UhBee mysen', sans-serif;
  color: #222;
  cursor: pointer;
`;

export const SectionTitle = styled.div`
  font-size: 14px;
  font-family: 'UhBee Se_hyun', sans-serif;
  color: #222;
  margin: 8px 0;
`;

export const PointBox = styled.div`
  width: 180px;
  height: 100px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-family: 'UhBee mysen', sans-serif;
  font-size: 22px;
  color: #222;
`;

export const PointText = styled.div`
  margin-bottom: 4p
`;

export const PointShopLink = styled.div`
  cursor: pointer;
  &:hover {
    color: #999;
    text-decoration: none;
  }
`;

export const SettingsBox = styled.div`
  width: 180px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 4px;
  margin-top: 4px;
`;

export const Iconbox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: background 0.15s;

  &:hover {
    background: #fff;
  }
`;

export const GearIcon = styled(Settings)`
  color: #222;
`;

export const BottomBtn = styled.button`
  width: 60px;
  height: 30px;
  background: none;
  border: none;
  font-size: 12px;
  font-family: 'Cafe24SsurroundAir', sans-serif;
  color: #222;
  cursor: pointer;
  &:hover {
    background: #fff;
  }
`;

