import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  wrapper: {
    flexDir: "column",
    gap: 2,
    mt: { base: 2, md: 0 },
    alignSelf: { base: "center" },
    width: "full",
  },
  container: {
    gap: 4,
    alignItems: "stretch",
    width: "full",
    flexDir: { base: "column", xs: "row" },
  },
  maxQuantityMessage: {
    color: "destructive-color",
    fontSize: "sm",
  },
  button: {
    minWidth: "160px",
    flex: { base: 1, sm: "initial" },
    py: { base: 5, md: 6 },
    px: { base: 9, md: 9 },
    background: "primary-color",
    color: "background-color",
    fontWeight: "bold",
    fontSize: { base: "md", md: "lg" },
    rounded: 0,
    _hover: { bg: "primary-color.hover" },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "foreground-color/90",
    },
    _active: {
      opacity: 0.5,
    },
  },
} as const satisfies GlobalStyleObject;
