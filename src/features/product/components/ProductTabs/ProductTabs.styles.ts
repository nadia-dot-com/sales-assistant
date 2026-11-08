import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    w: "full",
    display: { base: "none", md: "block" },
  },
  tabsList: {
    flexWrap: "wrap",
    gap: { base: 3, sm: 6, md: 10 },
    rowGap: 2,
    borderBottomWidth: 0,
    mb: 7,
  },
  trigger: {
    px: 0,
    py: 3,
    fontSize: { base: "md", md: "lg" },
    fontWeight: 500,
    color: "foreground-color",
    borderBottom: "1px solid",
    borderColor: "transparent",
    _selected: {
      color: "heading-color",
      borderColor: "heading-color",
    },
  },
  descriptionText: {
    color: "foreground-color",
  },
  listRoot: {
    w: "full",
    display: { base: "flex", md: "none" },
    flexDir: "column",
    listStyle: "none",
  },
  listItem: {
    borderBottom: "1px solid",
    borderColor: "neutral-color",
    py: 1,
  },
  listItemTrigger: {
    width: "full",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    py: 3,
    fontSize: "md",
    fontWeight: 500,
    color: "heading-color",
  },
  listItemIndicator: {
    color: "foreground-color",
  },
  listItemContent: {
    pt: 2,
    pb: 5,
  },
  parametersList: {
    flexDir: "column",
    w: "full",
  },
  parameterRow: {
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid",
    borderColor: "input-border-color",
    py: 3,
    _last: {
      borderBottom: "none",
    },
  },
  parameterLabel: {
    fontWeight: 500,
    color: "foreground-color",
  },
  parameterValue: {
    color: "foreground-color",
  },
} as const satisfies GlobalStyleObject;
