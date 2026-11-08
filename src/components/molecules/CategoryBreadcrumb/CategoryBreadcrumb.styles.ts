import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  list: {
    flexWrap: "wrap",
  },
  link: {
    color: "heading-color",
    transitionProperty: "color",
    transitionDuration: "moderate",
    transitionTimingFunction: "ease-in-out",
    _hover: { color: "primary-color" },
    textDecor: "none",
    fontWeight: "medium",
  },
  separator: {
    fontWeight: "medium",
  },
  current: {
    color: "foreground-color",
    fontWeight: "light",
  },
} as const satisfies GlobalStyleObject;
