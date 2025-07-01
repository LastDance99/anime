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
  ResetButton,
} from "./ChatBot.styled";
import { Menu, Plus, Play, RotateCw } from "lucide-react";
import { chatWithBot, clearChatContext } from "../../api/core";

type Props = {
  visible: boolean;
};

type ChatMessage = {
  id: number;
  text: string;
  isUser: boolean;
  imageUrl?: string;
  mode?: "info" | "chat" | "policy";
};

const initialMessages: ChatMessage[] = [
  { id: 1, text: "ㅎㅇ", isUser: false },
];

export default function ChatBot({ visible }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [dialogContext, setDialogContext] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);

  const handleSend = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      text: input,
      isUser: true,
    };

    const loadingMessage: ChatMessage = {
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

      console.log("📦 응답:", res.data);
      console.log("📸 이미지 URL:", res.data.cover_image); 

      const { final_answer, mode, cover_image } = res.data;

      const botMessage: ChatMessage = {
        id: Date.now() + 2,
        text: final_answer || "⚠️ 답변 없음",
        isUser: false,
        mode,
        ...(mode === "info" && cover_image ? { imageUrl: cover_image } : {}),
      };

      setMessages((prev) =>
        prev.filter((m) => m.id !== loadingMessage.id).concat(botMessage)
      );

      setDialogContext((prev) => [
        ...prev,
        { role: "user" as const, content: input },
        { role: "assistant" as const, content: final_answer },
      ].slice(-40));
    } catch (error) {
      console.error("챗봇 오류:", error);
      const errorMessage: ChatMessage = {
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
      await clearChatContext();
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
      <ChatArea ref={chatAreaRef}>
        {messages.map((msg) => (
          <BubbleRow isUser={msg.isUser} key={msg.id}>
            <ChatBubble isUser={msg.isUser}>
              {msg.imageUrl && (
                <img
                  src={msg.imageUrl}
                  alt="정보 이미지"
                  style={{
                    width: 150,
                    borderRadius: 12,
                    margin: "8px 0",
                  }}
                />
              )}
              {msg.text}
            </ChatBubble>
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