"use client";

import { Box, Icon, ListItem, Text } from "@chakra-ui/react";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import { RequestTail } from "@/components/atoms/RequestTail/RequestTail";
import { styles } from "@/features/salesAssistant/components/ChatMessageItem/RequestMessage/RequestMessage.styles";
import type { RequestChatMessage } from "@/features/salesAssistant/types/responseAndRequest.types";

const TRANSCRIPT_TEST_ID = "ChatMessageItem-transcript";

interface RequestMessageProps {
  message: RequestChatMessage;
}

export function RequestMessage({ message }: RequestMessageProps) {
  const t = useTranslations();

  return (
    <ListItem
      id={message.id}
      aria-label={t("salesAssistantPage.chat.message.myMessage")}
      {...styles.requestItem}
    >
      <Box {...styles.transcriptContainer}>
        <Text data-testid={TRANSCRIPT_TEST_ID} title={message.messageDetails}>
          {message.messageDetails}
        </Text>
        <RequestTail />
      </Box>
      <Box {...styles.icon}>
        <Icon size="lg">
          <User />
        </Icon>
      </Box>
    </ListItem>
  );
}
