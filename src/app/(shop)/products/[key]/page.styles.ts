import type { GlobalStyleObject } from "@chakra-ui/react";

const badge = {
  width: "fit",
  paddingX: 5,
  paddingY: 2,
  fontSize: "lg",
};

export const styles = {
  container: {
    flexDir: "column",
    width: "full",
  },
  topSection: {
    gap: 8,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "full",
    flexDir: { base: "column", md: "row" },
    pt: { base: 5 },
    pb: { base: 8, md: 12 },
  },
  infoColumn: {
    flexDir: "column",
    gap: { base: 4, md: 5 },
    float: "right",
    width: "full",
  },
  title: {
    fontWeight: 500,
  },
  description: {
    color: "foreground-color",
    width: "full",
  },
  discountBadge: {
    ...badge,
    color: "white",
    backgroundColor: "destructive-color",
    position: "absolute",
    fontSize: "14px",
    fontWeight: "extrabold",
    zIndex: "max",
    textTransform: "uppercase",
  },
  brand: {
    color: "primary-color",
    fontSize: "sm",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "wide",
  },
} as const satisfies GlobalStyleObject;
