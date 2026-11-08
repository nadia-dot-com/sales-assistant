import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  container: {
    spaceX: "15px",
  },
  campaign: {
    textUnderlineOffset: "20px",
    fontSize: "15px",
    transition: "color 0.2s ease-in-out",
    _hover: {
      textDecorationColor: "primary-color",
      color: "primary-color",
    },
    _active: {
      textDecorationColor: "primary-color",
      color: "primary-color",
    },
  },
  moreItem: {
    cursor: "pointer",
    fontWeight: "normal",
    fontSize: "14px",
    whiteSpace: "nowrap",
    padding: 1.5,
    transition: "color 0.2s ease-in-out, background-color 0.2s ease-in-out",
    _hover: {
      color: "primary-color",
      backgroundColor: "active-text-color",
    },
  },
} as const satisfies GlobalStyleObject;
