import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ChatBot from "../components/ChatBot/ChatBot";
import ChatToggleButton from "../components/ChatBot/ChatToggleButton";

export default function ChatbotLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatBot = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <>
      <Outlet />
      <ChatToggleButton onClick={toggleChatBot} />
      <ChatBot visible={isOpen} />
    </>
  );
}