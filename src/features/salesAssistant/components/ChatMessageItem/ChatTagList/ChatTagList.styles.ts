import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  tags: {
    gap: 2,
    flexWrap: "wrap",
  },
  tag: {
    color: "foreground-color",
    backgroundColor: "light-gray-background-color",
    fontSize: "xs",
    fontWeight: "medium",
    width: "fit",
    paddingX: 2,
    paddingY: 0.5,
    rounded: "md",
  },
  negativeTag: {
    position: "relative",
    isolation: "isolate",
    color: "destructive-color/80",
    backgroundColor: "background-color",
    _after: {
      content: '""',
      position: "absolute",
      inset: 0,
      zIndex: -1,
      backgroundColor: "destructive-color/15",
      rounded: "md",
    },
  },
} as const satisfies GlobalStyleObject;
