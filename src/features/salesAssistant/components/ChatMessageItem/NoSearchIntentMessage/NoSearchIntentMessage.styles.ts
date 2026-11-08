import type { GlobalStyleObject } from "@chakra-ui/react";
import { styles as chatMessageItemStyles } from "@/features/salesAssistant/components/ChatMessageItem/ChatMessageItem.styles";

export const styles = {
  responseItem: {
    ...chatMessageItemStyles.messageRow,
    alignSelf: "flex-start",
  },
  content: chatMessageItemStyles.column,
  icon: {
    ...chatMessageItemStyles.icon,
    backgroundColor: "primary-color",
    color: "light-primary-color",
  },
  bubbleContainer: {
    ...chatMessageItemStyles.responseBubble,
    flexDirection: "column",
    gap: 1,
  },
} as const satisfies GlobalStyleObject;
