import type { GlobalStyleObject } from "@chakra-ui/react";

const link = {
  marginTop: 1,
  textDecoration: "none",
  backgroundColor: "transparent",
  _hover: {
    color: "primary-color",
    backgroundColor: "transparent",
  },
  _selected: {
    backgroundColor: "transparent",
  },
  _currentPage: {
    color: "primary-color",
    backgroundColor: "transparent",
  },
};

export const styles = {
  aside: {
    width: "200px",
    display: "none",
    lg: {
      display: "block",
      position: "sticky",
      top: 5,
      alignSelf: "flex-start",
    },
  },
  label: {
    fontSize: "xl",
  },
  branchControl: {
    fontSize: "md",
    ...link,
  },
  marginForItem: {
    fontSize: "md",
    ...link,
  },
} as const satisfies GlobalStyleObject;
