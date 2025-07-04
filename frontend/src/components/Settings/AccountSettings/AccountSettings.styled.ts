import styled from "styled-components";

export const Section = styled.section`
  margin-bottom: 40px;
`;

export const SubTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl}; // 20px
  font-weight: ${({ theme }) => theme.Weights.bold};
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 14px;
`;

export const Label = styled.div`
  width: 100px;
  font-weight: ${({ theme }) => theme.Weights.medium};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const Text = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base}; // 16px
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.main};
`;

export const LangSelect = styled.select`
  margin-left: 12px;
  padding: 4px 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.cafe24};
  transition: border-color 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}44;
  }
`;