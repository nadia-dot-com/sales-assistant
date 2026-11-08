import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  trigger: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2",
    width: "full",
    height: "10",
    textIndent: 1,
    borderWidth: "1px",
    borderColor: "border",
    borderRadius: "l2",
    bg: "transparent",
    cursor: "pointer",
    fontSize: "sm",
    transition: "borders",
    _hover: {
      bg: "bg.subtle",
    },
    _open: {
      borderColor: "border.emphasized",
    },
    _focusVisible: {
      outline: "none",
      borderColor: "border.emphasized",
      boxShadow: "0 0 0 1px var(--chakra-colors-border-emphasized)",
    },
  },
  triggerLabel: {
    color: "fg",
    truncate: true,
  },
  triggerIcon: {
    flexShrink: "0",
    color: "fg.muted",
  },
  popoverContent: {
    width: "full",
    zIndex: "overlay",
    padding: 2,
  },
  sliderStack: {
    gap: "4",
    width: "full",
  },
  sliderLabel: {
    display: "flex",
    justifyContent: "space-between",
  },
} as const satisfies GlobalStyleObject;
