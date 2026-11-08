import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    minHeight: "100dvh",
    gap: 2,
  },
  text: {
    flexDirection: "column",
    textAlign: "center",
    fontWeight: "semibold",
  },
  error: {
    fontSize: "60px",
  },
} as const satisfies GlobalStyleObject;
