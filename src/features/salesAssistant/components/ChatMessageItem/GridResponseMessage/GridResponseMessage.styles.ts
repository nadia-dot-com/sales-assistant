import type { GlobalStyleObject } from "@chakra-ui/react";
import { styles as chatMessageItemStyles } from "@/features/salesAssistant/components/ChatMessageItem/ChatMessageItem.styles";

export const styles = {
  gridResponseItem: {
    ...chatMessageItemStyles.messageRow,
    alignSelf: "flex-start",
  },
  content: {
    ...chatMessageItemStyles.column,
    marginBottom: chatMessageItemStyles.bubble.marginBottom,
  },
  icon: {
    ...chatMessageItemStyles.icon,
    backgroundColor: "primary-color",
    color: "light-primary-color",
  },
} as const satisfies GlobalStyleObject;
