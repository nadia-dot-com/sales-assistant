import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    w: { base: "100%", md: "60dvh" },
    alignSelf: { base: "center", md: "none" },
  },
  itemContainer: {
    width: "full",
    overflow: "hidden",
  },
  carouselItem: {
    position: "relative",
    width: "full",
    height: "full",
    maxHeight: "60dvh",
    backgroundColor: "light-gray-background-color",
  },
  carouselImage: {
    maxHeight: "600px",
    maxWidth: "600px",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  groupMd: {
    display: { base: "none", md: "flex" },
    gap: 4,
  },
  indicatorMd: {
    mt: 5,
    opacity: 0.6,
    _current: {
      opacity: 1,
    },
  },
  imageMd: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  groupBase: {
    display: { base: "flex", md: "none" },
    justifyContent: "center",
    gap: 2,
    mt: 3,
  },
  indicatorBase: {
    transition: "width 0.2s ease, background-color 0.3s ease",
    w: 2,
    h: 2,
    rounded: "full",
    bg: "input-dark-border-color",
    _current: {
      bg: "foreground-color",
    },
  },
} as const satisfies GlobalStyleObject;
