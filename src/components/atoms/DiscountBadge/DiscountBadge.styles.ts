import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  badge: {
    width: "fit",
    paddingX: 3,
    color: "active-text-color",
    backgroundColor: "destructive-color",
    position: "absolute",
    alignSelf: "start",
    fontSize: "sm",
    fontWeight: "extrabold",
    textTransform: "uppercase",
    top: 2,
    left: 2,
  },
} as const satisfies GlobalStyleObject;
