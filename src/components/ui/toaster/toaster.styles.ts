import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  toaster: {
    insetInline: { mdDown: "4" },
  },
  toastRoot: {
    width: { md: "sm" },
    borderRadius: "lg",
    borderInlineStart: "4px solid",
    backgroundColor: "background-color",
    boxShadow: "lg",
    paddingY: "3",
    paddingX: "4",
  },
  stack: {
    gap: "1",
    flex: "1",
    maxWidth: "100%",
  },
  title: {
    color: "foreground-color",
    fontWeight: "semibold",
  },
  description: {
    color: "foreground-color.muted",
  },
} as const satisfies GlobalStyleObject;
