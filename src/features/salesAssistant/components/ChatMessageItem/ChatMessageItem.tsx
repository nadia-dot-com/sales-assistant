import type { ProductFacetResponse } from "@/features/product/types/productResponse.types";
import { GridResponseMessage } from "@/features/salesAssistant/components/ChatMessageItem/GridResponseMessage/GridResponseMessage";
import { KeywordResponseMessage } from "@/features/salesAssistant/components/ChatMessageItem/KeywordResponseMessage/KeywordResponseMessage";
import { NoSearchIntentMessage } from "@/features/salesAssistant/components/ChatMessageItem/NoSearchIntentMessage/NoSearchIntentMessage";
import { RequestMessage } from "@/features/salesAssistant/components/ChatMessageItem/RequestMessage/RequestMessage";
import { CHAT_MESSAGE_ROLES } from "@/features/salesAssistant/constants/chatRoles";
import type { ChatMessage } from "@/features/salesAssistant/types/responseAndRequest.types";

interface ChatMessageItemProps {
  message: ChatMessage;
  isLoading: boolean;
  facetMap: ProductFacetResponse["facetMap"];
  onFiltersChange: (messageId: string, params: URLSearchParams) => void;
}

export function ChatMessageItem({
  message,
  isLoading,
  facetMap,
  onFiltersChange,
}: ChatMessageItemProps) {
  switch (message.type) {
    case CHAT_MESSAGE_ROLES.request:
      return <RequestMessage message={message} />;
    case CHAT_MESSAGE_ROLES.keywordResponse:
      return <KeywordResponseMessage message={message} />;
    case CHAT_MESSAGE_ROLES.gridResponse:
      return (
        <GridResponseMessage
          message={message}
          isLoading={isLoading}
          facetMap={facetMap}
          onFiltersChange={onFiltersChange}
        />
      );
    case CHAT_MESSAGE_ROLES.noSearchIntent:
      return <NoSearchIntentMessage message={message} />;
  }
}
