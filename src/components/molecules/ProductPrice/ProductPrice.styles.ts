import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    columnGap: 1,
  },
  price: {
    fontWeight: 500,
  },
  originalPrice: {
    fontWeight: 500,
    opacity: 0.5,
    textDecoration: "line-through",
    lineHeight: 1,
  },
  discountedPrice: {
    fontWeight: 500,
    color: "destructive-color",
    lineHeight: 1,
  },
} as const satisfies GlobalStyleObject;
