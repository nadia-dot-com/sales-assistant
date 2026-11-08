import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  container: {
    width: "full",
    flexDirection: "column",
    spaceY: 4,
  },
  totalProducts: {
    spaceX: 2,
    alignItems: "center",
  },
  totalProductsIcon: {
    color: "foreground-color",
  },
  totalProductsHeading: {
    fontSize: "sm",
    color: "foreground-color",
    display: "flex",
    gap: 1,
  },
  grid: {
    gridTemplateColumns: {
      xs: "1fr 1fr",
      sm: "1fr 1fr",
      lg: "1fr 1fr 1fr",
      xl: "1fr 1fr 1fr",
      xxl: "1fr 1fr 1fr 1fr",
    },
    alignItems: "center",
    gap: "0.8rem",
    justifyContent: "center",
  },
  chatGrid: {
    gridTemplateColumns: {
      base: "repeat(auto-fill, minmax(230px, 1fr))",
      xl: "1fr 1fr 1fr 1fr",
    },
    alignItems: "center",
    gap: "0.8rem",
    justifyContent: "center",
  },
  gridItem: {
    alignSelf: "center",
    minWidth: 0,
  },
  gridItemChat: {
    alignSelf: "stretch",
    minWidth: 0,
  },
  invertedStyle: {
    color: "background-color",
  },
} as const satisfies GlobalStyleObject;
