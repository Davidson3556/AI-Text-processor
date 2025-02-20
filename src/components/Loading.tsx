"use client";
import { motion } from "framer-motion";

export const LogoIcon = ({ className }: { className?: string }) => (
    <img
    src="https://res.cloudinary.com/olawale/image/upload/v1740072561/DPT_df67ex.png"
    alt="Logo"
    className={`${className} rounded-full`}

  />
);

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <LogoIcon className="h-24 w-24 text-primary" />
      </motion.div>
    </div>
  );
}