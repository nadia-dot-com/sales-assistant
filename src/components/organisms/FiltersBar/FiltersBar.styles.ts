import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  flex: {
    flexDirection: "column",
    spaceY: 3,
    backgroundColor: "background-color",
    color: "foreground-color",
    padding: 1,
    paddingBottom: 2,
    borderRadius: "lg",
  },
  grid: {
    gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
    gap: 3,
    width: "full",
  },
  filtersBar: {
    flexDirection: "column",
  },
  appliedFilters: {
    gap: 3,
    flexWrap: "wrap",
    width: "full",
  },
} as const satisfies GlobalStyleObject;
