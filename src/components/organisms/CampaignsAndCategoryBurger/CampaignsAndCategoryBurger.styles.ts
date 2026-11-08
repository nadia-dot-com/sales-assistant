import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  burger: {
    display: "flex",
    cursor: "pointer",
    color: "foreground-color",
    transition: "color 0.2s ease-in-out",
    _hover: {
      color: "primary-color",
    },
    lg: {
      display: "none",
    },
  },
  content: {
    padding: "20px",
    spaceY: "10px",
  },
} as const satisfies GlobalStyleObject;
