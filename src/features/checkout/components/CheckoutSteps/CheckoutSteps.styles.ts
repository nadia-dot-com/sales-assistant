import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  checkoutSections: {
    flexDirection: "column",
    alignItems: "center",
    width: "full",
    gap: 8,
  },
  title: {
    fontSize: "25px",
    textTransform: "uppercase",
  },
  contactSection: {
    flexDirection: "column",
    width: "full",
    paddingY: 7,
    paddingX: 2,
    gap: 1,
    borderBottomWidth: "1px",
  },
  contactLabel: {
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "18px",
    paddingBottom: 4,
  },
  contactValue: {
    fontSize: "16px",
  },
  accordion: {
    width: "full",
  },
  completeOrderForm: {
    justifyContent: "center",
    width: "full",
  },
  button: {
    fontSize: "16px",
    minWidth: "200px",
    fontWeight: "bold",
    px: 6,
    py: 4,
    backgroundColor: "dark-background-color",
    color: "background-color",
    rounded: "none",
    _disabled: {
      opacity: 0.5,
    },
  },
} as const satisfies GlobalStyleObject;
