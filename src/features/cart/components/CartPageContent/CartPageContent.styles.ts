import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  content: {
    flexDir: { base: "row", xl: "column" },
    maxWidth: "1400px",
    width: "full",
    alignSelf: "center",
    minHeight: "40dvh",
  },
  layout: {
    width: "full",
    flexDirection: { base: "column", xl: "row" },
    alignItems: { base: "center", xl: "flex-start" },
    justifyContent: "center",
    gap: { base: 5, sm: 6, xl: 8 },
  },
  cartItems: {
    flexDirection: "column",
    width: "full",
    gap: { base: 5, sm: 6, xl: 8 },
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
    width: "full",
    gap: { base: 5, sm: 6, xl: 8 },
  },
} as const satisfies GlobalStyleObject;
