import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  form: {
    width: "100%",
  },
  searchBar: {
    flexGrow: 1,
    width: "full",
    alignItems: "center",
    borderWidth: 1,
    paddingX: "20px",
    borderColor: "foreground-color.muted",
    borderRadius: "full",
  },
  input: {
    width: "full",
    backgroundColor: "transparent",
    textIndent: "10px",
    borderRadius: "full",
    borderColor: "transparent",
    focusRing: "none",
  },
  searchIcon: {
    color: "foreground-color",
  },
} as const satisfies GlobalStyleObject;
