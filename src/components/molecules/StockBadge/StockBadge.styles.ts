import type { GlobalStyleObject } from "@chakra-ui/react";

export const sizeStyles = {
  sm: {
    width: "fit",
    paddingX: 3,
    fontSize: "xs",
  },
  md: {
    width: "fit",
    paddingX: 5,
    paddingY: 2,
    fontSize: "lg",
  },
} as const satisfies GlobalStyleObject;

export const stockStatusStyles = {
  inStock: {
    color: "success-color",
    backgroundColor: "success-color.subtle",
  },
  lowStock: {
    color: "destructive-color/80",
    backgroundColor: "destructive-color/10",
  },
  outOfStock: {
    color: "destructive-color/80",
    backgroundColor: "destructive-color/10",
  },
} as const satisfies GlobalStyleObject;
