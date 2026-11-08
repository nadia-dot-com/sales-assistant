import type { GlobalStyleObject } from "@chakra-ui/react";
import type { CSSProperties } from "react";

export const flagStyle: CSSProperties = {
  fontSize: "1.5em",
  lineHeight: "2em",
};

export const styles = {
  select: {
    width: "4em",
    rounded: "xl",
    gap: 0,
  },
  value: {
    textIndent: 2,
  },
  indicatorGroup: {
    paddingRight: 2,
  },
  content: {
    width: "130px",
  },
  title: {
    paddingBottom: 2,
    width: "200px",
  },
  item: {
    paddingX: 2,
    paddingY: 1,
    gap: 1,
  },
  smallContentView: {
    backgroundColor: "light-primary-color",
  },
  smallItemView: {
    _highlighted: {
      backgroundColor: "background-color",
    },
  },
} as const satisfies GlobalStyleObject;
