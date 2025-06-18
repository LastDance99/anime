import React, { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import {
  ChatBotWrapper,
  SidebarIcon,
  ChatArea,
  BubbleRow,
  ChatBubble,
  ChatInputBox,
  ChatInputArea,
  IconsRow,
  AddIconButton,
  SendIconButton,
} from "./ChatBot.styled";
import { Menu, Plus, Play } from "lucide-react";

type Props = {
  visible: boolean;
};

const initialMessages = [
  { id: 1, text: "안녕하세요!", isUser: false },
  { id: 2, text: "무엇을 도와드릴까요?", isUser: false },
];

export default function ChatBot({ visible }:Props ) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);

  const handleSend = (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { id: Date.now(), text: input, isUser: true }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: "챗봇 자동응답 예시입니다.", isUser: false },
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatBotWrapper $visible={visible}>
      <SidebarIcon>
        <Menu size={20} />
      </SidebarIcon>

      <ChatArea ref={chatAreaRef}>
        {messages.map((msg) => (
          <BubbleRow isUser={msg.isUser} key={msg.id}>
            <ChatBubble isUser={msg.isUser}>{msg.text}</ChatBubble>
          </BubbleRow>
        ))}
      </ChatArea>

      <ChatInputBox onSubmit={handleSend}>
        <ChatInputArea
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
        />
        <IconsRow>
          <AddIconButton type="button">
            <Plus />
          </AddIconButton>
          <SendIconButton type="submit">
            <Play />
          </SendIconButton>
        </IconsRow>
      </ChatInputBox>
    </ChatBotWrapper>
  );
}