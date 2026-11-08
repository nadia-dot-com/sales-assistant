import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  container: {
    flexDirection: "column",
    maxWidth: "full",
    spaceY: 5,
    lg: {
      spaceY: 10,
    },
  },
  h1: {
    fontSize: "2xl",
    textTransform: "uppercase",
    fontWeight: "extrabold",
  },
} as const satisfies GlobalStyleObject;
