"use client";

import { useEffect, useRef, useState } from "react";
import { SendHorizontal, Mic, MicOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslator } from "@/lib/useTranslation";
import { useSummary } from "@/lib/useSummary";
import { useLanguageDetection } from "@/lib/useLanguagedetector";
import { type FormData, FormSchema } from "@/utils/chatbox";
import { languages } from "@/constants/allLanguage";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

function ChatBox() {
  const actionRef = useRef<"translate" | "summarize">("translate");
  const { handleTranslator } = useTranslator();
  const { handleSummary } = useSummary();
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef<any>(null);
  const [browserSupport, setBrowserSupport] = useState(true);

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: { chat: "", language: "en" },
  });

  const {
    watch,
    formState: { isSubmitting },
  } = form;

  const [detectedLanguage, setDetectedLanguage] = useState<string>("");
  const { detectLanguage } = useLanguageDetection();

  const chatValue = watch("chat");
  const tooLong = chatValue.length > 150;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = true;

        recognition.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          
          form.setValue('chat', transcript);
        };

        recognition.current.onerror = () => {
          setIsListening(false);
        };
      } else {
        setBrowserSupport(false);
      }
    }
  }, []);

  useEffect(() => {
    const detectChatLanguage = async () => {
      if (chatValue.trim().length > 0) {
        try {
          const detected = await detectLanguage(chatValue);
          setDetectedLanguage(detected || "");
        } catch {
          setDetectedLanguage("");
        }
      } else {
        setDetectedLanguage("");
      }
    };

    const timer = setTimeout(detectChatLanguage, 500);
    return () => clearTimeout(timer);
  }, [chatValue, detectLanguage]);

  const toggleMicrophone = () => {
    if (isListening) {
      recognition.current?.stop();
    } else {
      recognition.current?.start();
    }
    setIsListening(!isListening);
  };

  const notEnglish = detectedLanguage !== "en";

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    form.reset({ chat: "", language: data.language });

    if (actionRef.current === "translate") {
      await handleTranslator(data);
    } else if (actionRef.current === "summarize") {
      await handleSummary(data);
    }
  }

  return (
    <Form {...form}>
      <div className="w-full bg-sidebar pt-4 shadow-t border-t">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-4xl rounded-t-3xl bg-sidebar px-4 pb-4"
        >
          <FormField
            control={form.control}
            name="chat"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <div className="relative">
                    <Textarea
                      placeholder="What do you want to do?"
                      className="resize-none bg-background pr-12"
                      {...field}
                      onKeyDown={(e) => {
                        if (
                          window.innerWidth >= 640 &&
                          e.key === "Enter" &&
                          !e.shiftKey
                        ) {
                          e.preventDefault();
                          form.handleSubmit(onSubmit)();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={toggleMicrophone}
                      className="absolute right-2 top-2 rounded-full"
                      disabled={!browserSupport}
                      data-microphone-tooltip
                      aria-label={isListening ? "Stop recording" : "Start recording"}
                    >
                      {isListening ? (
                        <Mic className="h-5 w-5 text-red-500 animate-pulse" />
                      ) : (
                        <MicOff className="h-5 w-5 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>

                <AnimatePresence mode="wait">
                  {form.formState.isSubmitted && fieldState.error && (
                    <motion.div
                      key={fieldState.error.message}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FormMessage className="px-6 pt-3" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </FormItem>
            )}
          />

          <div className="flex w-full items-start justify-between gap-4 px-4 py-3 max-md:flex-col">
            <div className="flex w-full flex-col justify-end">
              <Button
                type="button"
                disabled={isSubmitting || !tooLong || notEnglish}
                onClick={() => {
                  actionRef.current = "summarize";
                  form.handleSubmit(onSubmit)();
                }}
                className={cn(
                  "w-full bg-gradient-to-r from-blue-500 via-teal-400 to-green-500 font-bold",
                  "transition-all duration-300 md:w-fit",
                  "dark:from-blue-600 dark:via-teal-500 dark:to-green-600",
                  tooLong ? "animate-gradient" : "bg-clip-text text-transparent"
                )}
              >
                Summarize ✨
              </Button>
              {notEnglish && tooLong && (
                <FormMessage className="h-fit px-2 pt-3 max-md:col-span-2 max-md:text-center">
                  Only English text can be summarized.
                </FormMessage>
              )}
              {!browserSupport && (
                <FormMessage className="pt-2">
                  Speech recognition is not supported in your browser
                </FormMessage>
              )}
            </div>

            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0 max-md:w-full md:ml-auto">
                  <FormLabel>Select</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="md:w-[180px]">
                        <SelectValue placeholder="English (en)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent side="top">
                      {languages.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="max-md:w-full"
              onClick={() => {
                actionRef.current = "translate";
              }}
            >
              Translate
              <SendHorizontal className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}

export default ChatBox;