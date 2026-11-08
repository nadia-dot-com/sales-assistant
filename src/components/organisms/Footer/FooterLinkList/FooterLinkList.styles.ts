import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    fontWeight: "bold",
    w: { base: "50%", md: "auto" },
  },
  heading: {
    mb: { base: 6, md: 7 },
  },
  list: {
    flexDirection: "column",
    listStyle: "none",
    gap: { base: 3, md: 4 },
  },
  link: {
    color: "active-text-color",
    whiteSpace: "pre-line",
    textDecoration: "none",
    transition: "color 0.2s ease-in-out",
    _hover: { color: "primary-color" },
  },
} as const satisfies GlobalStyleObject;
