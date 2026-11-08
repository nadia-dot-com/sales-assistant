import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "full",
    gap: 5,
  },
  imageWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "280px",
    maxHeight: "280px",
    width: "full",
  },
  animationStyle: {
    width: "100%",
    height: "100%",
  },
  info: {
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "full",
    gap: 2,
  },
  title: {
    fontSize: "20px",
    textTransform: "uppercase",
  },
  button: {
    fontSize: "16px",
    fontWeight: "bold",
    px: 6,
    py: 4,
    backgroundColor: "dark-background-color",
    color: "background-color",
    rounded: "none",
  },
} as const satisfies GlobalStyleObject;
