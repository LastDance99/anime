import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Avatar,
  Name,
  Email,
  LogoutButton,
  BottomBox,
  TopBox,
  FontBox,
  Font,
  FontRow,
  CustomButton,
} from "./ProfileCard.styled";
import type { User } from "../../../types/user";
import { getFullImageUrl } from "../../../utils/getFullImageUrl";
import { useAuth } from "../../../contexts/AuthContext";
import { logout } from "../../../api/auth";
import { animeProfileInfo } from "../../../api/anime";

interface Props {
  user: User;
}

const AnimeProfile: React.FC<Props> = ({ user }) => {
  const [isImageError, setImageError] = useState(false);
  const [animeData, setAnimeData] = useState({
    animelist_count: 0,
    review_count: 0,
    attendance_count: 0,
  });

  const profileImage = getFullImageUrl(user.profile_image);
  const navigate = useNavigate();
  const { logout: clearAuth } = useAuth();

  useEffect(() => {
    animeProfileInfo().then(setAnimeData).catch(console.error);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.warn("서버 로그아웃 실패", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      clearAuth();
      navigate("/login");
    }
  };

  return (
    <Card>
      <TopBox>
        <Avatar>
          {user.profile_image && !isImageError ? (
            <img
              src={profileImage}
              alt={user.nickname}
              style={{ width: 80, height: 80, borderRadius: "50%" }}
              onError={() => setImageError(true)}
            />
          ) : (
            <span style={{ fontSize: 32 }}>{user.nickname?.charAt(0) || "?"}</span>
          )}
        </Avatar>
        <FontBox>
          <Name>{user.nickname}</Name>
          <Email>{user.email}</Email>
          <Font>포인트: {user.point ?? 0}</Font>
        </FontBox>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </TopBox>
      <BottomBox>
        <FontBox style={{ borderRight: "1px solid #FFB6C1", width: "40%" }}>
          <FontRow>
            <Font>출석일:</Font>
            {animeData.attendance_count}일
          </FontRow>
          <FontRow>
            <Font>내가 리스트:</Font>
            {animeData.animelist_count}개
          </FontRow>
          <FontRow>
            <Font>내가 쓴 리뷰:</Font>
            {animeData.review_count}개
          </FontRow>
        </FontBox>
        <CustomButton>내 리스트</CustomButton>
      </BottomBox>
    </Card>
  );
};

export default AnimeProfile;