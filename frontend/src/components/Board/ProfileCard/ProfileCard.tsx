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
import { logout } from "../../../api/auth";
import { getFullImageUrl } from "../../../utils/getFullImageUrl";
import { useAuth } from "../../../contexts/AuthContext";
import { boardsProfileInfo } from "../../../api/board";
import { useTranslation } from "react-i18next";

interface Props {
  user: User;
}

const BoardProfile: React.FC<Props> = ({ user }) => {
  const [isImageError, setImageError] = useState(false);
  const [boardData, setBoardData] = useState({
    post_count: 0,
    comment_count: 0,
    attendance_count: 0,
  });

  const navigate = useNavigate();
  const profileImage = getFullImageUrl(user.profile_image);
  const { logout: clearAuth } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    boardsProfileInfo().then(setBoardData).catch(console.error);
  }, []);

  const handleLogout = async () => {
    const confirm = window.confirm(t("profile.confirm_logout"));
    if (!confirm) return;

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

  const handleClick = () => {
    navigate("/board/write?type=post");
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
          <Font>
            {t("profile.point", { point: user.point ?? 0 })}
          </Font>
        </FontBox>
        <LogoutButton onClick={handleLogout}>{t("profile.logout")}</LogoutButton>
      </TopBox>

      <BottomBox>
        <FontBox style={{ borderRight: "1px solid #FFB6C1", width: "60%" }}>
          <FontRow>
            <Font>{t("profile.attendance")}:</Font>
            {boardData.attendance_count}
            {/* {t("profile.unit_day")} */}
          </FontRow>
          <FontRow>
            <Font>{t("profile.my_posts")}:</Font>
            {boardData.post_count}
            {/* {t("profile.unit_count")} */}
          </FontRow>
          <FontRow>
            <Font>{t("profile.my_comments")}:</Font>
            {boardData.comment_count}
            {/* {t("profile.unit_count")} */}
          </FontRow>
        </FontBox>
        <CustomButton onClick={handleClick}>{t("profile.write")}</CustomButton>
      </BottomBox>
    </Card>
  );
};

export default BoardProfile;