import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const SignUp: React.FC = () => {
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("");
  const [showJobInput, setShowJobInput] = useState(true);
  const [nickname, setNickname] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwCheck, setPwCheck] = useState("");
  const [showPwCheck, setShowPwCheck] = useState(false);
  const [gender, setGender] = useState("none");
  const [job, setJob] = useState("");
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("ko");
  const [domainDropdownOpen, setDomainDropdownOpen] = useState(false);

  // 유효성(간단 예시)
  const isActive =
    emailId.length > 0 &&
    (emailDomain.length > 0 || showJobInput) &&
    nickname.length > 0 &&
    pw.length > 0 &&
    pwCheck.length > 0 &&
    pw === pwCheck &&
    gender !== "";

  const handleSelect = (code: string) => {
    setLang(code);
    setOpen(false);
    // TODO: 여기에 실제 번역 함수 호출 (예: i18n.changeLanguage(code))
  };

  const selectedLabel = languages.find((l) => l.code === lang)?.label || "";

  const handleDomainSelect = (value: string) => {
    setEmailDomain(value);
    setShowJobInput(value === "");
    setDomainDropdownOpen(false);
    if (value !== "") setJob(""); // 도메인 선택 시 job값 초기화
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // 여기서 폼 데이터 수집 및 fetch/axios 등
};

  return (
    <Container>
      <MainBox>
        {/* 로고, 언어선택 등은 생략. 위에서 구현된 대로 삽입 */}
        <Link to="/">
          <Logo src="/logos/mainlog.png" alt="AnTada 로고" />
        </Link>
        <FormBox onSubmit={handleSubmit}>
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
          {/* 이메일 */}
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
                    // style={{ paddingRight: 28 }} // 오른쪽 아이콘 공간 확보
                  />
                  <DropdownArrow
                    style={{
                      right: 12,
                      top: 12,
                      position: "absolute",
                      cursor: "pointer",
                    }}
                    onClick={() => setDomainDropdownOpen(open => !open)}
                  >
                    {domainDropdownOpen
                      ? <ChevronUp size={16} color="#999" />
                      : <ChevronDown size={16} color="#999" />}
                  </DropdownArrow>
                </>
              ) : (
                <DomainDropdownButton
                  type="button"
                  onClick={() => setDomainDropdownOpen(open => !open)}
                >
                  {emailDomains.find(opt => opt.value === emailDomain)?.label || "도메인 선택"}
                  <DropdownArrow>
                    {domainDropdownOpen
                      ? <ChevronUp size={16} color="#999" />
                      : <ChevronDown size={16} color="#999" />}
                  </DropdownArrow>
                </DomainDropdownButton>
              )}
              {domainDropdownOpen && (
                <DomainDropdownList style={{ zIndex: 99 }}>
                  {emailDomains.map(opt => (
                    <DomainDropdownItem
                      key={opt.value}
                      onClick={() => handleDomainSelect(opt.value)}
                    >
                      {opt.label}
                    </DomainDropdownItem>
                  ))}
                </DomainDropdownList>
              )}
            </DomainDropdownWrap>
          </EmailRow>
          {/* 닉네임 */}
          <NicknameInput
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          {/* 비밀번호 */}
          <PasswordInputRow>
            <PasswordInput
              type={showPw ? "text" : "password"}
              placeholder="비밀번호"
              value={pw}
              onChange={e => setPw(e.target.value)}
              autoComplete="new-password"
            />
            <EyeIconButton type="button" onClick={() => setShowPw(v => !v)}>
              {showPw ? (
                <EyeOff size={18} color="#555" />
              ) : (
                <Eye size={18} color="#555" />
              )}
            </EyeIconButton>
          </PasswordInputRow>
          {/* 비밀번호 확인 */}
          <PasswordInputRow>
            <PasswordInput
              type={showPwCheck ? "text" : "password"}
              placeholder="비밀번호 확인"
              value={pwCheck}
              onChange={e => setPwCheck(e.target.value)}
              autoComplete="new-password"
            />
            <EyeIconButton type="button" onClick={() => setShowPwCheck(v => !v)}>
              {showPwCheck ? (
                <EyeOff size={18} color="#555" />
              ) : (
                <Eye size={18} color="#555" />
              )}
            </EyeIconButton>
          </PasswordInputRow>
          {/* 성별 */}
          <GenderRow>
            <GenderButton
              position="left"
              selected={gender === "male"}
              onClick={() => setGender("male")}
              type="button"
            >
              남자
            </GenderButton>
            <GenderButton
              position="middle"
              selected={gender === "female"}
              onClick={() => setGender("female")}
              type="button"
            >
              여자
            </GenderButton>
            <GenderButton
              position="right"
              selected={gender === "none"}
              onClick={() => setGender("none")}
              type="button"
            >
              선택안함
            </GenderButton>
          </GenderRow>
        </FormBox>
        <SignUpButton type="button" disabled={!isActive}>
          회원가입
        </SignUpButton>
      </MainBox>
    </Container>
  );
};

export default SignUp;
