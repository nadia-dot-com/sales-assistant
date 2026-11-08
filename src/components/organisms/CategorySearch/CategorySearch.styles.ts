import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  container: {
    flexDirection: "column",
    maxWidth: "full",
    spaceY: 0,
    lg: {
      spaceY: 10,
    },
  },
  topSection: {
    flexDirection: "column",
    spaceY: 2,
  },
  wrapper: {
    spaceY: 4,
    spaceX: 0,
    flexDirection: "column",
    lg: {
      spaceY: 0,
      spaceX: 14,
      flexDirection: "row",
    },
  },
  h1: {
    fontSize: "2xl",
    textTransform: "uppercase",
    fontWeight: "extrabold",
  },
} as const satisfies GlobalStyleObject;
