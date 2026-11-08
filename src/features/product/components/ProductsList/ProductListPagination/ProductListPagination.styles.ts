import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    alignSelf: "center",
    maxWidth: "100%",
    overflowX: "auto",
    backgroundColor: "background-color",
  },

  button: {
    _disabled: {
      color: "foreground-color/50",
    },
    _hover: {
      backgroundColor: "foreground-color/10",
    },
    _currentPage: {
      color: "active-text-color",
      backgroundColor: "primary-color",
      _hover: {
        backgroundColor: "primary-color",
      },
    },
  },
} as const satisfies GlobalStyleObject;
