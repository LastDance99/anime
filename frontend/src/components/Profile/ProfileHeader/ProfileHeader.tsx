import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import type { User } from "../../../types/user"

type Props = {
  show?: boolean;
  user: User;
  setUser: (user: User) => void;
};

export default function Header({ show = true, user, setUser } : Props) {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <>
      <HeaderWrapper $show={show}>
        <HeaderInner>
          <Logo src="/logos/mainlog.png" alt="AnTada 로고" />
          <Nav>
            <NavList>
              <NavItem as={Link} to='/profile:nickname'>프로필</NavItem>
              <NavItem as={Link} to='/mainpage'>전체 게시판</NavItem>
              <NavItem as={Link} to='/mainpage'>애니</NavItem>
            </NavList>
          </Nav>
          <Iconbox onClick={() => setOpenSettings(true)} >
            <GearIcon size={16} />
          </Iconbox>
          <BottomBtn>로그아웃</BottomBtn>
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