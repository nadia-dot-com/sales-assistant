import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  container: {
    flexDir: "column",
    alignItems: "center",
    textAlign: "center",
    // gap: 2,
    py: 4,
  },
  content: {
    gap: 1,
  },
  icon: {
    boxSize: 12,
    color: "destructive-color",
    lineHeight: 1,
    mb: 3,
    animation: "popIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
  },
  title: {
    fontWeight: 700,
  },
  message: {
    fontSize: "sm",
  },
  retryButton: {
    width: "full",
    maxW: "460px",
    mt: 4,
    fontWeight: 700,
    px: 6,
    py: 4,
    backgroundColor: "dark-background-color",
    color: "background-color",
    rounded: "none",
    _disabled: {
      opacity: 0.5,
    },
  },
} as const satisfies GlobalStyleObject;
