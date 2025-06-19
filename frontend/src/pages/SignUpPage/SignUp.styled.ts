import styled from "styled-components";

// 큰 박스(배경 포함)
export const Container = styled.div`
  width: 100vw;
  min-width: 1920px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainBox = styled.div`
  width: 500px;
  height: 480px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

export const Logo = styled.img`
  width: 147px;
  height: 117px;
  margin-bottom: 10px;
`;

// 폼 영역
export const FormBox = styled.form`
  position: relative;  
  width: 500px;
  height: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme}) => theme.colors.bordermain};
`;

export const LanguageContainer = styled.div`
  position: absolute;
  top: -41px;
  right: 18px;
  z-index: 10;
`;

export const LanguageSelected = styled.div`
  width: 80px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: ${({ theme }) => theme.Weights.light};
  cursor: pointer;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  transition: box-shadow 0.1s;
`;

export const LanguageDropdown = styled.ul`
  position: absolute;
  top: 38px;
  right: 0;
  width: 80px;
  padding: 0;
  margin: 0;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
  list-style: none;
  overflow: hidden;
  z-index: 20;
`;

export const LanguageItem = styled.li`
  width: 100%;
  padding: 6px 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: ${({ theme }) => theme.Weights.light};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  background: ${({ theme }) => theme.colors.background};
  transition: background 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

// 이메일 입력줄
export const EmailRow = styled.div`
  width: 460px;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 20px;
`;

// 이메일 왼쪽 입력
export const EmailInput = styled.input`
  width: 260px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  padding: 0 10px;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.colors.subtext};
  }
`;

export const AtMark = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  color: ${({ theme }) => theme.colors.subtext};
  margin: 0 11px;
`;

// 도메인 드롭다운 래퍼
export const DomainDropdownWrap = styled.div`
  position: relative;
  width: 160px;
  height: 40px;
`;

// 드롭다운 버튼(현재 선택 표시 & 클릭 시 열기)
export const DomainDropdownButton = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  padding: 0 22px 0 8px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.subtext};
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  transition: border 0.1s;
  &:focus {
    border: 1.5px solid ${({ theme }) => theme.colors.bordermain};
    outline: none;
  }
`;

// 드롭다운 리스트
export const DomainDropdownList = styled.ul`
  position: absolute;
  left: 0;
  top: 41px;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  z-index: 99;
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: 0 4px 16px rgba(255,182,193,0.08);
`;

// 드롭다운 리스트 아이템
export const DomainDropdownItem = styled.li`
  padding: 9px 12px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.subtext};
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.bordermain};
  }
`;

// 오른쪽 드롭다운 아이콘 위치
export const DropdownArrow = styled.span`
  margin-left: 4px;
  display: flex;
  align-items: center;
`;

// 직접입력시 인풋
export const JobInput = styled.input`
  width: 160px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  padding: 0 10px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
`;

// 닉네임 입력
export const NicknameInput = styled.input`
  width: 460px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  padding: 0 10px;
  margin-top: 20px;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.colors.subtext};
  }
`;

// 비밀번호 입력줄
export const PasswordInputRow = styled.div`
  width: 460px;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

// 비밀번호, 비밀번호확인 인풋
export const PasswordInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  padding: 0 40px 0 10px;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.colors.subtext};
  }
`;

// 눈 아이콘 버튼
export const EyeIconButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

// 성별 토글 그룹
export const GenderRow = styled.div`
  width: 460px;
  display: flex;
  margin: 20px 0;
`;

// 성별 토글 버튼
export const GenderButton = styled.button<{
  position?: "left" | "middle" | "right";
  selected?: boolean;
}>`
  flex: 1;
  height: 30px;
  background: ${({ selected }) => (selected ? "#FFD1DC" : "#fff")};
  color: ${({ selected }) => (selected ? "#222" : "#999")};
  border: 1px solid ${({ selected }) => (selected ? "#FFB2C6" : "#FFB2C6")};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  transition: background 0.15s, border 0.15s;
  ${({ position }) =>
    position === "left" && "border-radius: 8px 0 0 8px;"}
  ${({ position }) =>
    position === "middle" &&
    `
      border-left: none;
      border-right: none;
      border-radius: 0;
    `}
  ${({ position }) =>
    position === "right" && "border-radius: 0 8px 8px 0;"}
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`;

// 회원가입 버튼
export const SignUpButton = styled.button`
  width: 100%;
  line-height: 30px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.normal};
  margin-top: 14px;
  cursor: pointer;
  transition: background 0.12s;
  &:disabled {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.subtext};
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.div`
  color: #d44;
  font-size: 0.92rem;
  margin-top: 10px;
  font-weight: 500;
  min-height: 1.3em;
`;