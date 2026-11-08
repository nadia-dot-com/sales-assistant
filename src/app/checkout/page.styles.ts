import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  checkout: {
    flex: 1,
    minHeight: "60dvh",
    display: "flex",
    flexDirection: "column",
    width: "full",
    marginY: 12,
    paddingX: { base: "10px", xs: "20px", md: "30px", xxl: "48px" },
  },
} as const satisfies GlobalStyleObject;
