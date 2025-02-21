"use client";

import { useEffect, useRef } from "react";
import ChatLoader from "@/composables/ChatLoader";
import TextBounce from "@/composables/TextBounce";
import { useChat } from "@/composables/chat";

const ChatSidebar = () => {
  const { state } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.messages]);

  return (
    <section className="h-full flex flex-col flex-1">
      <div
        className="flex-1 overflow-y-auto"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <div className="space-y-8 p-4 md:p-8 ">
          {state.messages.map((msg) => (
            <TextBounce
              key={msg.id}
              direction={msg.sender === "user" ? "right" : "left"}
              timestamp={msg.timestamp}
              detectedLanguage={msg.detectedLanguage}
            >
              {msg.sender === "ai" && msg.loading ? <ChatLoader /> : msg.text}
            </TextBounce>
          ))}
          {/* Anchor for scroll effect */}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </section>
  );
};

export default ChatSidebar;
