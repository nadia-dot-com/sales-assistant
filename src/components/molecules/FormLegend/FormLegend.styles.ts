import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  legendTitle: {
    fontSize: 24,
    color: "heading-color",
  },
  legendDescription: {
    fontSize: 16,
    color: "foreground-color",
  },
} as const satisfies GlobalStyleObject;
