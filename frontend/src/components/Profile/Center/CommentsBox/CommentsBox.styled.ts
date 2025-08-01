import styled from "styled-components";

export const CommentsBox = styled.div`
  width: 410px;
  display: flex;
  flex-direction: column;
`;

export const CommentsTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CommentsTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const CommentAddButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  color: #ff3d6c;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export const ChatContentBox = styled.div`
  width: 100%;
  max-height: 300px;
  background: transparent;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ChatScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  display: flex;
  padding-right: 6px;
  margin-right: -6px;
  flex-direction: column;
  gap: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.bordermain};
    border-radius: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ChatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  padding: 8px 10px;
`;

export const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ChatTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  max-width: 260px;
`;

export const ChatNickname = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.Weights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const ChatText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

export const ChatInputWrapper = styled.div`
  width: 100%;
  height: 40px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  margin: 12px auto 0;
`;

export const ChatInput = styled.input`
  width: 100%;
  height: 80%;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.md};
  background: transparent;
  outline: none;
  padding: 0 8px;
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text};
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.subtext};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  width: 100%;
  max-width: 40px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;