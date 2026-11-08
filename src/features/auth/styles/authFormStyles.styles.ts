import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  container: {
    width: "full",
    maxWidth: "500px",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    spaceY: 5,
  },
  wrapper: {
    spaceY: 5,
  },
} as const satisfies GlobalStyleObject;
