import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  scrollButton: {
    position: "absolute",
    top: { base: "-65px", sm: "-70px" },
    right: "0px",
    height: { base: "40px", sm: "48px" },
    width: { base: "40px", sm: "48px" },
    color: "foreground-color/40",
    backgroundColor: "light-primary-color",
    borderRadius: "50%",
    opacity: 0,
    pointerEvents: "none",
    transition:
      "opacity 300ms ease, color 500ms ease, background-color 500ms ease",
    "&[data-visible]": {
      opacity: 1,
      pointerEvents: "auto",
    },
    _hover: {
      color: "background-color",
      backgroundColor: "primary-color",
    },
  },
  icon: {
    position: "relative",
    top: "1.5px",
  },
} as const satisfies GlobalStyleObject;
