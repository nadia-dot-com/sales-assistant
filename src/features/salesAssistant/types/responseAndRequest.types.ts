import type { FiltersAppliedType } from "@/app/(shop)/search/page";
import type { PriceRange } from "@/features/product/helpers/priceRange/priceRange.type";
import type { SortOption } from "@/features/product/helpers/sort/sortOptions";
import type {
  ProductMatch,
  ProductsByKeysResponse,
} from "@/features/product/types/productResponse.types";
import type { CHAT_MESSAGE_ROLES } from "@/features/salesAssistant/constants/chatRoles";

export interface SalesAssistantExtractRequest {
  utterance: string;
  language: string;
}

export interface SalesAssistantExtractedSentenceResponse {
  extracted_query: string;
  keywords: string[];
  salesperson_note: string;
  negative_keywords: string[];
}

export interface SalesAssistantProductKeysRequest {
  extracted_query: string;
  keywords: string[];
  negative_keywords: string[];
  salesperson_note: string;
  limit: number;
}

export interface RequestChatMessage {
  id: string;
  type: typeof CHAT_MESSAGE_ROLES.request;
  messageDetails: string;
}

export interface KeywordResponseChatMessage {
  id: string;
  type: typeof CHAT_MESSAGE_ROLES.keywordResponse;
  messageDetails: SalesAssistantExtractedSentenceResponse;
}

export interface GridResponseChatMessage {
  id: string;
  type: typeof CHAT_MESSAGE_ROLES.gridResponse;
  messageDetails: ProductsByKeysResponse;
  sort: SortOption;
  priceRange: PriceRange;
  filtersApplied: FiltersAppliedType[];
  page: number;
  productsMatch: ProductMatch[];
}

export interface NoSearchIntentChatMessage {
  id: string;
  type: typeof CHAT_MESSAGE_ROLES.noSearchIntent;
  messageDetails: string;
}

export type ChatMessage =
  | RequestChatMessage
  | KeywordResponseChatMessage
  | GridResponseChatMessage
  | NoSearchIntentChatMessage;
