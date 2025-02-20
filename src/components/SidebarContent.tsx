"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/lib/useMobileLayout";
import { useSidebar } from "@/composables/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/components/Loading";
import Link from "next/link";
import {
  HomeIcon,
  LanguagesIcon,
  ScrollTextIcon,
  SparklesIcon,
  XIcon
} from "lucide-react";

const menuItems = [
  { label: "Home", icon: <HomeIcon className="h-5 w-5" />, href: "/" },
  { label: "About Project", icon: <LanguagesIcon className="h-5 w-5" />, href: "/about" },
  { label: "Github Repo", icon: <ScrollTextIcon className="h-5 w-5" />, href: "https://github.com/Davidson3556/AI-Text-processor" },
];

const SidebarContent = () => {
  const { isOpen, closeSidebar } = useSidebar();
  const isMobile = useIsMobile();

  return (
    <AnimatePresence>
      {(isOpen || !isMobile) && (
        <motion.nav
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed md:relative h-screen bg-[#F4F4F4] border-r z-50", // Changed to h-screen
            "w-64 px-4 py-6",
            "md:translate-x-0 md:shadow-none"
          )}
        >
          {/* Close button for mobile */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={closeSidebar}
              className="absolute right-2 top-2"
              aria-label="Close sidebar"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center px-4 gap-2"
          >
            <LogoIcon className="h-8 w-8 text-primary" />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-lg font-bold"
                >
                  DPT
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <div className="space-y-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                href={item.href}
              />
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

const SidebarItem = ({ icon, label, href }: { 
  icon: React.ReactNode;
  label: string;
  href: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const { closeSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const handleClick = () => {
    if (isMobile) closeSidebar();
  };

  return (
    <Link href={href} passHref legacyBehavior>
      <Button
        asChild
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 rounded-lg px-3 py-2 text-sm",
          "transition-colors hover:bg-accent",
          isFocused && "bg-accent/50"
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onClick={handleClick}
      >
        <a>
          <span className={cn("flex size-8 items-center justify-center")}>
            {icon}
          </span>
          <span className={cn("truncate", isFocused && "font-medium")}>
            {label}
          </span>
        </a>
      </Button>
    </Link>
  );
};

export default SidebarContent;