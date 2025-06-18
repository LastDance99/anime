import styled from "styled-components";
import { Button } from "../../WriteButton/WriteButton.styled";

export const Card = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  padding: 15px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const TopBox = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  gap: 20px;
  position: relative;
`;

export const Avatar = styled.div`
  width: 100%;
  height: 100%;
  max-width: 80px;
  max-height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e9e9e9;
  border-radius: 50%;
  object-fit: cover;
`;

export const FontBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 4px;
  gap: 4px;
`;

export const Name = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg}; // 18px
  font-family: ${({ theme }) => theme.fonts.cafe24};
`;

export const Email = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm}; // 12px
  color: ${({ theme }) => theme.colors.subtext};
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const Font = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.light};
`;

export const FontRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.cafe24Light};
  font-weight: ${({ theme }) => theme.Weights.light};
`;

export const LogoutButton = styled.button`
  background: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 6px;
  padding: 6px 18px;
  color: ${({ theme }) => theme.colors.bordermain};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: 0;
`;

export const BottomBox = styled.div`
  width: 100%;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const CustomButton = styled(Button)`
  width: 120px;
  height: 26px;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.Weights.medium};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;