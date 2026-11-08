import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "full",
  },
  imageWrapper: {
    maxWidth: "250px",
    maxHeight: "250px",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "full",
  },
  animationStyle: {
    width: "100%",
    height: "100%",
  },
  info: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "full",
    textAlign: "center",
    gap: 2,
  },
  title: {
    fontSize: "20px",
    textTransform: "uppercase",
  },
  button: {
    fontSize: "18px",
    marginTop: 5,
    fontWeight: "bold",
    px: 6,
    py: 4,
    backgroundColor: "dark-background-color",
    color: "background-color",
    rounded: "none",
  },
} as const satisfies GlobalStyleObject;
