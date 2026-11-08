import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 2,
  },
  heading: {
    mb: 3,
    fontSize: "16px",
  },
  list: {
    justifyContent: { base: "flex-start" },
    flexDirection: "row",
    listStyle: "none",
    gap: 4,
    flexWrap: "wrap",
  },
  link: {
    fontSize: "25px",
    textDecoration: "none",
  },
  interactiveLink: {
    color: "white",
    transition: "color 0.2s ease-in-out",
    cursor: "pointer",
    _hover: { color: "primary-color" },
  },
  icon: {
    display: "inline-flex",
    width: 10,
    height: 10,
    "& svg": {
      width: "55%",
      height: "55%",
    },
  },
} as const satisfies GlobalStyleObject;
