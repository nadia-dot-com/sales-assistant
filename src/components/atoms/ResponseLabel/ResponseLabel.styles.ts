import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  label: {
    color: "foreground-color",
    fontSize: "xs",
    paddingLeft: 2,
    textTransform: "lowercase",
    fontWeight: "semibold",
  },
} as const satisfies GlobalStyleObject;
