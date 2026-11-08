import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  linkSection: {
    spaceX: 2,
  },
  link: {
    textDecoration: "underline",
    textUnderlineOffset: 2,
    fontSize: 14,
    color: "primary-color",
    _hover: {
      color: "primary-color.hover",
    },
  },
  accountMissing: {
    fontSize: 14,
    fontWeight: "light",
  },
} as const satisfies GlobalStyleObject;
