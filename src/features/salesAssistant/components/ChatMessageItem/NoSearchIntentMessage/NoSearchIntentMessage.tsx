"use client";

import { Flex, Icon, ListItem, Text } from "@chakra-ui/react";
import { Bot } from "lucide-react";
import { useTranslations } from "next-intl";
import { ResponseLabel } from "@/components/atoms/ResponseLabel/ResponseLabel";
import { ResponseTail } from "@/components/atoms/ResponseTail/ResponseTail";
import { styles } from "@/features/salesAssistant/components/ChatMessageItem/NoSearchIntentMessage/NoSearchIntentMessage.styles";
import type { NoSearchIntentChatMessage } from "@/features/salesAssistant/types/responseAndRequest.types";

const TEST_ID = "ChatMessageItem-isNoSearchError";

interface NoSearchIntentMessageProps {
  message: NoSearchIntentChatMessage;
}

export function NoSearchIntentMessage({ message }: NoSearchIntentMessageProps) {
  const t = useTranslations();

  return (
    <ListItem
      aria-label={t("salesAssistantPage.chat.message.searchError")}
      {...styles.responseItem}
    >
      <Flex {...styles.icon}>
        <Icon size="lg">
          <Bot />
        </Icon>
      </Flex>
      <Flex {...styles.content}>
        <ResponseLabel title={t("salesAssistantPage.chat.keywords.label")} />
        <Flex {...styles.bubbleContainer}>
          <Text data-testid={TEST_ID}>{message.messageDetails}</Text>
          <ResponseTail />
        </Flex>
      </Flex>
    </ListItem>
  );
}
