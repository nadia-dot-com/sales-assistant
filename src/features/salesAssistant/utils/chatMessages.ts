import { v4 as uuidv4 } from "uuid";
import type { FiltersAppliedType } from "@/app/(shop)/search/page";
import type { PriceRange } from "@/features/product/helpers/priceRange/priceRange.type";
import type { SortOption } from "@/features/product/helpers/sort/sortOptions";
import type {
  ProductMatch,
  ProductsByKeysResponse,
} from "@/features/product/types/productResponse.types";
import { CHAT_MESSAGE_ROLES } from "@/features/salesAssistant/constants/chatRoles";
import type {
  GridResponseChatMessage,
  KeywordResponseChatMessage,
  NoSearchIntentChatMessage,
  RequestChatMessage,
  SalesAssistantExtractedSentenceResponse,
} from "@/features/salesAssistant/types/responseAndRequest.types";

export function createRequestMessage(sentence: string): RequestChatMessage {
  return {
    id: uuidv4(),
    type: CHAT_MESSAGE_ROLES.request,
    messageDetails: sentence,
  };
}

export function createKeywordResponseMessage(
  extractedQuery: SalesAssistantExtractedSentenceResponse,
): KeywordResponseChatMessage {
  return {
    id: uuidv4(),
    type: CHAT_MESSAGE_ROLES.keywordResponse,
    messageDetails: extractedQuery,
  };
}

export function createGridResponseMessage(params: {
  messageDetails: ProductsByKeysResponse;
  sort: SortOption;
  priceRange: PriceRange;
  filtersApplied: FiltersAppliedType[];
  page: number;
  productsMatch: ProductMatch[];
}): GridResponseChatMessage {
  return {
    id: uuidv4(),
    type: CHAT_MESSAGE_ROLES.gridResponse,
    ...params,
  };
}

export function createNoSearchIntentMessage(
  messageDetails: string,
): NoSearchIntentChatMessage {
  return {
    id: uuidv4(),
    type: CHAT_MESSAGE_ROLES.noSearchIntent,
    messageDetails,
  };
}
