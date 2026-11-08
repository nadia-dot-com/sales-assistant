import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  loading: {
    minHeight: "80dvh",
    width: "full",
  },
  loadingSpinner: {
    margin: "auto",
  },
} as const satisfies GlobalStyleObject;
