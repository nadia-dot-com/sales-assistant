import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width: "full",
    px: { base: "10px", xs: "20px", md: "30px", xxl: "48px" },
    py: { base: "30px" },
  },
} as const satisfies GlobalStyleObject;
