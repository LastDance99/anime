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
  ToolOverlay,
  ToolOverlayInput,
  ToolOverlayActions,
} from "./ChatBot.styled";
import { Plus, Play, RotateCw } from "lucide-react";
import {
  chatWithBot,
  clearChatContext,
  getAnimeRecommendation,
  generateImage,
} from "../../api/core";
import { getUserContent } from "../../api/profile";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const RecommendCard = ({
  title,
  description,
  cover_image,
  genres,
  year,
  format,
  studios,
}: any) => (
  <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12, marginBottom: 12 }}>
    <img src={cover_image} alt={title} style={{ width: "100%", borderRadius: 8, marginBottom: 8 }} />
    <h4 style={{ margin: "4px 0" }}>{title}</h4>
    <p style={{ fontSize: 14, margin: "6px 0", color: "#555" }} dangerouslySetInnerHTML={{ __html: description }} />
    <p style={{ fontSize: 13, margin: "4px 0", color: "#888" }}>
      📅 <strong>{year ?? "?"}</strong> | 🏷️ {format ?? "형식 없음"}
    </p>
    <p style={{ fontSize: 13, margin: "4px 0", color: "#888" }}>
      🎬 스튜디오: {studios?.length ? studios.join(", ") : "정보 없음"}
    </p>
    <p style={{ fontSize: 13, margin: "4px 0", color: "#888" }}>
      🎭 장르: {genres?.length ? genres.join(", ") : "정보 없음"}
    </p>
  </div>
);

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

const initialMessages: ChatMessage[] = [
  { id: 1, text: "ㅎㅇ", isUser: false },
];

export default function ChatBot({ visible }: Props) {
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [dialogContext, setDialogContext] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToolMenu, setShowToolMenu] = useState(false);
  const [activeTool, setActiveTool] = useState<null | "image">(null);
  const [toolInput, setToolInput] = useState("");
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value);

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
      const res = await chatWithBot({ question: input, dialog_context: dialogContext });
      const { final_answer, mode, cover_image } = res.data;

      const botMessage: ChatMessage = {
        id: Date.now() + 2,
        text: final_answer || t("chat.no_answer"),
        isUser: false,
        mode,
        ...(mode === "info" && cover_image ? { imageUrl: cover_image } : {}),
      };

      setMessages((prev) => prev.filter((m) => m.id !== loadingMessage.id).concat(botMessage));
      setDialogContext((prev) =>
        [
          ...prev,
          { role: "user" as const, content: input },
          { role: "assistant" as const, content: final_answer },
        ].slice(-40)
      );
    } catch (err) {
      setMessages((prev) => prev.filter((m) => m.id !== loadingMessage.id).concat({
        id: Date.now() + 3,
        text: t("chat.server_error"),
        isUser: false,
      }));
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
      const content = await getUserContent({ userId: currentUser.id, type: "anime", page_size: 999 });
      const animeTitles = content.results.map((item: any) => item.title).filter(Boolean);
      const res = await getAnimeRecommendation({ anime_titles: animeTitles });
      setMessages((prev) => prev.filter((m) => m.id !== loadingMessage.id).concat({
        id: Date.now() + 1,
        isUser: false,
        mode: "recommend",
        results: res,
        text: res.message ?? t("chat.recommend_done"),
      }));
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== loadingMessage.id).concat({
        id: Date.now() + 3,
        text: t("chat.recommend_fail"),
        isUser: false,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleToolSubmit = async () => {
    const loadingMessage: ChatMessage = {
      id: Date.now(),
      text: t("chat.image_loading"),
      isUser: false,
    };
    setMessages((prev) => [...prev, loadingMessage]);
    setToolInput("");
    setActiveTool(null);
    setIsLoading(true);

    try {
      const res = await generateImage(toolInput);
      setMessages((prev) => prev.filter((m) => m.id !== loadingMessage.id).concat({
        id: Date.now() + 1,
        isUser: false,
        imageUrl: res.image_url,
        text: t("chat.image_done"),
      }));
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== loadingMessage.id).concat({
        id: Date.now() + 2,
        text: t("chat.image_fail"),
        isUser: false,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    setMessages(initialMessages);
    setDialogContext([]);
    setInput("");
    try {
      await clearChatContext();
    } catch {}
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
              {msg.imageUrl && <img src={msg.imageUrl} alt="img" style={{ width: 150, borderRadius: 8, marginBottom: 8 }} />}
              {msg.text && (
                <div
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              )}
              {msg.mode === "recommend" && msg.results?.map((r) => (
                <RecommendCard key={r.title} {...r} />
              ))}
            </ChatBubble>
          </BubbleRow>
        ))}
      </ChatArea>

      {activeTool === "image" && (
        <ToolOverlay>
          <label>{t("chat.image_tool_title")}</label>
          <ToolOverlayInput
            value={toolInput}
            onChange={(e) => setToolInput(e.target.value)}
            placeholder={t("chat.image_tool_placeholder")}
          />
          <ToolOverlayActions>
            <button onClick={() => setActiveTool(null)}>{t("chat.cancel")}</button>
            <button onClick={handleToolSubmit}>{t("chat.submit")}</button>
          </ToolOverlayActions>
        </ToolOverlay>
      )}

      <ChatInputBox onSubmit={handleSend}>
        <ChatInputArea
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) handleSend(e); }}
          placeholder={t("chat.input_placeholder")}
          disabled={isLoading}
        />
        <IconsRow>
          <AddIconButton type="button" disabled={isLoading} onClick={() => setShowToolMenu((prev) => !prev)}>
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
          <DropdownItem onClick={() => { setActiveTool("image"); setShowToolMenu(false); }}>{t("chat.image_tool")}</DropdownItem>
          <DropdownItem onClick={() => { setShowToolMenu(false); handleRecommend(); }}>{t("chat.recommend_tool")}</DropdownItem>
        </DropdownMenu>
      )}
    </ChatBotWrapper>
  );
}
