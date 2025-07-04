import React, { useState, useRef, useEffect } from "react";
import type { FormEvent } from "react";
import {
  ChatBotWrapper,
  ChatArea,
  BubbleRow,
  ChatBubble,
  ChatInputBox,
  ChatInputArea,
  IconsRow,
  AddIconButton,
  SendIconButton,
  ResetButton,
  DropdownMenu,
  DropdownItem,
} from "./ChatBot.styled";
import { Plus, Play, RotateCw } from "lucide-react";
import {
  chatWithBot,
  clearChatContext,
  getAnimeRecommendation,
} from "../../api/core";
import { getUserContent } from "../../api/profile";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
};

type ChatMessage = {
  id: number;
  text?: string;
  isUser: boolean;
  imageUrl?: string;
  mode?: "info" | "chat" | "policy" | "recommend";
  results?: any[];
};

const STORAGE_KEY = "chatbot_messages";

export default function ChatBot({ visible }: Props) {
  const { currentUser } = useAuth();
  const { t, i18n } = useTranslation();
  const lang = i18n.language.split("-")[0];

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [dialogContext, setDialogContext] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToolMenu, setShowToolMenu] = useState(false);

  const chatAreaRef = useRef<HTMLDivElement>(null);
  const userMsgRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInput(e.target.value);

  // ✅ 복원: loading 메시지는 복구하지 않음
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter(
            (m: ChatMessage) => m.text !== t("chat.loading") && !(!m.isUser && !m.text)
          );
          if (cleaned.length > 0) {
            setMessages(cleaned);
            return;
          }
        }
      } catch {}
    }

    const welcomeText = currentUser?.nickname
      ? `${t("chat.welcome_first")} ${currentUser.nickname} ${t("chat.welcome_last")}`
      : t("chat.welcome");
    setMessages([{ id: 1, text: welcomeText, isUser: false }]);
  }, [t, currentUser]);

  // ✅ 저장
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

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
      text: t("chat.loading"),
      isUser: false,
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await chatWithBot({
        question: input,
        dialog_context: dialogContext,
        lang,
      });
      const { final_answer, mode, cover_image } = res.data;

      const botMessage: ChatMessage = {
        id: Date.now() + 2,
        text: final_answer || t("chat.no_answer"),
        isUser: false,
        mode,
        ...(mode === "info" && cover_image ? { imageUrl: cover_image } : {}),
      };

      setMessages((prev) =>
        prev.filter((m) => m.id !== loadingMessage.id).concat(botMessage)
      );
      setDialogContext((prev) =>
        [
          ...prev,
          { role: "user" as const, content: input },
          { role: "assistant" as const, content: final_answer },
        ].slice(-40)
      );
    } catch {
      setMessages((prev) =>
        prev.filter((m) => m.id !== loadingMessage.id).concat({
          id: Date.now() + 3,
          text: t("chat.server_error"),
          isUser: false,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecommend = async () => {
    if (!currentUser?.id) return;

    const loadingMessage: ChatMessage = {
      id: Date.now(),
      text: t("chat.recommend_loading"),
      isUser: false,
    };
    setMessages((prev) => [...prev, loadingMessage]);
    setIsLoading(true);

    try {
      const content = await getUserContent({
        userId: currentUser.id,
        type: "anime",
        page_size: 999,
      });
      const animeTitles = content.results.map((item: any) => item.title).filter(Boolean);

      const res = await getAnimeRecommendation({
        anime_titles: animeTitles,
        language: lang,
      });

      setMessages((prev) =>
        prev.filter((m) => m.id !== loadingMessage.id).concat({
          id: Date.now() + 1,
          isUser: false,
          mode: "recommend",
          results: res,
          text: res.message ?? t("chat.recommend_done"),
        })
      );
    } catch {
      setMessages((prev) =>
        prev.filter((m) => m.id !== loadingMessage.id).concat({
          id: Date.now() + 3,
          text: t("chat.recommend_fail"),
          isUser: false,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    const welcomeText = currentUser?.nickname
      ? `${t("chat.welcome_first")} ${currentUser.nickname} ${t("chat.welcome_last")}`
      : t("chat.welcome");
    const welcomeMsg = { id: Date.now(), text: welcomeText, isUser: false };
    setMessages([welcomeMsg]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([welcomeMsg]));
    setDialogContext([]);
    setInput("");
    try {
      await clearChatContext();
    } catch {}
  };

  useEffect(() => {
    if (!userMsgRef.current) return;

    userMsgRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [messages]);

  return (
    <ChatBotWrapper $visible={visible}>
      <ChatArea ref={chatAreaRef}>
        {messages.map((msg) => {
          const lastUser = [...messages].reverse().find((m) => m.isUser);
          const isLastUserMsg = msg.isUser && lastUser?.id === msg.id;

          return (
            <BubbleRow
              isUser={msg.isUser}
              key={msg.id}
              ref={isLastUserMsg ? userMsgRef : null}
            >
              <ChatBubble isUser={msg.isUser}>
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="img"
                    style={{ width: 150, borderRadius: 8, marginBottom: 8 }}
                  />
                )}
                <div
                  dangerouslySetInnerHTML={{ __html: msg.text ?? "" }}
                  style={{ whiteSpace: "pre-wrap" }}
                />
                {msg.mode === "recommend" &&
                  msg.results?.map((r) => (
                    <div key={r.title} style={{ marginTop: 8 }}>
                      {r.title}
                    </div>
                  ))}
              </ChatBubble>
            </BubbleRow>
          );
        })}
      </ChatArea>

      <ChatInputBox onSubmit={handleSend}>
        <ChatInputArea
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) handleSend(e);
          }}
          placeholder={t("chat.input_placeholder")}
          disabled={isLoading}
        />
        <IconsRow>
          <AddIconButton
            type="button"
            onClick={() => setShowToolMenu((prev) => !prev)}
            disabled={isLoading}
          >
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

      {showToolMenu && (
        <DropdownMenu>
          <DropdownItem
            onClick={() => {
              setShowToolMenu(false);
              handleRecommend();
            }}
          >
            {t("chat.recommend_tool")}
          </DropdownItem>
        </DropdownMenu>
      )}
    </ChatBotWrapper>
  );
}