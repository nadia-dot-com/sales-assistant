import type { ChatMessage } from "@/features/salesAssistant/types/responseAndRequest.types";

export interface ChatSession {
  session: string;
  chatHistory: ChatMessage[];
}
