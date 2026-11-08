import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  container: {
    gap: 1,
  },
  dot: {
    width: 2,
    height: 2,
    rounded: "full",
    bg: "primary-color",
    animation: "pulse",
  },
  dotDelay1: {
    animationDelay: "-0.3s",
  },
  dotDelay2: {
    animationDelay: "-0.15s",
  },
} as const satisfies GlobalStyleObject;
