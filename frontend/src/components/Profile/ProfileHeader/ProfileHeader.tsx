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

export default function Header({ show = true }) {
  return (
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
        <Iconbox as={Link} to="*" >
          <GearIcon size={16} />
        </Iconbox>
        <BottomBtn>로그아웃</BottomBtn>
      </HeaderInner>
    </HeaderWrapper>
  );
}