"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tweenTransition = {
  type: "tween",
  duration: 0.6,
  ease: "easeInOut",
  repeat: Infinity,
};

interface ChatLoaderProps {
  user?: boolean;
}

const ChatLoader: React.FC<ChatLoaderProps> = ({ user }) => {
  return (
    <span className="flex max-w-xs items-center space-x-1 rounded-2xl py-2">
      <motion.span
        className={cn(
          "h-2 w-2 rounded-full",
          user ? "bg-zinc-100" : "bg-zinc-500",
        )}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ ...tweenTransition, delay: 0 }}
      />
      <motion.span
        className={cn(
          "h-2 w-2 rounded-full",
          user ? "bg-zinc-300" : "bg-zinc-700",
        )}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ ...tweenTransition, delay: 0.2 }}
      />
      <motion.span
        className={cn(
          "h-2 w-2 rounded-full",
          user ? "bg-white" : "bg-foreground",
        )}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ ...tweenTransition, delay: 0.4 }}
      />
    </span>
  );
};

export default ChatLoader;
