import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  accordionItem: {
    paddingY: 9,
    paddingX: 2,
    width: "full",
  },
  accordionItemTrigger: {
    textTransform: "uppercase",
    justifyContent: "space-between",
  },
  triggerLabelGroup: {
    flexDir: "column",
    gap: 4,
  },
  stepLabel: {
    fontSize: "18px!",
  },
  selectedBadge: {
    textTransform: "none",
    fontWeight: "normal",
    borderWidth: "1px",
    borderRadius: "none",
    paddingX: 3,
    paddingY: 1,
  },
  indicator: {
    alignSelf: "flex-start",
  },
  itemContent: {
    paddingTop: 6,
    paddingBottom: 1,
    fontSize: "14px",
  },
  accordionItemBody: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
  },
  error: {
    color: "destructive-color",
  },
} as const satisfies GlobalStyleObject;
