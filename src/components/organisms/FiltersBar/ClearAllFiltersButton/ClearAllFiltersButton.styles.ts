import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  clearAll: {
    height: "fit",
    _hover: {
      textDecoration: "underline",
    },
  },
} as const satisfies GlobalStyleObject;
