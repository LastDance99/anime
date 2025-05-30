// ChatBot.styled.ts
import styled from "styled-components";

// 전체 챗봇 래퍼
export const ChatBotWrapper = styled.section<{ bgImg?: string }>`
  width: 340px;
  height: 715px;
  background: ${({ bgImg }) =>
    bgImg
      ? `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${bgImg}) center/cover no-repeat`
      : "#fff"};
  border: 1px solid #FFB6C1;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  /* 스크롤바 숨기기 (선택) */
  &::-webkit-scrollbar { width: 5px; background: transparent; }
  &::-webkit-scrollbar-thumb { background: #eee; border-radius: 8px; }
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
  position: absolute;
  left: 0; right: 0; bottom: 16px;
  width: 95%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F0F8FF;
  border: 1px solid #CDE6F5;
  border-radius: 40px;
  height: 54px;
  padding: 0 18px;
  box-sizing: border-box;
  z-index: 2;
`;

// 입력창 텍스트 인풋
export const ChatInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  height: 40px;
  font-size: 16px;
  font-family: 'Quicksand', sans-serif;
  padding: 0 10px;
  color: #222;
`;

// 입력창 왼쪽(추가) 아이콘 버튼
export const AddIconButton = styled.button`
  width: 16px;
  height: 18px;
  border: 1px solid #CDE6F5;
  background: #F0F8FF;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  cursor: pointer;
`;

// 입력창 오른쪽(전송) 아이콘 버튼
export const SendIconButton = styled.button`
  width: 16px;
  height: 18px;
  border: 1px solid #CDE6F5;
  background: #F0F8FF;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  cursor: pointer;
`;

