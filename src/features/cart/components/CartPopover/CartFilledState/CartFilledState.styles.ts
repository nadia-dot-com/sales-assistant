import type { GlobalStyleObject } from "@chakra-ui/react";

const VISIBLE_ITEMS_COUNT = 2.6;
const ITEM_HEIGHT_PX = 100; // matches PopoverItem's imgWrapper height
const ITEM_GAP_PX = 12; // matches list.gap token below (3 -> 12px)

export const styles = {
  cartItemsWrapper: {
    flexDir: "column",
    width: "full",
  },
  title: {
    color: "heading-color",
    borderBottom: "1px solid",
    borderColor: "neutral-color",
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: "18px",
  },
  list: {
    listStyle: "none",
    gap: 3,
    mt: 4,
    mb: 6,
    maxHeight: `calc(${ITEM_HEIGHT_PX}px * ${VISIBLE_ITEMS_COUNT} + ${ITEM_GAP_PX}px * ${VISIBLE_ITEMS_COUNT - 1})`,
    overflowY: "auto",
    p: 1,
    pr: 2,
  },
  button: {
    rounded: "none",
    fontWeight: "bold",
    fontSize: "16px",
  },
} as const satisfies GlobalStyleObject;
