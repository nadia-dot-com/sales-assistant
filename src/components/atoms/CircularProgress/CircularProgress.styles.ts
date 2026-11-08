import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    alignSelf: "flex-end",
    zIndex: 1,
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    opacity: 0.8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "conic-gradient(var(--progress-color) calc(var(--progress) * 1%),  var(--neutral-color) calc(var(--progress) * 1%))",
    marginTop: "auto",
  },
  center: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "background-color",
    zIndex: 2,
    fontSize: "10px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "extrabold",
    color: "black",
  },
} as const satisfies GlobalStyleObject;
