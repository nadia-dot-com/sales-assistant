import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    alignItems: "center",
    justifyContent: "center",
    minHeight: "50dvh",
    maxWidth: "700px",
    margin: "auto",
  },
  content: {
    gap: 4,
    flexDirection: "column",
  },
  title: {
    display: "flex",
    alignItems: "row",
  },
  name: {
    color: "primary-color",
  },
} as const satisfies GlobalStyleObject;
