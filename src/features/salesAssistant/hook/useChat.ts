"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toaster } from "@/components/ui/toaster/toaster";
import { getProductsByKeys } from "@/features/product/api/getProductsByKeys";
import type { SearchFacetInput } from "@/features/product/helpers/filterAndFacetsTypes/filterAndFacetsTypes.types";
import type { PriceRange } from "@/features/product/helpers/priceRange/priceRange.type";
import type {
  ProductFacetResponse,
  ProductMatch,
} from "@/features/product/types/productResponse.types";
import { handleExtractedSentence } from "@/features/salesAssistant/actions/handleExtractedSentence";
import { handleProductsKeys } from "@/features/salesAssistant/actions/handleProductsKeys";
import {
  CHAT_MESSAGE_ROLES,
  NOTHING_EXTRACTED,
} from "@/features/salesAssistant/constants/chatRoles";
import { CHAT_SESSION_KEY } from "@/features/salesAssistant/constants/chatSessionKey";
import type { ChatSession } from "@/features/salesAssistant/types/chatSession.types";
import type {
  ChatMessage,
  SalesAssistantExtractedSentenceResponse,
} from "@/features/salesAssistant/types/responseAndRequest.types";
import { appendChatMessageToLocalStorageSession } from "@/features/salesAssistant/utils/appendChatMessageToLocalStorageSession";
import {
  createGridResponseMessage,
  createKeywordResponseMessage,
  createNoSearchIntentMessage,
  createRequestMessage,
} from "@/features/salesAssistant/utils/chatMessages";
import {
  DEFAULT_SORT_OPTION,
  INITIAL_PAGE,
  parseFiltersFromParams,
} from "@/features/salesAssistant/utils/parseFiltersFromParams";

const INITIAL_PRICE_RANGE: PriceRange = { from: "", to: "" };

export function useChat(
  language: string,
  facetMap: ProductFacetResponse["facetMap"],
  buildedFacets: SearchFacetInput[],
) {
  const t = useTranslations();
  const [messageSent, setMessageSent] = useState<string | null>(null);
  const [session, setSession] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const currentChatId = new URLSearchParams(window.location.search).get(
      "chatId",
    );
    const storedSession = localStorage.getItem(CHAT_SESSION_KEY);
    try {
      if (storedSession) {
        const parsedSession: ChatSession = JSON.parse(storedSession);

        if (currentChatId && currentChatId === parsedSession.session) {
          setSession(parsedSession.session);
          setChatHistory(parsedSession.chatHistory);
          return;
        }
      }
    } catch (error) {
      console.error("Damaged session in localStorage", error);
    }

    const newSession: ChatSession = { session: uuidv4(), chatHistory: [] };
    localStorage.setItem(CHAT_SESSION_KEY, JSON.stringify(newSession));
    setSession(newSession.session);
  }, []);

  const appendMessage = useCallback((message: ChatMessage) => {
    setChatHistory((history) => [...history, message]);
    appendChatMessageToLocalStorageSession(message);
  }, []);

  const handleSearch = useCallback(
    async (sentence: string) => {
      if (isLoading || !sentence.trim()) return;
      setMessageSent(sentence);
      setIsLoading(true);

      appendMessage(createRequestMessage(sentence));

      let extractedQuery:
        | SalesAssistantExtractedSentenceResponse
        | typeof NOTHING_EXTRACTED;

      try {
        extractedQuery = await handleExtractedSentence(sentence, language);

        if (extractedQuery === NOTHING_EXTRACTED) {
          appendMessage(
            createNoSearchIntentMessage(
              t("salesAssistantPage.chat.noSearchIntent"),
            ),
          );
          setIsLoading(false);
          return;
        }

        appendMessage(createKeywordResponseMessage(extractedQuery));
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error: ", error.message);
        }

        toaster.error({
          title: t("salesAssistantPage.chat.keywords.error.title"),
          description: t("salesAssistantPage.chat.extractionError"),
          closable: true,
        });
        setIsLoading(false);

        return;
      }

      let productsMatch: ProductMatch[];

      try {
        productsMatch = await handleProductsKeys(extractedQuery);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error: ", error.message);
        }

        toaster.error({
          title: t("salesAssistantPage.chat.products.error.title"),
          description: t("salesAssistantPage.chat.productsError"),
          closable: true,
        });
        setIsLoading(false);
        return;
      }

      try {
        if (!productsMatch) return;

        const productsResult = await getProductsByKeys(
          productsMatch,
          INITIAL_PAGE,
          DEFAULT_SORT_OPTION,
          INITIAL_PRICE_RANGE,
          buildedFacets,
          facetMap,
          [],
          true,
        );

        appendMessage(
          createGridResponseMessage({
            messageDetails: productsResult,
            sort: DEFAULT_SORT_OPTION,
            priceRange: INITIAL_PRICE_RANGE,
            filtersApplied: [],
            page: INITIAL_PAGE,
            productsMatch,
          }),
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error: ", error.message);
        }

        toaster.error({
          title: t("salesAssistantPage.chat.products.error.title"),
          description: t("salesAssistantPage.chat.extractionError"),
          closable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, language, buildedFacets, facetMap, t, appendMessage],
  );

  const handleFiltersChange = useCallback(
    async (messageId: string, params: URLSearchParams) => {
      const message = chatHistory.find(
        (historyMessage) => historyMessage.id === messageId,
      );

      if (!message || message.type !== CHAT_MESSAGE_ROLES.gridResponse) return;

      const { sort, priceRange, filtersApplied, page } =
        parseFiltersFromParams(params);

      try {
        if (!message.productsMatch) return;

        const productsResult = await getProductsByKeys(
          message.productsMatch,
          page,
          sort,
          priceRange,
          buildedFacets,
          facetMap,
          filtersApplied,
          sort === DEFAULT_SORT_OPTION,
        );

        setChatHistory((history) =>
          history.map((historyMessage) => {
            if (
              historyMessage.id !== messageId ||
              historyMessage.type !== CHAT_MESSAGE_ROLES.gridResponse
            ) {
              return historyMessage;
            }

            return {
              ...historyMessage,
              messageDetails: productsResult,
              sort,
              priceRange,
              filtersApplied,
              page,
            };
          }),
        );
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error: ", error.message);
        }

        toaster.error({
          title: t("salesAssistantPage.chat.products.error.title"),
          description: t("salesAssistantPage.chat.productsError"),
          closable: true,
        });
      }
    },
    [chatHistory, buildedFacets, facetMap, t],
  );

  return {
    messageSent,
    chatHistory,
    isLoading,
    handleSearch,
    handleFiltersChange,
    session,
  };
}
