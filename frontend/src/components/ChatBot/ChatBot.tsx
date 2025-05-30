import React, { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import {
  ChatBotWrapper,
  SidebarIcon,
  ChatArea,
  BubbleRow,
  ChatBubble,
  ChatInputBox,
  ChatInput,
  AddIconButton,
  SendIconButton,
} from "./ChatBot.styled";

// 초기 더미 메시지
const initialMessages = [
  { id: 1, text: "안녕하세요!", isUser: false },
  { id: 2, text: "무엇을 도와드릴까요?", isUser: false },
];

export default function ChatBot({ bgImg }: { bgImg?: string }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const chatAreaRef = useRef<HTMLDivElement>(null);

  // 입력 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  // 메시지 전송(엔터/버튼)
  const handleSend = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    // 유저 메시지 추가
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, isUser: true }
    ]);
    setInput("");

    // 챗봇 응답 예시 (1초 후)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "챗봇 자동응답 예시입니다.", isUser: false }
      ]);
    }, 1000);
  };

  // 엔터 키로 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  // 메시지 추가 시 맨 아래로 스크롤
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatBotWrapper bgImg={bgImg}>
      <SidebarIcon>
        {/* 예시: 햄버거 아이콘 */}
        <span>≡</span>
      </SidebarIcon>
      <ChatArea ref={chatAreaRef}>
        {messages.map((msg) => (
          <BubbleRow isUser={msg.isUser} key={msg.id}>
            <ChatBubble isUser={msg.isUser}>{msg.text}</ChatBubble>
          </BubbleRow>
        ))}
      </ChatArea>
      <ChatInputBox onSubmit={handleSend}>
        <AddIconButton type="button">＋</AddIconButton>
        <ChatInput
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
        />
        <SendIconButton type="submit">➤</SendIconButton>
      </ChatInputBox>
    </ChatBotWrapper>
  );
}
