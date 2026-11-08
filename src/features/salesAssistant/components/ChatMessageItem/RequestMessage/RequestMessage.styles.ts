import type { GlobalStyleObject } from "@chakra-ui/react";
import { styles as chatMessageItemStyles } from "@/features/salesAssistant/components/ChatMessageItem/ChatMessageItem.styles";

export const styles = {
  requestItem: {
    ...chatMessageItemStyles.messageRow,
    alignSelf: "flex-end",
  },
  transcriptContainer: {
    ...chatMessageItemStyles.bubble,
    rounded: "xl",
    backgroundColor: "light-primary-color",
    color: "foreground-color",
    isolation: "isolate",
  },
  icon: {
    ...chatMessageItemStyles.icon,
    backgroundColor: "light-primary-color",
    color: "primary-color",
  },
} as const satisfies GlobalStyleObject;
