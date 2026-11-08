import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    p: 10,
    rounded: "none",
    gap: 5,
    _open: {
      animationName: "scale-in, fade-in",
      animationDuration: "moderate",
    },
    _closed: {
      animationName: "scale-out, fade-out",
      animationDuration: "moderate",
    },
  },
  body: {
    flexDir: "column",
    pb: 4,
  },
  heading: {
    flexDir: "column",
    alignItems: "center",
    pb: 5,
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  divider: {
    borderBottom: "1px solid",
    borderColor: "input-dark-border-color",
    width: "60%",
  },
  subject: {
    fontSize: "md",
  },
  input: {
    rounded: "none",
    p: 4,
  },
  submitButton: {
    width: "full",
    gap: 3,
    fontWeight: 700,
    px: 6,
    py: 4,
    backgroundColor: "dark-background-color",
    color: "background-color",
    rounded: "none",
  },
} as const satisfies GlobalStyleObject;
