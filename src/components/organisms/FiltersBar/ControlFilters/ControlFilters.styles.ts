import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  button: {
    width: "fit",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
} as const satisfies GlobalStyleObject;
