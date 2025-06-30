import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Logo,
  Title,
  SubTitle,
  LoginButton,
  SignupButton,
  LanguageContainer,
  LanguageSelected,
  LanguageDropdown,
  LanguageItem,
} from './AuthBox.styled';
import { ChevronDown, ChevronUp } from "lucide-react";

// 예시 언어 리스트
const languages = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
];

const AuthBox: React.FC = () => {
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
        <Logo src="/logos/mainlog.png" alt="AnTada 로고"/>
        <Title>지금 접속해서 즐겨보세요~!</Title>
        <SubTitle>로그인 시 이용 가능합니다</SubTitle>
        <LoginButton as={Link} to="/login">로그인</LoginButton>
        <SignupButton as={Link} to="/signup">회원가입</SignupButton>
      </Box>
    </Container>
  );
};

export default AuthBox;
