import styled from "styled-components";
import { CheckCircle, Circle } from "lucide-react";

export const Container = styled.div`
  width: 100vw;
  min-width: 1920px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.img`
  width: 147px;
  height: 117px;
  margin-bottom: 10px;
`;

export const Box = styled.div`
  width: 460px;
  height: 400px;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SubBox = styled.div`
  width: 460px;
  height: 230px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  position: relative;
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

export const InputWrapper = styled.div`
  width: 410px;
  margin-top: 20px;
`;

export const PasswordWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  outline: none;
  padding: 0 12px;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  color: #333;
  box-sizing: border-box;
  &::placeholder {
    color: #bbb;
    font-weight: ${({ theme }) => theme.Weights.normal};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

export const IconButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const KeepLogin = styled.div`
  width: 410px;
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: #666;
  margin: 13px 0;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.normal};
  gap: 6px;
  user-select: none;
`;

export const CheckIcon = styled(CheckCircle)`
  margin-right: 4px;
`;

export const UncheckIcon = styled(Circle)`
  margin-right: 4px;
`;

export const LoginButton = styled.button`
  width: 410px;
  height: 40px;
  background: #ffd1dc;
  color: #333;
  border: none;
  border-radius: 10px;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
  cursor: pointer;
  margin-bottom: 20px;
  transition: filter 0.12s;
  &:hover {
    filter: brightness(0.98);
  }
`;

export const LinkArea = styled.div`
  width: 410px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 12px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: #999999;
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.normal};
  user-select: none;
  span {
    cursor: pointer;
    &:nth-child(2) {
      color: #ddd;
      cursor: default;
    }
  }
`;

export const ErrorText = styled.div`
  color: #d44;
  font-size: 0.92rem;
  margin-top: 8px;
  font-weight: 500;
  min-height: 1.3em;  // (에러 안 보일 때도 영역 유지, 선택사항)
`;
