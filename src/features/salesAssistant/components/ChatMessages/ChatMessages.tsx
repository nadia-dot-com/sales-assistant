"use client";
import { Flex, List } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { DotsLoadingSpinner } from "@/components/atoms/DotsLoadingSpinner/DotsLoadingSpinner";
import type { ProductFacetResponse } from "@/features/product/types/productResponse.types";
import { ChatMessageItem } from "@/features/salesAssistant/components/ChatMessageItem/ChatMessageItem";
import { styles } from "@/features/salesAssistant/components/ChatMessages/ChatMessages.styles";
import { CHAT_MESSAGE_ROLES } from "@/features/salesAssistant/constants/chatRoles";
import type { ChatMessage } from "@/features/salesAssistant/types/responseAndRequest.types";

const TAG = "ChatMessages";

interface ChatMessagesProps {
  chatHistory: ChatMessage[];
  isLoading: boolean;
  facetMap: ProductFacetResponse["facetMap"];
  onFiltersChange: (messageId: string, params: URLSearchParams) => void;
}

export function ChatMessages({
  chatHistory,
  isLoading,
  facetMap,
  onFiltersChange,
}: ChatMessagesProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const previousLengthRef = useRef<number | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: keyed on chatHistory.length only, so a filter/sort update (new array, same length) doesn't re-trigger the scroll - only an actual new message should.
  useEffect(() => {
    const list = listRef.current;
    if (!list || chatHistory.length === 0) return;

    const isNewMessage =
      previousLengthRef.current !== null &&
      chatHistory.length > previousLengthRef.current;
    previousLengthRef.current = chatHistory.length;
    if (!isNewMessage) return;

    const lastRequest = chatHistory.findLast(
      (message) => message.type === CHAT_MESSAGE_ROLES.request,
    );
    if (!lastRequest) return;

    const requestEl = document.getElementById(lastRequest.id);
    if (!requestEl) return;

    const scroller = document.body;
    const footer = document.querySelector("footer");
    const padding = 16;

    const requestTarget =
      scroller.scrollTop + requestEl.getBoundingClientRect().top - padding;
    const maxWithoutFooter = footer
      ? scroller.scrollTop +
        footer.getBoundingClientRect().top -
        scroller.clientHeight
      : requestTarget;

    scroller.scrollTo({
      top: Math.min(requestTarget, maxWithoutFooter),
      behavior: "smooth",
    });
  }, [chatHistory.length]);

  return (
    <>
      {chatHistory && (
        <List.Root ref={listRef} {...styles.list} data-testid={`${TAG}-list`}>
          {chatHistory.map((message, index) => (
            <ChatMessageItem
              facetMap={facetMap}
              key={message.id}
              message={message}
              isLoading={isLoading && index === chatHistory.length - 1}
              onFiltersChange={onFiltersChange}
            />
          ))}
          {isLoading && (
            <Flex {...styles.spinner} as="li">
              <DotsLoadingSpinner />
            </Flex>
          )}
        </List.Root>
      )}
    </>
  );
}
