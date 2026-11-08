import type { CSSProperties } from "react";

export const styles = {
  errorBoundary: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60dvh",
    width: "100%",
  },
} as const satisfies Record<string, CSSProperties>;
