import styled from "styled-components";

export const UploadButton = styled.button`
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