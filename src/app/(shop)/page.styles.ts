import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    spaceX: 8,
    spaceY: 8,
    flexDirection: { base: "column", lg: "row" },
  },
  bannerWrapper: {
    position: "relative",
    width: "full",
    aspectRatio: "16 / 9",
    shadow: "xl",
    overflow: "hidden",
  },
  content: {
    width: "70%",
    flexDirection: "column",
    justifyContent: "center",
    spaceY: 6,
  },
  heading: {
    fontSize: 26,
  },
  subheading: {
    fontSize: 16,
    color: "foreground-color",
  },
  cta: {
    backgroundColor: "primary-color",
  },
} as const satisfies GlobalStyleObject;
