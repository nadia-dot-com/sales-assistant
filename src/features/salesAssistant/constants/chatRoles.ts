export const CHAT_MESSAGE_ROLES = {
  request: "REQUEST",
  keywordResponse: "KEYWORD_RESPONSE",
  gridResponse: "GRID_RESPONSE",
  noSearchIntent: "NO_SEARCH_INTENT",
} as const;

export type ChatMessageType =
  (typeof CHAT_MESSAGE_ROLES)[keyof typeof CHAT_MESSAGE_ROLES];

export const NOTHING_EXTRACTED = "NOTHING_EXTRACTED";
