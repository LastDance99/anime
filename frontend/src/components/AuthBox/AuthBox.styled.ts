import styled from 'styled-components';
import { Link } from "react-router-dom";


export const Container = styled.div`
  width: 100vw;
  min-width: 1920px;
  height: 100vh;
  max-height: 1080px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: ${({ theme }) => theme.colors.background}; */
  background: url('/images/bgimg.jpg') no-repeat center center;
  background-size: cover;
`;

export const Box = styled.div`
  width: 460px;
  height: 340px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const Logo = styled.img`
  width: 147px;
  height: 117px;
  margin: 20px 0 20px 0;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.Weights.bold};
  margin: 0 0 8px 0;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wider};
`;

export const SubTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  margin-bottom: 23px;
  text-align: center;
  line-height: ${({ theme }) => theme.lineHeights.normal};
`;

export const LoginButton = styled(Link)`
  width: 410px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 40px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.medium};
  cursor: pointer;
  margin-bottom: 14px;
  transition: filter 0.2s;
  letter-spacing: ${({ theme }) => theme.letterSpacings.normal};
  &:hover {
    filter: brightness(0.98);
  }
`;

export const SignupButton = styled(LoginButton)`
  background: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
`;

export const LanguageContainer = styled.div`
  position: absolute;
  top: 10px;
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

