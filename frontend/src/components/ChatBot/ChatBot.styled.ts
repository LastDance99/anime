import styled from "styled-components";

// 전체 챗봇 래퍼
export const ChatBotWrapper = styled.section<{ $visible: boolean }>`
  width: 380px;
  height: 600px;
  background: ${({ theme }) => theme.colors.secondary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 98;
  border-radius: 20px;

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? "translateY(0)" : "translateY(20px)"};
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition: opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease;
`;

// 햄버거 등 사이드 아이콘
export const SidebarIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 16px;
  height: 12px;
  z-index: 2;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

// 대화 영역
export const ChatArea = styled.div`
  width: 355px;
  height: 674px;
  margin: 20px auto 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: ${({ theme }) => theme.Weights.medium};
  color: ${({ theme }) => theme.colors.text};
  padding-right: 5px;
  margin-right: 10px;

  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.subcolor};
    border-radius: 8px;
  }
`;

export const BubbleRow = styled.div<{ isUser?: boolean }>`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
`;

export const ChatBubble = styled.div<{ isUser?: boolean }>`
  max-width: 80%;
  min-width: 48px;
  min-height: 32px;
  padding: 10px 18px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ isUser, theme }) =>
    isUser ? "#B5EAD7" : theme.colors.subcolor};
  border: 1px solid
    ${({ isUser, theme }) => (isUser ? theme.colors.subcolor : "#B5EAD7")};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.main};
  font-weight: ${({ theme }) => theme.Weights.medium};
  word-break: break-word;
  margin: 4px 0;
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  box-shadow: 0 1px 8px rgba(150, 150, 180, 0.05);
  transition: background 0.2s, border 0.2s;
`;

export const ChatInputBox = styled.form`
  width: 95%;
  min-height: 90px;
  max-height: 200px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  padding: 18px 22px 14px 22px;
  box-sizing: border-box;
  gap: 4px;
`;

export const ChatInputArea = styled.textarea`
  width: 100%;
  min-height: 40px;
  max-height: 80px;
  resize: none;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text};
  padding: 6px 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
  }
`;

export const IconsRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
`;

export const AddIconButton = styled.button`
  color: ${({ theme }) => theme.colors.bordermain};
  background: transparent;
  border-radius: 8px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const SendIconButton = styled(AddIconButton)`
  margin-left: 4px;
`;

export const ResetButton = styled(AddIconButton)`
  margin: 0 8px;
  color: ${({ theme }) => theme.colors.bordermain};
`;


export const DropdownMenu = styled.div`
  position: absolute;
  bottom: 48px;
  left: 20px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  z-index: 99;
  overflow: hidden;
`;

export const DropdownItem = styled.button`
  width: 160px;
  padding: 10px 16px;
  background: white;
  border: none;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.subcolor};
  }
`;

export const ToolOverlay = styled.div`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 340px;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.Weights.medium};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ToolOverlayInput = styled.textarea`
  width: 100%;
  min-height: 60px;
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.bordermain};
  border-radius: 8px;
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text};
  background: white;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ToolOverlayActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  button {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:first-of-type {
      background: ${({ theme }) => theme.colors.subcolor};
      color: ${({ theme }) => theme.colors.text};
    }

    &:last-of-type {
      background: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }
`;