import React, { useState } from "react";
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
import SettingsModal from "../../Settings/SettingsModal";
import type { User } from "../../../types/user";
import { logout } from "../../../api/auth";
import { useAuth } from "../../../contexts/AuthContext";

type Props = {
  show?: boolean;
  user: User;
  setUser: (user: User) => void;
};

export default function Header({ show = true, user, setUser }: Props) {
  const [openSettings, setOpenSettings] = useState(false);
  const navigate = useNavigate();
  const { logout: clearAuth, currentUser  } = useAuth(); // AuthContext의 logout 사용

  const handleLogout = async () => {
    console.log("🔔 로그아웃 버튼 클릭됨");

    try {
      await logout(); // 로그 출력 포함
    } catch (err) {
      console.warn("서버 로그아웃 실패 (무시 가능)", err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      clearAuth();
      console.log("🧼 클라이언트 토큰 제거 & AuthContext 초기화");
      navigate("/login");
    }
  };

  return (
    <>
      <HeaderWrapper $show={show}>
        <HeaderInner>
          <Logo src="/logos/mainlog.png" alt="AnTada 로고" />
          <Nav>
            <NavList>
              <NavItem as={Link} to={`/profile/${currentUser?.id}`}>프로필</NavItem>
              <NavItem as={Link} to="/board">전체 게시판</NavItem>
              <NavItem as={Link} to="/anime">애니</NavItem>
            </NavList>
          </Nav>
          <Iconbox onClick={() => setOpenSettings(true)}>
            <GearIcon size={16} />
          </Iconbox>
          <BottomBtn onClick={handleLogout}>로그아웃</BottomBtn>
        </HeaderInner>
      </HeaderWrapper>

      {openSettings && (
        <SettingsModal
          user={user}
          setUser={setUser}
          onClose={() => setOpenSettings(false)}
        />
      )}
    </>
  );
}