import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  list: {
    flexDirection: "column",
    spaceY: "10px",
    width: "full",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    spaceY: 5,
  },
  outsideContainer: {
    backgroundColor: "primary-color",
    color: "background-color",
    alignSelf: "flex-start",
    width: "full",
    padding: { base: "1rem" },
    rounded: "2xl",
  },
  emptyStateText: {
    textAlign: "center",
  },
} as const satisfies GlobalStyleObject;
