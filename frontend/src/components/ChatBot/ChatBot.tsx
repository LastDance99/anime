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
  ResetButton, // 👈 새로 추가했다면 스타일도 정의 필요
} from "./ChatBot.styled";
import { Menu, Plus, Play, RotateCw } from "lucide-react";
import { chatWithBot, clearChatContext } from "../../api/core"; // clearChatContext는 선택

type Props = {
  visible: boolean;
};

const initialMessages = [
  { id: 1, text: "안녕하세요!", isUser: false },
  { id: 2, text: "무엇을 도와드릴까요?", isUser: false },
];

export default function ChatBot({ visible }: Props) {
  const [messages, setMessages] = useState(initialMessages);
  const [dialogContext, setDialogContext] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);

  const handleSend = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      isUser: true,
    };

    const loadingMessage = {
      id: Date.now() + 1,
      text: "🤖 답변 생성 중...",
      isUser: false,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await chatWithBot({
        question: input,
        dialog_context: dialogContext,
      });

      const botText = res.data.final_answer || "⚠️ 답변 없음";
      const botMessage = {
        id: Date.now() + 2,
        text: botText,
        isUser: false,
      };

      // 메시지 반영
      setMessages((prev) =>
        prev.filter((m) => m.id !== loadingMessage.id).concat(botMessage)
      );

      // context 슬라이딩 윈도우 유지 (최대 20턴 = 40줄)
      setDialogContext((prev) => [
          ...prev,
          { role: "user", content: input } as const,
          { role: "assistant", content: botText } as const,
        ].slice(-40));
      } catch (error) {
        console.error("챗봇 오류:", error);
        const errorMessage = {
          id: Date.now() + 3,
          text: "⚠️ 서버 오류로 챗봇 응답을 받을 수 없음",
          isUser: false,
        };

        setMessages((prev) =>
          prev.filter((m) => m.id !== loadingMessage.id).concat(errorMessage)
        );
      } finally {
        setIsLoading(false);
      }
    };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = async () => {
    setMessages(initialMessages);
    setDialogContext([]);
    setInput("");
    try {
      await clearChatContext(); // 서버 context도 초기화 (API 존재 시)
    } catch (err) {
      console.warn("서버 초기화 실패 (무시 가능)");
    }
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatBotWrapper $visible={visible}>
      {/* <SidebarIcon>
        <Menu size={20} />
      </SidebarIcon> */}

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
          disabled={isLoading}
        />
        <IconsRow>
          <AddIconButton type="button" disabled={isLoading}>
            <Plus />
          </AddIconButton>
          <ResetButton type="button" onClick={handleReset}>
            <RotateCw />
          </ResetButton>
          <SendIconButton type="submit" disabled={isLoading}>
            <Play />
          </SendIconButton>
        </IconsRow>
      </ChatInputBox>
    </ChatBotWrapper>
  );
}