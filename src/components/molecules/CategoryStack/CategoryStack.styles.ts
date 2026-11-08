import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    display: "flex",
    width: "full",
    lg: {
      display: "none",
    },
  },
  nav: {
    spaceX: 4,
  },
  scrollAreaContent: {
    paddingY: 2,
  },
  buttonLink: {
    fontWeight: "semibold",
    fontSize: "md",
    padding: 2,
    _active: {
      color: "primary-color",
    },
  },
} as const satisfies GlobalStyleObject;
