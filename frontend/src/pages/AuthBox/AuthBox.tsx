import React, { useState } from "react";
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
} from "./AuthBox.styled";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

const AuthBox: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const currentLang = i18n.language || "ko";

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  const selectedLabel = languages.find((l) => l.code === currentLang)?.label || "";

  return (
    <Container>
      <Box>
        <LanguageContainer>
          <LanguageSelected onClick={() => setOpen((v) => !v)}>
            {selectedLabel}
            {open ? (
              <ChevronUp size={14} style={{ marginLeft: "6px" }} />
            ) : (
              <ChevronDown size={14} style={{ marginLeft: "6px" }} />
            )}
          </LanguageSelected>
          {open && (
            <LanguageDropdown>
              {languages
                .filter((l) => l.code !== currentLang)
                .map((l) => (
                  <LanguageItem key={l.code} onClick={() => handleSelect(l.code)}>
                    {l.label}
                  </LanguageItem>
                ))}
            </LanguageDropdown>
          )}
        </LanguageContainer>

        <Logo src="/logos/mainlog.png" alt="AnTada 로고" />
        <Title>{t("auth.welcome")}</Title>
        <SubTitle>{t("auth.subtitle")}</SubTitle>
        <LoginButton as={Link} to="/login">{t("auth.login")}</LoginButton>
        <SignupButton as={Link} to="/signup">{t("auth.signup")}</SignupButton>
      </Box>
    </Container>
  );
};

export default AuthBox;