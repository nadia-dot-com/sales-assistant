import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    border: "1px solid",
    borderColor: "input-dark-border-color",
  },
  mobileContent: {
    hideFrom: "sm",
    w: "full",
    flexDir: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 2,
    p: 3,
  },
  mobileQuantityWrapper: {
    flex: "none",
  },
  mobileLastColumn: {
    width: "full",
    alignItems: "center",
    justifyContent: "space-between",
  },
  desktopContent: {
    hideBelow: "sm",
    w: "full",
    flexDir: "row",
    justifyContent: "space-between",
    p: 4,
  },
  titleSection: {
    flexDir: "column",
    gap: 1,
  },
  desktopFirstColumn: {
    maxWidth: "70%",
    flexDir: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  desktopLastColumn: {
    flexDir: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  title: {
    lineClamp: { base: "1", sm: "3" },
    textOverflow: "ellipsis",
    _hover: {
      color: "primary-color.hover",
    },
  },
  link: {
    maxW: "100px",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  imgWrapper: {
    position: "relative",
    width: { base: "100px", xs: "150px", sm: "200px" },
    height: { base: "150px", sm: "200px" },
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
