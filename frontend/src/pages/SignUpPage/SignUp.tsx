import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  MainBox,
  FormBox,
  EmailRow,
  EmailInput,
  AtMark,
  NicknameInput,
  PasswordInputRow,
  PasswordInput,
  EyeIconButton,
  GenderRow,
  GenderButton,
  JobInput,
  SignUpButton,
  DropdownArrow,
  Logo,
  LanguageContainer,
  LanguageSelected,
  LanguageDropdown,
  LanguageItem,
  DomainDropdownWrap,
  DomainDropdownButton,
  DomainDropdownList,
  DomainDropdownItem,
} from "./SignUp.styled";
import { Eye, EyeOff, ChevronDown, ChevronUp } from "lucide-react";
import { signup } from "../../api/auth"; // ✅ 함수 이름 일치

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
  { code: "ja", label: "日本語" },
];

interface SignupData {
  email: string;
  password: string;
  password2: string;
  nickname: string;
  gender: string;
  language: string;
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [showJobInput, setShowJobInput] = useState(true);
  const [nickname, setNickname] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPwCheck, setShowPwCheck] = useState(false);
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [lang, setLang] = useState("ko");
  const [open, setOpen] = useState(false);
  const [domainDropdownOpen, setDomainDropdownOpen] = useState(false);
  const [error, setError] = useState("");

  const domain = showJobInput ? job.trim() : emailDomain.trim();
  const fullEmail = `${emailId.trim()}@${domain}`.toLowerCase();

  const isValidEmailId = emailId.length > 0;
  const isValidDomain = domain.length > 0 && domain.includes(".");
  const isValidNickname = nickname.length >= 2 && nickname.length <= 16;
  const isValidPw = pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);
  const isSamePw = pw === pwCheck;
  const isValidGender = gender !== "";

  const isActive =
    isValidEmailId &&
    isValidDomain &&
    isValidNickname &&
    isValidPw &&
    isSamePw &&
    isValidGender;

  const handleSelect = (code: string) => {
    setLang(code);
    setOpen(false);
  };

  const handleDomainSelect = (value: string) => {
    setEmailDomain(value);
    setShowJobInput(value === "");
    setDomainDropdownOpen(false);
    if (value !== "") setJob("");
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
        setError(resData[firstKey]?.[0] || "회원가입 실패");
      } else {
        setError("회원가입 실패");
      }
    }
  };

  return (
    <Container>
      <MainBox>
        <Link to="/">
          <Logo src="/logos/mainlog.png" alt="AnTada 로고" />
        </Link>

        <FormBox onSubmit={handleSubmit}>
          <LanguageContainer>
            <LanguageSelected onClick={() => setOpen(v => !v)}>
              {languages.find(l => l.code === lang)?.label}
              {open ? <ChevronUp size={14} style={{ marginLeft: 6 }} /> : <ChevronDown size={14} style={{ marginLeft: 6 }} />}
            </LanguageSelected>
            {open && (
              <LanguageDropdown>
                {languages
                  .filter(l => l.code !== lang)
                  .map(l => (
                    <LanguageItem key={l.code} onClick={() => handleSelect(l.code)}>
                      {l.label}
                    </LanguageItem>
                  ))}
              </LanguageDropdown>
            )}
          </LanguageContainer>

          {/* 이메일 입력 */}
          <EmailRow>
            <EmailInput
              type="text"
              placeholder="이메일"
              value={emailId}
              onChange={e => setEmailId(e.target.value)}
              autoComplete="username"
            />
            <AtMark>@</AtMark>
            <DomainDropdownWrap>
              {showJobInput ? (
                <>
                  <JobInput
                    type="text"
                    placeholder="도메인 직접입력"
                    value={job}
                    onChange={e => setJob(e.target.value)}
                  />
                  <DropdownArrow onClick={() => setDomainDropdownOpen(v => !v)}>
                    {domainDropdownOpen ? <ChevronUp size={16} color="#999" /> : <ChevronDown size={16} color="#999" />}
                  </DropdownArrow>
                </>
              ) : (
                <DomainDropdownButton type="button" onClick={() => setDomainDropdownOpen(v => !v)}>
                  {emailDomains.find(opt => opt.value === emailDomain)?.label || "도메인 선택"}
                  <DropdownArrow>
                    {domainDropdownOpen ? <ChevronUp size={16} color="#999" /> : <ChevronDown size={16} color="#999" />}
                  </DropdownArrow>
                </DomainDropdownButton>
              )}
              {domainDropdownOpen && (
                <DomainDropdownList>
                  {emailDomains.map(opt => (
                    <DomainDropdownItem key={opt.value} onClick={() => handleDomainSelect(opt.value)}>
                      {opt.label}
                    </DomainDropdownItem>
                  ))}
                </DomainDropdownList>
              )}
            </DomainDropdownWrap>
          </EmailRow>

          <NicknameInput
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />

          <PasswordInputRow>
            <PasswordInput
              type={showPw ? "text" : "password"}
              placeholder="비밀번호"
              value={pw}
              onChange={e => setPw(e.target.value)}
              autoComplete="new-password"
            />
            <EyeIconButton type="button" onClick={() => setShowPw(v => !v)}>
              {showPw ? <EyeOff size={18} color="#555" /> : <Eye size={18} color="#555" />}
            </EyeIconButton>
          </PasswordInputRow>

          <PasswordInputRow>
            <PasswordInput
              type={showPwCheck ? "text" : "password"}
              placeholder="비밀번호 확인"
              value={pwCheck}
              onChange={e => setPwCheck(e.target.value)}
              autoComplete="new-password"
            />
            <EyeIconButton type="button" onClick={() => setShowPwCheck(v => !v)}>
              {showPwCheck ? <EyeOff size={18} color="#555" /> : <Eye size={18} color="#555" />}
            </EyeIconButton>
          </PasswordInputRow>

          <GenderRow>
            <GenderButton
              type="button"
              position="left"
              selected={gender === "male"}
              onClick={() => setGender("male")}
            >
              남자
            </GenderButton>
            <GenderButton
              type="button"
              position="middle"
              selected={gender === "female"}
              onClick={() => setGender("female")}
            >
              여자
            </GenderButton>
            <GenderButton
              type="button"
              position="right"
              selected={gender === ""}
              onClick={() => setGender("")}
            >
              선택안함
            </GenderButton>
          </GenderRow>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <SignUpButton type="submit" disabled={!isActive}>
            회원가입
          </SignUpButton>
        </FormBox>
      </MainBox>
    </Container>
  );
};

export default SignUp;