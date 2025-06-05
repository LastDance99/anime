import { Link } from "react-router-dom";
import {
  HeaderWrapper,
  HeaderInner,
  Logo,
  Nav,
  NavList,
  NavItem
} from "./ProfileHeader.styled";

export default function Header() {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <Logo src="/logos/mainlog.png" alt="AnTada 로고" />
        <Nav>
          <NavList>
            <NavItem as={Link} to='/profile:nickname'>프로필</NavItem>
            <NavItem as={Link} to='/mainpage'>전체 게시판</NavItem>
            <NavItem as={Link} to='/mainpage'>애니</NavItem>
          </NavList>
        </Nav>
      </HeaderInner>
    </HeaderWrapper>
  );
}