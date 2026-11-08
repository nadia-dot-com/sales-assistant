import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  trigger: {
    paddingX: 3,
    paddingY: 1,
  },
  indicator: {
    paddingRight: 2,
  },
  content: {
    paddingY: 1,
    paddingX: 1,
    zIndex: "overlay",
    maxHeight: "300px",
    overflowY: "auto",
  },
  item: {
    paddingX: 3,
    paddingY: 2,
    _selected: {
      backgroundColor: "light-gray-background-color",
    },
  },
} as const satisfies GlobalStyleObject;
