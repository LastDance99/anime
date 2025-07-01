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

type Props = {
  show?: boolean;
  isScrolled: boolean;
  user: User;
  setUser: (user: User) => void;
  onOpenSettings: () => void; // ★ 추가!
};

export default function Header({ show = true, isScrolled, user, setUser, onOpenSettings }: Props) {
  const navigate = useNavigate();
  const { logout: clearAuth, currentUser } = useAuth();

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
    <>
      <HeaderWrapper $show={show} $scrolled={isScrolled}>
        <HeaderInner>
          <Logo src="/logos/mainlog.png" alt="AnTada 로고" />
          <Nav>
            <NavList>
              <NavItem as={Link} to={`/profile/${currentUser?.id}`}>프로필</NavItem>
              <NavItem as={Link} to="/board">전체 게시판</NavItem>
              <NavItem as={Link} to="/anime">애니</NavItem>
            </NavList>
          </Nav>
          {/* 설정(톱니) 아이콘 클릭 → 트리거 함수 호출 */}
          <Iconbox onClick={onOpenSettings}>
            <GearIcon size={16} />
          </Iconbox>
          <BottomBtn onClick={handleLogout}>로그아웃</BottomBtn>
        </HeaderInner>
      </HeaderWrapper>
    </>
  );
}