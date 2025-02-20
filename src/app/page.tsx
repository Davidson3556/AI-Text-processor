"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import  ChatCard from "@/components/ChatCard";
import ChatSidebar from "@/components/ChatSidebar";
import { ChatSource }  from "@/composables/chat";
import Loading from "@/components/Loading";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    
    <div className=" content-end ">
    <AnimatePresence mode="wait">
      {isLoading ? (
        <Loading />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChatSource>
            <ChatSidebar />
            <ChatCard />
          </ChatSource>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
}
