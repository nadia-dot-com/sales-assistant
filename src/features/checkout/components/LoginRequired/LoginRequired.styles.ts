import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    p: 11,
    rounded: "none",
    gap: 8,
    _open: {
      animationName: "scale-in, fade-in",
      animationDuration: "moderate",
    },
    _closed: {
      animationName: "scale-out, fade-out",
      animationDuration: "moderate",
    },
  },
  content: {
    margin: "auto",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },
  button: {
    fontSize: "18px",
    width: "full",
    fontWeight: 700,
    px: 3,
    py: 2,
    backgroundColor: "dark-background-color",
    color: "background-color",
    rounded: "none",
    _disabled: {
      opacity: 0.5,
    },
  },
} as const satisfies GlobalStyleObject;
