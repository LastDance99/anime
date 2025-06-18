import styled from "styled-components";

export const SearchBox = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 4px 12px;
  border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm}; // 12px
  outline: none;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  font-family: ${({ theme }) => theme.fonts.main};
`;