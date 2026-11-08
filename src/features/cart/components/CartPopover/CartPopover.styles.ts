import type { GlobalStyleObject } from "@chakra-ui/react";

const triggerBase = {
  cursor: "pointer",
  color: "foreground-color",
  transition: "color 0.2s ease-in-out",
  _hover: {
    color: "primary-color",
  },
} as const;

export const styles = {
  desktopTrigger: {
    ...triggerBase,
    display: { base: "none", lg: "inline-flex" },
  },
  mobileTrigger: {
    ...triggerBase,
    display: { base: "inline-flex", lg: "none" },
  },
  iconWrapper: {
    position: "relative",
  },
  circle: {
    color: "active-text-color",
    backgroundColor: "destructive-color",
    fontSize: "12px",
    bgSize: 4,
  },
  count: {
    fontSize: "10px",
    fontWeight: "extrabold",
  },
  popoverContent: {
    backgroundColor: "background-color",
    zIndex: "max",
    minW: "400px",
  },
  popoverBody: {
    p: 6,
  },
} as const satisfies GlobalStyleObject;
