import styled from "styled-components";

export const Card = styled.div`
  width: 160px;
  height: 180px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.bordermain}33;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.subcolor};
`;

export const Caption = styled.div`
  padding: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.Weights.medium};
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.cafe24};
`;