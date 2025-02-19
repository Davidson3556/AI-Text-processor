"use client";
import  ChatCard from "@/components/ChatCard";
import ChatSidebar from "@/components/ChatSidebar";
import { ChatSource }  from "@/composables/chat";



export default function Home() {
  return (
    <div className="content-grid min-h-[calc(100svh-5rem)] content-end pb-4">
      <ChatSource>
        <ChatSidebar />
        <ChatCard />
      </ChatSource>
    </div>
  );
}
