import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  editablePrice: {
    width: "fit",
  },
  input: {
    maxWidth: 20,
    textAlign: "center",
  },
} as const satisfies GlobalStyleObject;
