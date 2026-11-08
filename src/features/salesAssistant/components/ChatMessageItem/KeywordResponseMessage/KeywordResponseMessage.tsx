"use client";

import { Flex, Icon, ListItem, Text } from "@chakra-ui/react";
import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import { ResponseLabel } from "@/components/atoms/ResponseLabel/ResponseLabel";
import { ResponseTail } from "@/components/atoms/ResponseTail/ResponseTail";
import {
  type ChatTag,
  ChatTagList,
} from "@/features/salesAssistant/components/ChatMessageItem/ChatTagList/ChatTagList";
import { styles } from "@/features/salesAssistant/components/ChatMessageItem/KeywordResponseMessage/KeywordResponseMessage.styles";
import type { KeywordResponseChatMessage } from "@/features/salesAssistant/types/responseAndRequest.types";

const KEYWORDS_TEST_ID = "ChatMessageItem-keywordResponse";
const DESCRIPTION_TEST_ID = "ChatMessageItem-keywordDescription";

interface KeywordResponseMessageProps {
  message: KeywordResponseChatMessage;
}

const toUniqueChatTags = (
  values: string[] = [],
  isNegative: boolean,
): ChatTag[] => {
  const uniqueValuesForChatTags = new Set(values);

  return [...uniqueValuesForChatTags].map((keyword) => {
    return {
      value: keyword,
      isNegative,
    };
  });
};

export function KeywordResponseMessage({
  message,
}: KeywordResponseMessageProps) {
  const t = useTranslations();
  const keywordResult = message.messageDetails;

  const tags: ChatTag[] = [
    ...toUniqueChatTags(keywordResult.keywords, false),
    ...toUniqueChatTags(keywordResult.negative_keywords, true),
  ];

  return (
    <ListItem
      aria-label={t("salesAssistantPage.chat.message.keyword")}
      {...styles.responseItem}
    >
      <Flex {...styles.responseRow}>
        <Flex {...styles.icon}>
          <Icon size="lg">
            <Bot />
          </Icon>
        </Flex>
        <Flex {...styles.response}>
          <ResponseLabel title={t("salesAssistantPage.chat.keywords.label")} />
          <Flex {...styles.bubbleContainer}>
            {keywordResult.extracted_query}
            {tags.length > 0 && (
              <ChatTagList tags={tags} testId={KEYWORDS_TEST_ID} />
            )}
            <ResponseTail />
          </Flex>
        </Flex>
      </Flex>
      <Flex {...styles.responseRow}>
        <Flex {...styles.icon}>
          <Icon size="lg">
            <Bot />
          </Icon>
        </Flex>
        <Flex {...styles.response}>
          <ResponseLabel title={t("salesAssistantPage.chat.note.label")} />
          <Flex {...styles.bubbleContainer}>
            <Text data-testid={DESCRIPTION_TEST_ID}>
              {keywordResult.salesperson_note}
            </Text>
            <ResponseTail />
          </Flex>
        </Flex>
      </Flex>
    </ListItem>
  );
}
