import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    width: "100%",
    margin: "auto",
  },
  content: {
    gap: 1,
  },
  vStack: {
    textAlign: "center",
  },
  emptyStateTitle: {
    color: "heading-color",
  },
  emptyStateDescription: {
    color: "foreground-color",
  },
} as const satisfies GlobalStyleObject;
