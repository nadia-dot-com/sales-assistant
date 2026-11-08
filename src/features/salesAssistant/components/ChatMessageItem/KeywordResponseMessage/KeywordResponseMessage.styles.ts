import type { GlobalStyleObject } from "@chakra-ui/react";
import { styles as chatMessageItemStyles } from "@/features/salesAssistant/components/ChatMessageItem/ChatMessageItem.styles";

export const styles = {
  responseItem: {
    ...chatMessageItemStyles.column,
    alignSelf: "flex-start",
  },
  responseRow: chatMessageItemStyles.messageRow,
  icon: {
    ...chatMessageItemStyles.icon,
    backgroundColor: "primary-color",
    color: "light-primary-color",
  },
  response: chatMessageItemStyles.column,
  bubbleContainer: {
    ...chatMessageItemStyles.responseBubble,
    flexDirection: "column",
    gap: 1,
  },
} as const satisfies GlobalStyleObject;
