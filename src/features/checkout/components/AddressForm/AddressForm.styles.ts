import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  form: {
    flexDirection: "column",
    gap: 4,
    width: "full",
  },
  saveButton: {
    fontSize: "18px",
    alignSelf: "center",
    marginTop: 4,
    fontWeight: "bold",
    minWidth: "200px",
    px: 4,
    py: 2,
    backgroundColor: "dark-background-color",
    color: "background-color",
    rounded: "none",
  },
} as const satisfies GlobalStyleObject;
