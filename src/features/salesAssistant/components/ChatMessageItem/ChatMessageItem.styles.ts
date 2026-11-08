import type { GlobalStyleObject } from "@chakra-ui/react";

const bubble = {
  position: "relative",
  maxWidth: "70dvw",
  paddingY: 2,
  paddingX: 3,
  marginBottom: { base: 4, sm: 8 },
} as const;

export const styles = {
  messageRow: {
    display: "flex",
    gap: 1,
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  bubble,
  responseBubble: {
    ...bubble,
    rounded: "2xl",
    alignSelf: "flex-start",
    backgroundColor: "primary-color",
    color: "background-color",
  },
  icon: {
    display: { base: "none", sm: "flex" },
    alignSelf: "flex-end",
    rounded: "full",
    padding: 1,
  },
} as const satisfies GlobalStyleObject;
