import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  list: {
    spaceY: 1,
    marginTop: 2,
  },
  listItem: {
    alignItems: "center",
  },
  item: {
    color: "fg.muted",
    transition: "color 0.2s, text-decoration 0.2s",
  },
  checked: {
    color: "heading.success",
    textDecoration: "line-through",
  },
} as const satisfies GlobalStyleObject;
