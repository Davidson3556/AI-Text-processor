import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getLanguageName } from "@/utils/langName";
import { formatTime } from "@/utils/timeFormat";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TextBounceProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  timestamp?: number;
  detectedLanguage?: string;
}

const TextBounce: React.FC<TextBounceProps> = ({
  children,
  direction = "right",
  timestamp,
  detectedLanguage,
}) => {
  const right = direction === "right";

  return (
    <article
      className={cn(
        "relative flex w-fit max-w-[33.5rem] items-start justify-start gap-4",
        right && "ml-auto flex-row-reverse",
      )}
    >
      <Avatar>
        <AvatarImage src="https://res.cloudinary.com/olawale/image/upload/v1740060048/avatar_ub4tnx.svg" />
        <AvatarFallback>D</AvatarFallback>
      </Avatar>

      <motion.div
        className={cn(
          "flex flex-col gap-1 rounded-2xl border bg-background p-3",
          right && "border-accent bg-sidebar pr-3 ",
        )}
        initial={{ boxShadow: "0 0 0px rgba(99, 102, 241, 0)" }}
        animate={{
          boxShadow: [
            "0 0 0px rgba(99, 102, 241, 0)",
            "0 0 15px rgba(99, 102, 241, 0.3)",
            "0 0 0px rgba(99, 102, 241, 0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        {children}

        {/* Chat Timestamp */}
        <span
          className={cn(
            "ml-auto flex items-center gap-2 pr-1.5 text-xs font-medium ",
            right && "",
          )}
        >
          {formatTime(timestamp)}{" "}
          <span
            className={cn(
              "inline-block size-1.5 rounded-full bg-foreground-op",
              right && "bg-accent/50",
            )}
          ></span>
        </span>
      </motion.div>

      {/* Display the detected language */}
      {detectedLanguage && (
        <p
          className={cn(
            "absolute top-full mt-1 text-sm lowercase text-gray-500",
            right ? "right-16" : "left-16",
          )}
        >
          {getLanguageName(detectedLanguage)}
        </p>
      )}
    </article>
  );
};

export default TextBounce;
