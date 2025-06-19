import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container, MainBox, FormBox, EmailRow, EmailInput, AtMark,
  NicknameInput, PasswordInputRow, PasswordInput, EyeIconButton,
  GenderRow, GenderButton, JobInput, SignUpButton, DropdownArrow, Logo,
  LanguageContainer, LanguageSelected, LanguageDropdown, LanguageItem,
  DomainDropdownWrap, DomainDropdownButton, DomainDropdownList, DomainDropdownItem
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

  const domain = showJobInput ? job.trim() : emailDomain.trim();
  const fullEmail = `${emailId.trim()}@${domain}`.toLowerCase();

  const isValidEmail = emailId && domain.includes(".");
  const isValidNickname = nickname.length >= 2 && nickname.length <= 16;
  const isValidPw = pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);
  const isSamePw = pw === pwCheck;
  const isValidGender = gender !== "";

  const isActive = isValidEmail && isValidNickname && isValidPw && isSamePw && isValidGender && isEmailVerified;

  const handleEmailCheck = async () => {
    console.log("📨 이메일 체크 요청:", fullEmail);
    try {
      const res = await checkEmail(fullEmail);
      console.log("✅ 이메일 중복 체크 응답:", res);

      if (res.exists) {
        setEmailMessage("이미 가입된 이메일입니다.");
        setIsEmailVerified(false);
      } else {
        console.log("📨 이메일 인증 요청 중...");
        const result = await requestEmailVerification({ email: fullEmail });
        console.log("✅ 이메일 인증 요청 성공:", result);
        setEmailMessage("인증 메일을 보냈습니다.");
        setEmailSent(true);
      }
    } catch (err) {
      console.error("❌ 이메일 인증 요청 실패:", err);
      setEmailMessage("이메일 인증 요청 실패");
    }
  };

  const handleEmailVerify = async () => {
    console.log("🔐 인증 확인 요청:", { email: fullEmail, code: verificationCode });
    try {
      const result = await confirmEmailVerification({ email: fullEmail, code: verificationCode });
      console.log("✅ 인증 성공:", result);
      setIsEmailVerified(true);
      setEmailMessage("이메일 인증 완료");
    } catch (err) {
      console.error("❌ 인증 실패:", err);
      setEmailMessage("인증 코드가 잘못되었습니다.");
    }
  };

  const handleNicknameCheck = async () => {
    console.log("📝 닉네임 중복 확인:", nickname);
    try {
      const res = await checkNickname(nickname);
      console.log("✅ 닉네임 응답:", res);
      if (res.exists) {
        setNicknameMessage("이미 사용 중인 닉네임입니다.");
      } else {
        setNicknameMessage("사용 가능한 닉네임입니다.");
      }
    } catch (err) {
      console.error("❌ 닉네임 중복 확인 실패:", err);
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

    console.log("🚀 회원가입 데이터 전송:", data);

    try {
      const result = await signup(data);
      console.log("✅ 회원가입 성공:", result);
      navigate("/login");
    } catch (err: any) {
      console.error("❌ 회원가입 실패:", err);
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
          </EmailRow>
          <button type="button" onClick={handleEmailCheck}>이메일 인증 요청</button>
          {emailSent && (
            <>
              <input
                type="text"
                placeholder="인증코드 입력"
                value={verificationCode}
                onChange={e => setVerificationCode(e.target.value)}
              />
              <button type="button" onClick={handleEmailVerify}>인증 확인</button>
            </>
          )}
          {emailMessage && <p>{emailMessage}</p>}

          {/* 닉네임 */}
          <NicknameInput
            type="text"
            placeholder="닉네임"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            onBlur={handleNicknameCheck}
          />
          {nicknameMessage && <p>{nicknameMessage}</p>}

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
        {error && <p style={{ color: "red" }}>{error}</p>}
      </MainBox>
    </Container>
  );
}