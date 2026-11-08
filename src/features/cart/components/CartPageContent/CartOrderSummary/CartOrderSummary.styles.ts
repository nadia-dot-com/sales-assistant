import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  container: {
    flexDir: "column",
    gap: 3,
    width: { base: "full", xl: "400px" },
    flexShrink: 0,
    p: { base: 3, sm: 4, xl: 6 },
    backgroundColor: "light-gray-background-color",
    borderRadius: "l3",
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalRow: {
    justifyContent: "space-between",
    alignItems: "baseline",
    borderTop: "1px solid",
    borderColor: "neutral-color",
    pt: 3,
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: "lg",
  },
  totalLabelHint: {
    color: "foreground-color.muted",
    fontSize: "sm",
    fontWeight: "normal",
  },
  totalPrice: {
    fontWeight: "bold",
  },
  checkoutButton: {
    fontSize: "16px",
    rounded: "none",
    fontWeight: "bold",
    mt: 2,
  },
  weAcceptHeading: {
    fontSize: "md",
    mt: 2,
  },
  paymentMethods: {
    flexWrap: "wrap",
    gap: 2,
  },
  paymentMethodIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid",
    borderColor: "neutral-color",
    borderRadius: "l2",
    backgroundColor: "background-color",
    width: "64px",
    height: "40px",
    "& svg": {
      maxWidth: "70%",
      maxHeight: "60%",
    },
  },
} as const satisfies GlobalStyleObject;
