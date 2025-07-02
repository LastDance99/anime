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
import { useTranslation } from "react-i18next";

interface Props {
  user: User;
}

const AnimeProfile: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();
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
    const confirmLogout = window.confirm(t("profile.logout_confirm"));
    if (!confirmLogout) return;

    try {
      await logout();
    } catch (err) {
      console.warn(t("profile.logout_failed"), err);
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
          <Font>{t("profile.point", { point: user.point ?? 0 })}</Font>
        </FontBox>
        <LogoutButton onClick={handleLogout}>{t("profile.logout")}</LogoutButton>
      </TopBox>
      <BottomBox>
        <FontBox style={{ borderRight: "1px solid #FFB6C1", width: "40%" }}>
          <FontRow>
            <Font>{t("profile.attendance")}:</Font>
            {animeData.attendance_count}{t("profile.day_unit")}
          </FontRow>
          <FontRow>
            <Font>{t("profile.list")}:</Font>
            {animeData.animelist_count}{t("profile.item_unit")}
          </FontRow>
          <FontRow>
            <Font>{t("profile.review")}:</Font>
            {animeData.review_count}{t("profile.item_unit")}
          </FontRow>
        </FontBox>
        <CustomButton onClick={() => navigate(`/profile/${user.id}/myanilist`)}>
          {t("profile.view_list")}
        </CustomButton>
      </BottomBox>
    </Card>
  );
};

export default AnimeProfile;