import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  colorModeButtonIcon: {
    _icon: {
      width: "5",
      height: "5",
    },
  },
  lightMode: {
    color: "fg",
    display: "contents",
  },
  darkMode: {
    color: "fg",
    display: "contents",
  },
} as const satisfies GlobalStyleObject;
