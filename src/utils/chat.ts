// Define Chat Message Interface
export interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: number;
  loading?: boolean;
  detectedLanguage?: string;
}
