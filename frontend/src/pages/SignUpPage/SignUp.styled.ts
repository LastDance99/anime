import styled from "styled-components";

// 큰 박스(배경 포함)

export const Container = styled.div`
  width: 100%;
  min-width: 1920px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.tablet} {
    min-width: 100%;
    padding: 0 12px;
  }
`;

// 메인 박스
export const MainBox = styled.div`
  width: 500px;
  height: 480px;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  ${({ theme }) => theme.media.tablet} {
    width: 96vw;
    min-width: 330px;
    max-width: 400px;
    height: auto;
    min-height: 380px;
    border-radius: 12px;
  }
  ${({ theme }) => theme.media.iosMax} {
    max-width: 360px;
    border-radius: 10px;
  }
  ${({ theme }) => theme.media.iosSE} {
    max-width: 320px;
    border-radius: 9px;
  }
  ${({ theme }) => theme.media.androidSmall} {
    max-width: 300px;
    border-radius: 8px;
  }
`;

export const Logo = styled.img`
  width: 147px;
  height: 117px;
  margin-bottom: 10px;

  ${({ theme }) => theme.media.tablet} {
    width: 120px;
    height: auto;
  }
  ${({ theme }) => theme.media.iosSE} {
    width: 95px;
  }
  ${({ theme }) => theme.media.androidSmall} {
    width: 85px;
  }
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

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
    max-width: 400px;
    height: auto;
    min-height: 340px;
    padding: 0 10px;
    border-radius: 12px;
  }
  ${({ theme }) => theme.media.iosMax} {
    max-width: 350px;
  }
  ${({ theme }) => theme.media.iosSE} {
    max-width: 310px;
    border-radius: 9px;
  }
  ${({ theme }) => theme.media.androidSmall} {
    max-width: 290px;
    border-radius: 8px;
  }
`;

export const LanguageContainer = styled.div`
  position: absolute;
  top: -41px;
  right: 18px;
  z-index: 10;

  ${({ theme }) => theme.media.tablet} {
    right: 10px;
    top: -30px;
  }
  ${({ theme }) => theme.media.iosSE} {
    right: 7px;
    top: -30px;
  }
  ${({ theme }) => theme.media.androidSmall} {
    right: 4px;
    top: -30px;
  }
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

  ${({ theme }) => theme.media.iosSE} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    width: 67px;
    height: 26px;
    border-radius: 7px;
  }
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

  ${({ theme }) => theme.media.iosSE} {
    width: 67px;
    border-radius: 7px;
  }
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

  ${({ theme }) => theme.media.iosSE} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

export const EmailRow = styled.div`
  width: 100%;
  max-width: 460px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  margin-top: 20px;
  position: relative;

  ${({ theme }) => theme.media.tablet} {
    width: 100%;
    max-width: 400px;
    gap: 2px;
  }
  ${({ theme }) => theme.media.iosSE} {
    width: 100%;
    max-width: 350px;
    gap: 1px;
    margin-top: 12px;
  }
  ${({ theme }) => theme.media.androidSmall} {
    width: 100%;
    max-width: 310px;
    gap: 0;
    margin-top: 10px;
  }
`;

export const EmailInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  padding: 0 12px;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  ${({ theme }) => theme.media.tablet} {
    min-width: 100px;
    max-width: 200px;
    height: 40px;
    border: 1px solid ${({ theme }) => theme.colors.bordermain};
    border-radius: 8px;
    padding: 0 12px;
    font-family: ${({ theme }) => theme.fonts.cafe24Light};
    font-size: ${({ theme }) => theme.fontSizes.md};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
  }
  ${({ theme }) => theme.media.iosSE} {
    min-width: 100px;
    max-width: 140px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: 0 4px;
  }
  ${({ theme }) => theme.media.androidSmall} {
    min-width: 100px;
    max-width: 120px;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: 0 2px;
  }
`;

export const AtMark = styled.span`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  color: ${({ theme }) => theme.colors.subtext};

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.md};
    margin: 0 7px;
  }
  ${({ theme }) => theme.media.iosSE} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin: 0 4px;
  }
`;

export const DomainDropdownWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 140px;
  height: 40px;

  ${({ theme }) => theme.media.tablet} {
    width: 130px;
  }
  ${({ theme }) => theme.media.iosSE} {
    width: 100px;
  }
`;

export const DomainDropdownButton = styled.button`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  padding: 0 22px 0 12px;
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

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.base};
    border-radius: 7px;
    padding: 0 12px 0 6px;
  }
  ${({ theme }) => theme.media.iosSE} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    border-radius: 6px;
    padding: 0 8px 0 3px;
  }
`;

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

  ${({ theme }) => theme.media.iosSE} {
    border-radius: 6px;
  }
`;

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

  ${({ theme }) => theme.media.iosSE} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: 7px 8px;
  }
`;

export const DropdownArrow = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const JobInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  padding: 0 12px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  ${({ theme }) => theme.media.tablet} {
    width: 130px;
    font-size: ${({ theme }) => theme.fontSizes.base};
    padding: 0 7px;
  }
  ${({ theme }) => theme.media.iosSE} {
    width: 100px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: 0 4px;
  }
`;

export const NicknameBox = styled.div`
  width: 100%;
  max-width: 460px;
  margin-top: 20px;
  position: relative;

  ${({ theme }) => theme.media.tablet} {
    width: 98%;
  }
  ${({ theme }) => theme.media.iosSE} {
    width: 99%;
  }
  ${({ theme }) => theme.media.androidSmall} {
    width: 100%;
  }
`;

export const NicknameInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  padding: 0 10px;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.colors.subtext};
  }

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.base};
    padding: 0 30px 0 7px;
  }
  ${({ theme }) => theme.media.iosSE} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: 0 22px 0 4px;
  }
  ${({ theme }) => theme.media.androidSmall} {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    padding: 0 2px;
  }
`;

export const PasswordInputRow = styled.div`
  width: 100%;
  max-width: 460px;
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 20px;

  ${({ theme }) => theme.media.tablet} {
    width: 98%;
  }
  ${({ theme }) => theme.media.iosSE} {
    width: 99%;
  }
  ${({ theme }) => theme.media.androidSmall} {
    width: 100%;
  }
`;

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

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.base};
    padding: 0 30px 0 7px;
  }
  ${({ theme }) => theme.media.iosSE} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: 0 22px 0 4px;
  }
`;

export const EyeIconButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  svg {
    color: #999;
  }

  ${({ theme }) => theme.media.iosSE} {
    right: 6px;
    top: 7px;
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const GenderRow = styled.div`
  width: 460px;
  display: flex;
  margin: 20px 0;

  ${({ theme }) => theme.media.tablet} {
    width: 98%;
  }
  ${({ theme }) => theme.media.iosSE} {
    width: 99%;
    margin: 10px 0;
  }
  ${({ theme }) => theme.media.androidSmall} {
    width: 100%;
    margin: 8px 0;
  }
`;

export const GenderButton = styled.button<{
  position?: "left" | "middle" | "right";
  selected?: boolean;
}>`
  flex: 1;
  height: 30px;
  background: ${({ selected }) => (selected ? "#FFD1DC" : "#fff")};
  color: ${({ selected }) => (selected ? "#222" : "#999")};
  border: 1px solid #FFB2C6;
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

  ${({ theme }) => theme.media.iosSE} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    ${({ position }) =>
      position === "left" && "border-radius: 5px 0 0 5px;"}
    ${({ position }) =>
      position === "right" && "border-radius: 0 5px 5px 0;"}
  }
`;

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

  ${({ theme }) => theme.media.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.base};
    border-radius: 10px;
  }
  ${({ theme }) => theme.media.iosSE} {
  
    font-size: ${({ theme }) => theme.fontSizes.sm};
    border-radius: 8px;
  }
`;

export const ErrorText = styled.div`
  color: #d44;
  font-size: 0.92rem;
  margin-top: 10px;
  font-weight: 500;
  min-height: 1.3em;

  ${({ theme }) => theme.media.iosSE} {
    font-size: 0.8rem;
  }
`;

export const AbsoluteErrorBox = styled.div<{ success?: boolean }>`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ success }) => (success ? "#a7e2b8" : "#ffd1dc")};
  color: ${({ success }) => (success ? "#2ba700" : "#ff4264")};
  font-size: 0.97rem;
  padding: 6px 14px;
  border-radius: 7px;
  white-space: nowrap;
  z-index: 5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  pointer-events: none;

  ${({ theme }) => theme.media.iosSE} {
    font-size: 0.76rem;
    padding: 4px 7px;
    border-radius: 5px;
  }
`;

export const NicknameErrorBox = styled(AbsoluteErrorBox)`
  right: 1px;
`;

export const EmailErrorBox = styled(AbsoluteErrorBox)`
  top: 180%;
`;


export const EmailAuthBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 10px 0 0 0;
  position: relative;
  width: 100%;
  max-width: 460px;

  ${({ theme }) => theme.media.tablet} {
    justify-content: space-between;
    gap: 5px;
    width: 98%;
    max-width: 400px;
  }
`;

export const EmailAuthBtn = styled.button`
  width: 100%;
  max-width: 135px;
  min-width: 0;
  height: 40px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: filter 0.14s;
  &:disabled {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.subtext};
    cursor: not-allowed;
    filter: grayscale(0.2);
  }

  ${({ theme }) => theme.media.tablet} {
    max-width: 100px;
  }
`;

export const CodeInput = styled.input`
  width: 140px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  padding: 0 12px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  outline: none;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  &::placeholder {
    color: ${({ theme }) => theme.colors.subtext};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }

`;

export const EmailTimer = styled.span`
  color: #ff4264;
  font-size: 0.95em;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  min-width: 50px;
  margin-left: 6px;
  letter-spacing: 0.06em;
  text-align: center;
`;

