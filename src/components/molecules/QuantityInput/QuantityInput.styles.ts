import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    border: "none",
    flex: { base: 1, sm: "initial" },
  },
  trigger: {
    border: "none",
    borderRadius: "0",
    _hover: {
      bg: "transparent",
      color: "black",
    },
    _focusVisible: {
      outline: "2px solid",
      outlineColor: "gray.900",
    },
  },
} as const satisfies GlobalStyleObject;

export const containerStyles = {
  "2xs": {
    gap: 1,
    py: 0,
    px: 0,
    width: "auto",
    justifyContent: "flex-start",
    border: "1px solid",
    borderColor: "input-border-color",
    overflow: "hidden",
    _focusWithin: {
      borderColor: "input-dark-border-color",
      boxShadow: "none",
    },
  },
  xs: {
    gap: 1,
    py: 0.5,
    px: 0.5,
    width: "auto",
    justifyContent: "flex-start",
    border: "1px solid",
    borderColor: "input-border-color",
    overflow: "hidden",
    _focusWithin: {
      borderColor: "input-dark-border-color",
      boxShadow: "none",
    },
  },
  sm: {
    gap: 2,
    py: { base: 0.5, md: 1.5 },
    px: { base: 0, md: 2 },
    width: { base: "full", sm: "auto" },
    justifyContent: { base: "space-between", sm: "flex-start" },
    border: "1px solid",
    borderColor: "input-border-color",
    overflow: "hidden",
    _focusWithin: {
      borderColor: "input-dark-border-color",
      boxShadow: "none",
    },
  },
} as const satisfies GlobalStyleObject;

export const valueTextStyles = {
  "2xs": {
    textAlign: "center",
    fontSize: "xs",
    w: "3ch",
    flex: "initial",
  },
  xs: {
    textAlign: "center",
    fontSize: "sm",
    w: "3ch",
    flex: "initial",
  },
  sm: {
    textAlign: "center",
    fontSize: "lg",
    w: { base: "6ch", sm: "3ch" },
    flex: { base: 1, sm: "initial" },
  },
} as const satisfies GlobalStyleObject;
