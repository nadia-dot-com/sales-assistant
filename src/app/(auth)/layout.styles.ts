import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  main: {
    flex: 1,
    minHeight: "60dvh",
    width: "full",
    height: "full",
    justifyContent: "center",
    alignItems: "center",
    px: { base: "20px", md: "30px", xxl: "48px" },
  },
} as const satisfies GlobalStyleObject;
