// ChatBot.styled.ts
import styled from "styled-components";

// 전체 챗봇 래퍼
export const ChatBotWrapper = styled.section`
  width: 340px;
  height: 600px;
  background: ${({ theme }) => theme.colors.secondary};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  bottom: 14px;
  right: 312px;
`;

// 사이드바(햄버거 등) 아이콘
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

// 전체 대화 영역 (스크롤)
export const ChatArea = styled.div`
  width: 315px;
  height: 674px;
  margin: 20px auto 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
  color: #222;
  padding-right: 5px;
  margin-right: 10px;

  /* 스크롤바 숨기기 (선택) */
  &::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #eee;
    border-radius: 8px;
  }
`;

// 각 메시지 행(유저/챗봇 말풍선 정렬)
export const BubbleRow = styled.div<{ isUser?: boolean }>`
  display: flex;
  justify-content: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
`;

// 말풍선
export const ChatBubble = styled.div<{ isUser?: boolean }>`
  max-width: 70%;
  min-width: 48px;
  min-height: 32px;
  padding: 10px 18px;
  border-radius: 18px;
  background: ${({ isUser }) => (isUser ? "#B5EAD7" : "#F0F8FF")};
  border: 1px solid ${({ isUser }) => (isUser ? "#F0F8FF" : "#B5EAD7")};
  color: #222;
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
  font-weight: 500;
  word-break: break-all;
  margin: 4px 0;
  align-self: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  box-shadow: 0 1px 8px rgba(150,150,180,0.05);
  transition: background 0.2s, border 0.2s;
`;

// 입력창 전체 (폼)
export const ChatInputBox = styled.form`
  width: 95%;
  min-height: 90px;
  max-height: 200px;
  margin: 20px auto;
  display: flex;
  flex-direction: column; /* 세로로 쌓기 */
  align-items: stretch;
  background: #F0F8FF;
  border: 1px solid #CDE6F5;
  border-radius: 40px;
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
  font-size: 14px;
  font-family: 'Quicksand', sans-serif;
  color: #222;
  padding: 6px auto;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddeef5;
    border-radius: 10px;
  }
`;

export const IconsRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px;
`;

export const AddIconButton = styled.button`
  color: #CDE6F5;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg { width: 20px; height: 20px; }
`;

export const SendIconButton = styled(AddIconButton)``;
