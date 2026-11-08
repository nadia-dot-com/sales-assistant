import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    display: "grid",
    gridTemplateColumns: "100px 90px 1fr 0.5fr",
    alignItems: "center",
    gap: 3,
  },
  title: {
    maxW: "100px",
    fontSize: "medium",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  firstColumn: {
    height: "full",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 3,
  },
  link: {
    _hover: {
      color: "primary-color.hover",
    },
  },
  imgWrapper: {
    position: "relative",
    width: "100px",
    height: "100px",
    flexShrink: 0,
    overflow: "hidden",
  },
  img: {
    objectFit: "cover",
  },
  priceWrapper: {
    textAlign: "center",
  },
} as const satisfies GlobalStyleObject;
