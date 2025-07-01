import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  { code: "ja", label: "\u65e5\u672c\u8a9e" },
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

  // 이메일 인증 타이머
  useEffect(() => {
    if (emailSent) {
      if (emailTimer > 0) {
        emailTimerRef.current = window.setTimeout(() => setEmailTimer(t => t - 1), 1000);
      } else {
        setEmailSent(false);
        setIsEmailVerified(false);
        setEmailMessage("다시 시도해주세요.");
      }
    }
    return () => {
      if (emailTimerRef.current !== null) {
        clearTimeout(emailTimerRef.current);
      }
    };
  }, [emailSent, emailTimer]);

  // 비밀번호 유효성 체크
  useEffect(() => {
    if (!pw) setPwError("");
    else if (!isValidPw) setPwError("8자 이상, 영문+숫자 포함");
    else setPwError("");

    if (!pwCheck) setPwCheckError("");
    else if (pw !== pwCheck) setPwCheckError("비밀번호가 다릅니다.");
    else setPwCheckError("");
  }, [pw, pwCheck]);

  // 이메일 인증 요청
  const handleEmailCheck = async () => {
    if (!isValidEmail) {
      setEmailMessage("올바른 이메일을 입력하세요.");
      return;
    }
    setEmailMessage("");
    try {
      const res = await checkEmail(fullEmail);
      if (res.exists) {
        setEmailMessage("이미 가입된 이메일입니다.");
        setIsEmailVerified(false);
      } else {
        const result = await requestEmailVerification({ email: fullEmail });
        setEmailSent(true);
        setEmailTimer(300); // 5분
      }
    } catch (err) {
      setEmailMessage("이메일 인증 요청 실패");
    }
  };

  const handleEmailVerify = async () => {
    try {
      await confirmEmailVerification({ email: fullEmail, code: verificationCode });
      setIsEmailVerified(true);
      setEmailMessage("이메일 인증 완료");
      setEmailTimer(0); // ⛔ 타이머 강제 종료
      setEmailSent(false); // ✅ 이메일 인증 완료된 상태로 버튼 숨기기
    } catch (err) {
      setIsEmailVerified(false);
      setEmailMessage("인증 코드가 잘못되었습니다.");
    }
  };

  const handleNicknameCheck = async () => {
    if (!isValidNickname) {
      setNicknameMessage("2~16자 닉네임 입력");
      return;
    }
    try {
      const res = await checkNickname(nickname);
      if (res.exists) setNicknameMessage("이미 사용 중인 닉네임입니다.");
      else setNicknameMessage("사용 가능한 닉네임입니다.");
    } catch (err) {
      setNicknameMessage("닉네임 확인 실패");
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
        setError(resData[firstKey]?.[0] || "회원가입 실패");
      } else {
        setError("회원가입 실패");
      }
    }
  };

  // ----------- 렌더링 ----------
  return (
    <Container>
      <MainBox>
        <Link to="/"><Logo src="/logos/mainlog.png" alt="AnTada 로고" /></Link>
        <FormBox onSubmit={handleSubmit}>
          {/* 언어 */}
          <LanguageContainer>
            <LanguageSelected onClick={() => setOpen(v => !v)}>
              {languages.find(l => l.code === lang)?.label}
              {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </LanguageSelected>
            {open && (
              <LanguageDropdown>
                {languages.filter(l => l.code !== lang).map(l => (
                  <LanguageItem key={l.code} onClick={() => { setLang(l.code); setOpen(false); }}>
                    {l.label}
                  </LanguageItem>
                ))}
              </LanguageDropdown>
            )}
          </LanguageContainer>

          {/* 이메일 */}
          <EmailRow>
            <EmailInput value={emailId} onChange={e => setEmailId(e.target.value)} placeholder="이메일" />
            <AtMark>@</AtMark>
            <DomainDropdownWrap>
              {showJobInput ? (
                <>
                  <JobInput value={job} onChange={e => setJob(e.target.value)} placeholder="직접입력" />
                  <DropdownArrow onClick={() => setDomainDropdownOpen(v => !v)}>
                    {domainDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </DropdownArrow>
                </>
              ) : (
                <DomainDropdownButton type="button" onClick={() => setDomainDropdownOpen(v => !v)}>
                  {emailDomains.find(opt => opt.value === emailDomain)?.label || "도메인 선택"}
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
                      {opt.label}
                    </DomainDropdownItem>
                  ))}
                </DomainDropdownList>
              )}
            </DomainDropdownWrap>
            {/* 이메일 오류 메시지 */}
            {!!emailMessage && <EmailErrorBox>{emailMessage}</EmailErrorBox>}
          </EmailRow>

          {/* 이메일 인증 박스 */}
          <EmailAuthBox>
            {!isEmailVerified ? (
              <>
                {/* 인증 요청 버튼 - emailSent가 false일 때만 보임 */}
                {!emailSent && (
                  <EmailAuthBtn
                    type="button"
                    onClick={handleEmailCheck}
                  >
                    이메일 인증 요청
                  </EmailAuthBtn>
                )}

                {/* 인증 대기 중일 때 인증코드 입력창/타이머/확인 버튼 표시 */}
                {emailSent && (
                  <>
                    <CodeInput
                      type="text"
                      placeholder="인증코드 6자리"
                      value={verificationCode}
                      onChange={e => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        setVerificationCode(val.slice(0, 6));
                      }}
                      maxLength={6}
                      autoComplete="one-time-code"
                      inputMode="numeric"
                    />
                    <EmailTimer>
                      {`${Math.floor(emailTimer / 60)}:${String(emailTimer % 60).padStart(2, "0")}`}
                    </EmailTimer>
                    <EmailAuthBtn type="button" onClick={handleEmailVerify}>
                      인증 확인
                    </EmailAuthBtn>
                  </>
                )}
              </>
            ) : (
              <EmailAuthBtn as="div" disabled style={{ background: "#F5F5F5", color: "#6abf4b" }}>
                인증 완료
              </EmailAuthBtn>
            )}
          </EmailAuthBox>

          {/* 닉네임 */}
          <NicknameBox>
            <NicknameInput
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              onBlur={handleNicknameCheck}
            />
            {!!nicknameMessage && <NicknameErrorBox>{nicknameMessage}</NicknameErrorBox>}
          </NicknameBox>

          {/* 비밀번호 */}
          <PasswordInputRow>
            <PasswordInput
              type={showPw ? "text" : "password"}
              placeholder="비밀번호"
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
              placeholder="비밀번호 확인"
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
            <GenderButton type="button" selected={gender === "male"} onClick={() => setGender("male")}>남자</GenderButton>
            <GenderButton type="button" selected={gender === "female"} onClick={() => setGender("female")}>여자</GenderButton>
            <GenderButton type="button" selected={gender === ""} onClick={() => setGender("")}>선택안함</GenderButton>
          </GenderRow>

          {/* 제출 */}
          <SignUpButton type="submit" disabled={!isActive}>회원가입</SignUpButton>
        </FormBox>
        {error && <div style={{ color: "#d44", marginTop: 16 }}>{error}</div>}
      </MainBox>
    </Container>
  );
}