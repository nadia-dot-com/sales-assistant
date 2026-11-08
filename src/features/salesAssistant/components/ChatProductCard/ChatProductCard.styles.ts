import type { GlobalStyleObject } from "@chakra-ui/react";

const badge = {
  width: "fit",
  paddingX: 2,
  paddingY: 0.5,
};

export const styles = {
  card: {
    alignSelf: "center",
    height: "full",
    width: "full",
    border: "none",
    bg: "background-color",
    padding: 1.5,
  },
  info: {
    height: "full",
    width: "full",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 1,
  },
  link: {
    textDecoration: "none",
    flexDirection: "column",
    _hover: {
      color: "primary-color/90",
    },
  },
  brandContainer: {
    width: "100%",
    overflow: "hidden",
    marginRight: 1.5,
  },
  imageWrapper: {
    alignSelf: "flex-start",
    position: "relative",
    width: "120px",
    height: "180px",
    aspectRatio: "1 / 1",
    overflow: "hidden",
    objectFit: "cover",
    objectPosition: "center",
    rounded: "md",
    _disabled: {
      opacity: 0.5,
    },
  },
  image: {
    objectFit: "cover",
  },
  container: {
    width: "full",
    flexDirection: "row",
    paddingBottom: 2,
    gap: 2,
  },
  body: {
    flex: 1,
    minWidth: 0,
    gap: 1.5,
    position: "relative",
  },
  brandBadge: {
    ...badge,
    paddingX: 2,
    color: "foreground-color/80",
    backgroundColor: "foreground-color/10",
    fontSize: "xs",
    lineClamp: 1,
    textOverflow: "ellipsis",
  },
  matchedTagsWrapper: {
    width: "100%",
    flexWrap: "wrap",
    justifySelf: "flex-start",
    gap: 1,
  },
  matchedTagBadge: {
    ...badge,
    color: "success-color",
    backgroundColor: "success-color.subtle",
    fontSize: "xs",
    textOverflow: "ellipsis",
  },
  title: {
    fontWeight: "lighter",
    whiteSpace: "wrap",
    overflow: "hidden",
    alignSelf: "flex-start",
    lineClamp: 2,
    lineHeight: 1.5,
    textOverflow: "ellipsis",
    fontSize: { base: "14px", md: "md" },
  },
  shortDescription: {
    alignSelf: "flex-start",
    margin: 0,
    marginTop: "auto",
    lineClamp: 2,
    whiteSpace: "wrap",
    textOverflow: "ellipsis",
    color: "foreground-color/80",
  },
} as const satisfies GlobalStyleObject;
