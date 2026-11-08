import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    flexDirection: "row",
    alignItems: "flex-end",
    position: "relative",
  },
  button: {
    width: "42px",
    height: "42px",
    minWidth: "45px",
    borderRadius: "full",
    padding: 0,
  },
  iconSmall: {
    width: "20px",
    height: "20px",
  },
  voiceHint: {
    display: { base: "none", sm: "block" },
    "--tooltip-bg": "colors.light-gray-background-color",
    color: "black",
    padding: 1,
  },
} as const satisfies GlobalStyleObject;
