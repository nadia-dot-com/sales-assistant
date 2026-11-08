import type { GlobalStyleObject } from "@chakra-ui/react";

const badge = {
  width: "fit",
  paddingX: 3,
};

export const styles = {
  card: {
    alignSelf: "center",
    position: "relative",
    height: "full",
    border: "none",
    rounded: "none",
    width: "full",
    bg: "light-gray-background-color",
    _hover: {
      color: "primary-color/90",
    },
  },
  link: {
    height: "full",
    textDecoration: "none",
  },
  imageWrapper: {
    position: "relative",
    width: "full",
    aspectRatio: "1 / 1",
    overflow: "hidden",
    objectFit: "cover",
    objectPosition: "center",
    _disabled: {
      opacity: 0.5,
    },
  },
  image: {
    objectFit: "cover",
  },
  body: {
    width: "full",
    py: { base: 2, xs: 1.5, md: 2 },
    px: { base: 2.5, lg: 3 },
  },
  productInfo: {
    display: "column",
    spaceY: 0.5,
  },
  brandBadge: {
    ...badge,
    color: "foreground-color/80",
    backgroundColor: "foreground-color/10",
    fontSize: "xs",
  },
  title: {
    fontWeight: "lighter",
    flex: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: { base: "14px", md: "md" },
  },
  price: {
    fontWeight: "normal",
  },
  discountedPrice: {
    fontWeight: "normal",
    textDecoration: "line-through",
    textDecorationColor: "foreground-color.muted",
    color: "foreground-color.muted",
  },
} as const satisfies GlobalStyleObject;
