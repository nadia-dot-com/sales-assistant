import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  badge: {
    backgroundColor: "transparent",
  },
  filter: {
    display: "flex",
    alignItems: "center",
    height: "fit",
    paddingX: 1,
    borderRadius: "full",
    color: "primary-color",
    backgroundColor: "primary-color/10",
    cursor: "pointer",
  },
} as const satisfies GlobalStyleObject;
