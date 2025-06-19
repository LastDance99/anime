import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  HeaderWrapper,
  HeaderInner,
  Logo,
  Nav,
  NavList,
  NavItem
} from "./MainHeader.styled";

export default function Header({ show = true }) {
  const { currentUser } = useAuth();

  return (
    <HeaderWrapper $show={show}>
      <HeaderInner>
        <Logo src="/logos/sublog.png" alt="AnTada 로고" />
        <Nav>
          <NavList>
            {currentUser && (
              <NavItem as={Link} to={`/profile/${currentUser.id}`}>
                프로필
              </NavItem>
            )}
            <NavItem as={Link} to="/board">전체 게시판</NavItem>
            <NavItem as={Link} to="/anime">애니</NavItem>
          </NavList>
        </Nav>
      </HeaderInner>
    </HeaderWrapper>
  );
}