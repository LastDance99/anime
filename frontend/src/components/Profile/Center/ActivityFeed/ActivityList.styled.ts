import styled from "styled-components";

export const SectionTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

export const LoadMoreButton = styled.button`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  min-height: 36px;

  &:hover .toggle-line {
    border-color: ${({ theme }) => theme.colors.bordermain};
  }
`;

export const ToggleLine = styled.span`
  flex: 1;
  border-bottom: 1.5px solid ${({ theme }) => theme.colors.secondary};
  margin: 0 10px;
  height: 0;
  transition: border-color 0.15s;
`;


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  padding-bottom: 40px;
`;

export const EndText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.subtext};
  padding: 0 12px;
`;