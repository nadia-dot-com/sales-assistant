import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  footer: {
    flexDirection: "column",
    width: "full",
    flexShrink: 0,
    background: "#0f172b",
    color: "active-text-color",
    px: { base: "20px", md: "30px", xxl: "48px" },
  },
  topSection: {
    flexDirection: { base: "column", md: "row" },
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: { base: 10, md: 7 },
    py: { base: 12, md: 16 },
  },
  brandSection: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 7,
    w: { base: "full", md: "50%" },
  },
  navColumns: {
    flexDirection: { base: "column", sm: "row" },
    alignItems: "flex-start",
    justifyContent: { base: "start", md: "end" },
    w: { base: "full", md: "50%" },
    gap: { base: 7, sm: 4, md: "90px" },
  },
  iconColumnsStack: {
    alignItems: "center",
    justifyContent: "center",
    width: "full",
    gap: "300px",
    pb: 7,
  },
  legalBar: {
    flexDirection: { base: "column", md: "row" },
    width: "full",
    borderTop: "1px solid",
    borderColor: "inverse-text-color",
    py: { base: 5, md: 6 },
    justifyContent: "space-between",
  },
  legalLink: {
    color: "active-text-color",
    textDecoration: "none",
    transition: "color 0.2s ease-in-out",
    _hover: { color: "primary-color" },
  },
} as const satisfies GlobalStyleObject;
