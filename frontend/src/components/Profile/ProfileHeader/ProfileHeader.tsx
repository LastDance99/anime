import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeaderWrapper,
  HeaderInner,
  Logo,
  Nav,
  NavList,
  NavItem,
  GearIcon,
  BottomBtn,
  Iconbox,
} from "./ProfileHeader.styled";
import type { User } from "../../../types/user";
import { logout } from "../../../api/auth";
import { useAuth } from "../../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

type Props = {
  show?: boolean;
  isScrolled: boolean;
  user: User;
  setUser: (user: User) => void;
  onOpenSettings: () => void;
};

export default function Header({ show = true, isScrolled, user, setUser, onOpenSettings }: Props) {
  const navigate = useNavigate();
  const { logout: clearAuth, currentUser } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.warn("서버 로그아웃 실패 (무시 가능)", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      clearAuth();
      navigate("/login");
    }
  };

  return (
    <HeaderWrapper $show={show} $scrolled={isScrolled}>
      <HeaderInner>
        <Logo src="/logos/mainlog.png" alt="AnTada 로고" />
        <Nav>
          <NavList>
            <NavItem as={Link} to={`/profile/${currentUser?.id}`}>
              {t("nav.profile")}
            </NavItem>
            <NavItem as={Link} to="/board">
              {t("nav.board")}
            </NavItem>
            <NavItem as={Link} to="/anime">
              {t("nav.anime")}
            </NavItem>
          </NavList>
        </Nav>
        <Iconbox onClick={onOpenSettings}>
          <GearIcon size={16} />
        </Iconbox>
        <BottomBtn onClick={handleLogout}>{t("nav.logout")}</BottomBtn>
      </HeaderInner>
    </HeaderWrapper>
  );
}