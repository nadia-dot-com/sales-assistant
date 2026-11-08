import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  body: {
    display: "flex",
    flexDir: "column",
    alignItems: "center",
    gap: 4,
    textAlign: "center",
  },
  icon: {
    boxSize: 14,
    color: "primary-color",
    animation: "popIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
  },
  title: {
    fontWeight: 700,
  },
  subject: {
    display: "flex",
    flexDir: "column",
    fontSize: "sm",
    gap: 1,
  },
} as const satisfies GlobalStyleObject;
