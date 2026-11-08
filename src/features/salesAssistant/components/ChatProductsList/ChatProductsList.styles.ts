import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  list: {
    flexDirection: "column",
    spaceY: "10px",
    width: "85dvw",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    spaceY: 4,
    overflowX: "hidden",
  },
  outsideContainer: {
    position: "relative",
    flexDirection: "column",
    backgroundColor: "primary-color",
    color: "background-color",
    alignSelf: "flex-start",
    width: "full",
    gap: 3,
    padding: 3,
    rounded: "2xl",
  },
  paginationContainer: {
    width: "fit-content",
    backgroundColor: "background-color",
    alignSelf: "center",
    padding: { base: 0.5, sm: 2 },
    rounded: "lg",
  },
  emptyState: {
    backgroundColor: "background-color",
    rounded: "lg",
    color: "black",
    py: 4,
  },
} as const satisfies GlobalStyleObject;
