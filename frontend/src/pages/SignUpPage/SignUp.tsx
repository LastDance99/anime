import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Container, MainBox, FormBox, EmailRow, EmailInput, AtMark,
  NicknameInput, PasswordInputRow, PasswordInput, EyeIconButton,
  GenderRow, GenderButton, JobInput, SignUpButton, DropdownArrow, Logo,
  LanguageContainer, LanguageSelected, LanguageDropdown, LanguageItem,
  DomainDropdownWrap, DomainDropdownButton, DomainDropdownList, DomainDropdownItem,
  AbsoluteErrorBox, EmailAuthBox, EmailAuthBtn, CodeInput, EmailTimer, NicknameBox, NicknameErrorBox,
  EmailErrorBox,
} from "./SignUp.styled";
import { Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import {
  signup, requestEmailVerification, confirmEmailVerification,
  checkEmail, checkNickname
} from "../../api/auth";
import i18n from "i18next";

const MAIN_LOGO_IMG = import.meta.env.VITE_MAIN_LOGO_IMG;

const emailDomains = [
  { value: "naver.com", label: "naver.com" },
  { value: "gmail.com", label: "gmail.com" },
  { value: "daum.net", label: "daum.net" },
  { value: "nate.com", label: "nate.com" },
  { value: "", label: "직접입력" },
];

const languages = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

interface SignupData {
  email: string;
  password: string;
  password2: string;
  nickname: string;
  gender: string;
  language: string;
}

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [job, setJob] = useState("");
  const [showJobInput, setShowJobInput] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [nickname, setNickname] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [gender, setGender] = useState("");
  const [lang, setLang] = useState("ko");

  const [open, setOpen] = useState(false);
  const [domainDropdownOpen, setDomainDropdownOpen] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showPwCheck, setShowPwCheck] = useState(false);
  const [error, setError] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwCheckError, setPwCheckError] = useState("");
  const [emailTimer, setEmailTimer] = useState(0);
  const emailTimerRef = useRef<number | null>(null);

  const domain = showJobInput ? job.trim() : emailDomain.trim();
  const fullEmail = `${emailId.trim()}@${domain}`.toLowerCase();

  const isValidEmail = emailId && domain.includes(".");
  const isValidNickname = nickname.length >= 2 && nickname.length <= 16;
  const isValidPw = pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);
  const isSamePw = pw === pwCheck;
  const isValidGender = gender !== "";
  const isActive = isValidEmail && isValidNickname && isValidPw && isSamePw && isValidGender && isEmailVerified;

  useEffect(() => {
    if (emailSent) {
      if (emailTimer > 0) {
        emailTimerRef.current = window.setTimeout(() => setEmailTimer(t => t - 1), 1000);
      } else {
        setEmailSent(false);
        setIsEmailVerified(false);
        setEmailMessage(t("auth.error.verificationExpired"));
      }
    }
    return () => {
      if (emailTimerRef.current !== null) clearTimeout(emailTimerRef.current);
    };
  }, [emailSent, emailTimer]);

  useEffect(() => {
    if (!pw) setPwError("");
    else if (!isValidPw) setPwError(t("auth.error.passwordInvalid"));
    else setPwError("");

    if (!pwCheck) setPwCheckError("");
    else if (pw !== pwCheck) setPwCheckError(t("auth.error.passwordMismatch"));
    else setPwCheckError("");
  }, [pw, pwCheck]);

  const handleEmailCheck = async () => {
    if (!isValidEmail) {
      setEmailMessage(t("auth.error.invalidEmail"));
      return;
    }
    setEmailMessage("");
    try {
      const res = await checkEmail(fullEmail);
      if (res.exists) {
        setEmailMessage(t("auth.error.emailExists"));
        setIsEmailVerified(false);
      } else {
        await requestEmailVerification({ email: fullEmail });
        setEmailSent(true);
        setEmailTimer(300);
      }
    } catch {
      setEmailMessage(t("auth.error.emailRequestFail"));
    }
  };

  const handleEmailVerify = async () => {
    try {
      await confirmEmailVerification({ email: fullEmail, code: verificationCode });
      setIsEmailVerified(true);
      setEmailMessage(t("auth.verified"));
      setEmailTimer(0);
      setEmailSent(false);
    } catch {
      setIsEmailVerified(false);
      setEmailMessage(t("auth.error.verificationFail"));
    }
  };

  const handleNicknameCheck = async () => {
    if (!isValidNickname) {
      setNicknameMessage(t("auth.error.nicknameInvalid"));
      return;
    }
    try {
      const res = await checkNickname(nickname);
      if (res.exists) setNicknameMessage(t("auth.error.nicknameExists"));
      else setNicknameMessage(t("auth.error.nicknameAvailable"));
    } catch {
      setNicknameMessage(t("auth.error.nicknameCheckFail"));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const data: SignupData = {
      email: fullEmail,
      password: pw,
      password2: pwCheck,
      nickname,
      gender,
      language: lang,
    };

    try {
      await signup(data);
      navigate("/login");
    } catch (err: any) {
      const resData = err.response?.data;
      if (resData && typeof resData === "object") {
        const firstKey = Object.keys(resData)[0];
        setError(resData[firstKey]?.[0] || t("auth.error.signup"));
      } else {
        setError(t("auth.error.signup"));
      }
    }
  };

  return (
    <Container>
      <MainBox>
        <Link to="/"><Logo src={MAIN_LOGO_IMG} alt="AnTada 로고" /></Link>
        <FormBox onSubmit={handleSubmit}>
          {/* 언어 선택 */}
          <LanguageContainer>
            <LanguageSelected onClick={() => setOpen(v => !v)}>
              {languages.find(l => l.code === lang)?.label}
              {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </LanguageSelected>
            {open && (
              <LanguageDropdown>
                {languages.filter(l => l.code !== lang).map(l => (
                  <LanguageItem
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      i18n.changeLanguage(l.code);
                      setOpen(false);
                    }}
                  >
                    {l.label}
                  </LanguageItem>
                ))}
              </LanguageDropdown>
            )}
          </LanguageContainer>

          {/* 이메일 */}
          <EmailRow>
            <EmailInput value={emailId} onChange={e => setEmailId(e.target.value)} placeholder={t("auth.email")} />
            <AtMark>@</AtMark>
            <DomainDropdownWrap>
              {showJobInput ? (
                <>
                  <JobInput value={job} onChange={e => setJob(e.target.value)} placeholder={t("auth.jobInput")} />
                  <DropdownArrow onClick={() => setDomainDropdownOpen(v => !v)}>
                    {domainDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </DropdownArrow>
                </>
              ) : (
                <DomainDropdownButton type="button" onClick={() => setDomainDropdownOpen(v => !v)}>
                  {emailDomains.find(opt => opt.value === emailDomain)?.label || t("auth.domainSelect")}
                  <DropdownArrow>{domainDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</DropdownArrow>
                </DomainDropdownButton>
              )}
              {domainDropdownOpen && (
                <DomainDropdownList>
                  {emailDomains.map(opt => (
                    <DomainDropdownItem key={opt.value} onClick={() => {
                      setEmailDomain(opt.value);
                      setShowJobInput(opt.value === "");
                      setDomainDropdownOpen(false);
                    }}>
                      {opt.value || t("auth.jobInput")}
                    </DomainDropdownItem>
                  ))}
                </DomainDropdownList>
              )}
            </DomainDropdownWrap>
            {!!emailMessage && (
              <EmailErrorBox success={emailMessage === t("auth.verified")}>
                {emailMessage}
              </EmailErrorBox>
            )}
          </EmailRow>

          {/* 이메일 인증 */}
          <EmailAuthBox>
            {!isEmailVerified ? (
              <>
                {!emailSent && (
                  <EmailAuthBtn type="button" onClick={handleEmailCheck}>
                    {t("auth.requestVerification")}
                  </EmailAuthBtn>
                )}
                {emailSent && (
                  <>
                    <CodeInput
                      type="text"
                      placeholder={t("auth.verificationCode")}
                      value={verificationCode}
                      onChange={e => setVerificationCode(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                      maxLength={6}
                      autoComplete="one-time-code"
                      inputMode="numeric"
                    />
                    <EmailTimer>{`${Math.floor(emailTimer / 60)}:${String(emailTimer % 60).padStart(2, "0")}`}</EmailTimer>
                    <EmailAuthBtn type="button" onClick={handleEmailVerify}>
                      {t("auth.verifyCode")}
                    </EmailAuthBtn>
                  </>
                )}
              </>
            ) : (
              <EmailAuthBtn as="div" disabled style={{ background: "#F5F5F5", color: "#6abf4b" }}>
                {t("auth.verified")}
              </EmailAuthBtn>
            )}
          </EmailAuthBox>

          {/* 닉네임 */}
          <NicknameBox>
            <NicknameInput
              type="text"
              placeholder={t("auth.nickname")}
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              onBlur={handleNicknameCheck}
            />
            {!!nicknameMessage && (
              <NicknameErrorBox success={nicknameMessage === t("auth.error.nicknameAvailable")}>
                {nicknameMessage}
              </NicknameErrorBox>
            )}
          </NicknameBox>

          {/* 비밀번호 */}
          <PasswordInputRow>
            <PasswordInput
              type={showPw ? "text" : "password"}
              placeholder={t("auth.password")}
              value={pw}
              onChange={e => setPw(e.target.value)}
            />
            <EyeIconButton type="button" onClick={() => setShowPw(v => !v)}>
              {showPw ? <EyeOff /> : <Eye />}
            </EyeIconButton>
            {!!pwError && <AbsoluteErrorBox>{pwError}</AbsoluteErrorBox>}
          </PasswordInputRow>
          <PasswordInputRow>
            <PasswordInput
              type={showPwCheck ? "text" : "password"}
              placeholder={t("auth.passwordCheck")}
              value={pwCheck}
              onChange={e => setPwCheck(e.target.value)}
            />
            <EyeIconButton type="button" onClick={() => setShowPwCheck(v => !v)}>
              {showPwCheck ? <EyeOff /> : <Eye />}
            </EyeIconButton>
            {!!pwCheckError && <AbsoluteErrorBox>{pwCheckError}</AbsoluteErrorBox>}
          </PasswordInputRow>

          {/* 성별 */}
          <GenderRow>
            <GenderButton type="button" selected={gender === "male"} onClick={() => setGender("male")}>
              {t("auth.gender.male")}
            </GenderButton>
            <GenderButton type="button" selected={gender === "female"} onClick={() => setGender("female")}>
              {t("auth.gender.female")}
            </GenderButton>
            <GenderButton type="button" selected={gender === ""} onClick={() => setGender("")}>
              {t("auth.gender.none")}
            </GenderButton>
          </GenderRow>

          <SignUpButton type="submit" disabled={!isActive}>{t("auth.signUp")}</SignUpButton>
        </FormBox>

        {error && <div style={{ color: "#d44", marginTop: 16 }}>{error}</div>}
      </MainBox>
    </Container>
  );
}