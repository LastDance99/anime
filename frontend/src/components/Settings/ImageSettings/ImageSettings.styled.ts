import styled, { css } from "styled-components";

export const Section = styled.section`
  font-family: ${({ theme }) => theme.fonts.cafe24};
  border-bottom: 1px solid ${({ theme }) => theme.colors.bordermain};
  padding-bottom: 40px;
`;

export const SubTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.Weights.bold};
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ImageRow = styled.div`
  display: flex;
  gap: 100px;
  flex-wrap: wrap;
  padding: 0 20px;
`;

export const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageLabel = styled.div`
  font-weight: ${({ theme }) => theme.Weights.medium};
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledImage = styled.img<{ shape: 'circle' | 'rect' | 'square' }>`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-bottom: 12px;
  border-radius: 16px;

  ${({ shape }) =>
    shape === "circle" &&
    css`
      border-radius: 50%;
    `}
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.cafe24};
  color: ${({ theme }) => theme.colors.text};
  transition: background-color 0.15s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;