import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  content: {
    marginY: "auto",
    maxWidth: "1000px",
    width: "full",
    alignSelf: "center",
  },
} as const satisfies GlobalStyleObject;
