import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  requiredIndicator: {
    color: "orange.700",
  },
  input: {
    textIndent: 2,
  },
} as const satisfies GlobalStyleObject;
