import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  avatarRoot: {
    backgroundColor: "primary-color",
    color: "active-text-color",
  },
  fallback: {
    fontWeight: "extrabold",
    fontSize: 16,
  },
} as const satisfies GlobalStyleObject;
