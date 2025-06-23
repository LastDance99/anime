import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Box,
  Input,
  InputWrapper,
  PasswordWrapper,
  IconButton,
  KeepLogin,
  LoginButton,
  LinkArea,
  CheckIcon,
  UncheckIcon,
  Logo,
  SubBox,
  LanguageContainer,
  LanguageSelected,
  LanguageDropdown,
  LanguageItem,
  StyledLink,
} from "./Login.styled";
import { Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import { login } from "../../api/auth";
import { getMyProfile } from "../../api/profile";
import { useAuth } from "../../contexts/AuthContext";
import { setAccessToken, setRefreshToken } from "../../utils/token";

const languages = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
];

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  const [showPw, setShowPw] = useState(false);
  const [keepLogin, setKeepLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("ko");
  const [error, setError] = useState("");

  const handleSelect = (code: string) => {
    setLang(code);
    setOpen(false);
  };

  const selectedLabel = languages.find((l) => l.code === lang)?.label || "";

  const { login: loginToContext } = useAuth();

  const handleLogin = async () => {
    setError("");
    try {
      const res = await login({ email, password: pw });
      const { access, refresh } = res;

      // ✅ keepLogin 상태에 따라 저장 위치 결정
      setAccessToken(access, keepLogin);
      setRefreshToken(refresh);

      const userInfo = await getMyProfile();
      loginToContext(userInfo);
      navigate(`/profile/${userInfo.id}`);
    } catch (err: any) {
      // ...
    }
  };

  return (
    <Container>
      <Box>
        <Link to="/">
          <Logo src="/logos/mainlog.png" alt="AnTada 로고" />
        </Link>
        <SubBox>
          <LanguageContainer>
            <LanguageSelected onClick={() => setOpen((v) => !v)}>
              {selectedLabel}
              {open ? <ChevronUp size={14} style={{ marginLeft: "6px" }} /> : <ChevronDown size={14} style={{ marginLeft: "6px" }} />}
            </LanguageSelected>
            {open && (
              <LanguageDropdown>
                {languages.map(
                  (l) =>
                    l.code !== lang && (
                      <LanguageItem key={l.code} onClick={() => handleSelect(l.code)}>
                        {l.label}
                      </LanguageItem>
                    )
                )}
              </LanguageDropdown>
            )}
          </LanguageContainer>

          <InputWrapper>
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </InputWrapper>

          <InputWrapper>
            <PasswordWrapper>
              <Input
                type={showPw ? "text" : "password"}
                placeholder="비밀번호"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                autoComplete="current-password"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <IconButton onClick={() => setShowPw((v) => !v)}>
                {showPw ? <EyeOff size={18} color="#555" /> : <Eye size={18} color="#555" />}
              </IconButton>
            </PasswordWrapper>
          </InputWrapper>

          <KeepLogin onClick={() => setKeepLogin((v) => !v)}>
            {keepLogin ? (
              <CheckIcon size={16} color="#ffb6c1" />
            ) : (
              <UncheckIcon size={16} color="#ffb6c1" />
            )}
            로그인 상태 유지
          </KeepLogin>

          <LoginButton onClick={handleLogin}>로그인</LoginButton>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </SubBox>

        <LinkArea>
          <StyledLink to="/reset-password">비밀번호 찾기</StyledLink>
          <span>|</span>
          <StyledLink to="/signup">회원가입</StyledLink>
        </LinkArea>
      </Box>
    </Container>
  );
};

export default Login;