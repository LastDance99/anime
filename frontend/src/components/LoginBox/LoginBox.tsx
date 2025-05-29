import React, { useState } from "react";
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
} from "./LoginBox.styled";
import { Eye, EyeOff, ChevronDown, ChevronUp} from "lucide-react";

const languages = [
    { code: "ko", label: "한국어" },
    { code: "en", label: "English" },
    { code: "ja", label: "日本語" },
  ];

const LoginBox: React.FC = () => {
  const [showPw, setShowPw] = useState(false);
  const [keepLogin, setKeepLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("ko");
  
  // 실제 언어 변경 로직은 i18n, 리로드 등 사용
  const handleSelect = (code: string) => {
    setLang(code);
    setOpen(false);
    // TODO: 여기에 실제 번역 함수 호출 (예: i18n.changeLanguage(code))
  };

  const selectedLabel = languages.find((l) => l.code === lang)?.label || "";

  return (
    <Container>
      <Box>
        <Logo src="/logos/mainlog.png" alt="AnTada 로고" />
        <SubBox>
          <LanguageContainer>
            <LanguageSelected onClick={() => setOpen((v) => !v)}>
              {selectedLabel}{" "}
              {open ? (
                <ChevronUp size={14} style={{ marginLeft: "6px"}}/> 
              ) : ( 
                <ChevronDown size={14} style={{ marginLeft: "6px"}} />
              )}
            </LanguageSelected>
            {open && (
              <LanguageDropdown>
                {languages.map((l) =>
                  l.code !== lang ? (
                    <LanguageItem key={l.code} onClick={() => handleSelect(l.code)}>
                      {l.label}
                    </LanguageItem>
                  ) : null
                )}
              </LanguageDropdown>
            )}
          </LanguageContainer>
          <InputWrapper>
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </InputWrapper>
          <InputWrapper>
            <PasswordWrapper>
              <Input
                type={showPw ? "text" : "password"}
                placeholder="비밀번호"
                value={pw}
                onChange={e => setPw(e.target.value)}
                autoComplete="current-password"
              />
              <IconButton onClick={() => setShowPw(v => !v)}>
                {showPw ? (
                  <EyeOff size={18} color="#555" />
                ) : (
                  <Eye size={18} color="#555" />
                )}
              </IconButton>
            </PasswordWrapper>
          </InputWrapper>
          <KeepLogin onClick={() => setKeepLogin(v => !v)}>
            {keepLogin ? (
              <CheckIcon size={16} color="#ffb6c1" />
            ) : (
              <UncheckIcon size={16} color="#ffb6c1" />
            )}
            로그인 상태 유지
          </KeepLogin>
          <LoginButton>로그인</LoginButton>
        </SubBox>
        <LinkArea>
          <span>비밀번호 찾기</span>
          <span>|</span>
          <span>회원가입</span>
        </LinkArea>
      </Box>
    </Container>
  );
};

export default LoginBox;
