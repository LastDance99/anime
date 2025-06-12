import styled from "styled-components";

export const SectionTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

export const LoadMoreButton = styled.button`
  margin: 24px 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  min-height: 36px;

  &:hover .toggle-line {
    border-color: #fdafd8;
  }
`;

export const ToggleLine = styled.span`
  flex: 1;
  border-bottom: 1.5px solid #f99;
  margin: 0 10px;
  transition: border-color 0.15s;
  height: 0;
`;