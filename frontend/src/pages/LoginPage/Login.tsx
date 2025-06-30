import React, { useState, useEffect  } from "react";
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
  AbsoluteErrorBox,
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

  const [showPw, setShowPw] = useState(false);
  const [keepLogin, setKeepLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("ko");

  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");

  const { login: loginToContext } = useAuth();

  const handleSelect = (code: string) => {
    setLang(code);
    setOpen(false);
  };

  const selectedLabel = languages.find((l) => l.code === lang)?.label || "";

  const handleLogin = async () => {
    setEmailError("");
    setPwError("");
    try {
      const res = await login({ email, password: pw });
      const { access, refresh } = res;
      setAccessToken(access, keepLogin);
      setRefreshToken(refresh);

      const userInfo = await getMyProfile();
      loginToContext(userInfo);
      navigate(`/profile/${userInfo.id}`);
    } catch (err: any) {

      const data = err?.response?.data;
      let emailMsg = "";
      let pwMsg = "";

      if (data?.email) {
        emailMsg = Array.isArray(data.email) ? data.email[0] : data.email;
      }
      if (data?.password) {
        pwMsg = Array.isArray(data.password) ? data.password[0] : data.password;
      }

      if (data?.detail) {
        const lower = data.detail.toLowerCase();
        if (lower.includes("이메일") || lower.includes("email")) {
          emailMsg = data.detail;
        }
        if (lower.includes("비밀번호") || lower.includes("password")) {
          pwMsg = data.detail;
        }
        if (!emailMsg && !pwMsg) {
          emailMsg = data.detail;
          pwMsg = data.detail;
        }
      }

      if (!emailMsg && !pwMsg) {
        pwMsg = "이메일 또는 비밀번호가 올바르지 않습니다.";
      }

      setEmailError(emailMsg);
      setPwError(pwMsg);
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
              {open ? <ChevronUp size={14} style={{ marginLeft: 6 }} /> : <ChevronDown size={14} style={{ marginLeft: 6 }} />}
            </LanguageSelected>
            {open && (
              <LanguageDropdown>
                {languages
                  .filter((l) => l.code !== lang)
                  .map((l) => (
                    <LanguageItem key={l.code} onClick={() => handleSelect(l.code)}>
                      {l.label}
                    </LanguageItem>
                  ))}
              </LanguageDropdown>
            )}
          </LanguageContainer>

          {/* 이메일 입력 */}
          <InputWrapper style={{ position: "relative" }}>
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
              }}
              autoComplete="username"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={emailError ? { borderColor: "#ff4264" } : undefined}
            />
            {emailError && <AbsoluteErrorBox>{emailError}</AbsoluteErrorBox>}
          </InputWrapper>

          {/* 비밀번호 입력 */}
          <InputWrapper style={{ position: "relative" }}>
            <PasswordWrapper>
              <Input
                type={showPw ? "text" : "password"}
                placeholder="비밀번호"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  if (pwError) setPwError("");
                }}
                autoComplete="current-password"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={pwError ? { borderColor: "#ff4264" } : undefined}
              />
              <IconButton onClick={() => setShowPw((v) => !v)}>
                {showPw ? <EyeOff size={18} color="#555" /> : <Eye size={18} color="#555" />}
              </IconButton>
            </PasswordWrapper>
            {pwError && <AbsoluteErrorBox>{pwError}</AbsoluteErrorBox>}
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