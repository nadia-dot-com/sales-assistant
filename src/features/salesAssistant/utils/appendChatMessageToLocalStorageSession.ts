import { CHAT_SESSION_KEY } from "@/features/salesAssistant/constants/chatSessionKey";
import type { ChatSession } from "@/features/salesAssistant/types/chatSession.types";
import type { ChatMessage } from "@/features/salesAssistant/types/responseAndRequest.types";

export function appendChatMessageToLocalStorageSession(message: ChatMessage) {
  try {
    const LOCAL_STORAGE_SESSION = localStorage.getItem(CHAT_SESSION_KEY);

    if (!LOCAL_STORAGE_SESSION) return;
    const LOCAL_STORAGE_SESSION_VALUE: ChatSession = JSON.parse(
      LOCAL_STORAGE_SESSION,
    );

    const NEW_LOCAL_STORAGE_SESSION_VALUE = {
      session: LOCAL_STORAGE_SESSION_VALUE.session,
      chatHistory: [...LOCAL_STORAGE_SESSION_VALUE.chatHistory, message],
    };

    localStorage.setItem(
      CHAT_SESSION_KEY,
      JSON.stringify(NEW_LOCAL_STORAGE_SESSION_VALUE),
    );
  } catch (error) {
    console.error("Failed to save the message to localStorage: ", error);
  }
}
