import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  content: {
    paddingY: 1,
    paddingX: 1,
    gap: 1,
    zIndex: "overlay",
  },
  trigger: {
    textIndent: 1,
  },
  label: {
    srOnly: true,
  },
  item: {
    _selected: {
      backgroundColor: "light-gray-background-color",
    },
  },
} as const satisfies GlobalStyleObject;
