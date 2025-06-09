import styled from "styled-components";

export const IntroductionBox = styled.div`
  width: 410px;
  height: 200px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  padding: 10px;
`;

export const ProfileButton = styled.button`
  align-self: flex-end;
  padding: 6px 16px;
  border-radius: 8px;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: #FF3D6C;
  font-weight: ${({ theme }) => theme.Weights.medium};
  cursor: pointer;
  margin-top: 8px;
  &:hover {
    background: #FFB6C1;
  }
`;

export const IntroTextArea = styled.textarea`
  flex: 1;
  resize: none;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border:none;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.main};
  outline: none;
  border: none;
`;

export const IntroParagraph = styled.p`
  flex: 1;
  max-height: 140px;
  margin: 0;
  white-space: pre-wrap;
  font-size: ${({ theme }) => theme.fontSizes.md};
`;