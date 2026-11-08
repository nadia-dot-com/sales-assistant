import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  container: {
    position: "absolute",
    flexDirection: "column",
    top: "100%",
    left: 0,
    zIndex: "popover",
    backgroundColor: "background-color",
    width: "full",
    padding: "20px",
    spaceY: "25px",
  },
  categoryTitle: {
    fontSize: "24px",
    textDecoration: "none",
    fontWeight: "bold",
    _hover: {
      color: "primary-color",
    },
  },
  subcategoryList: {
    gap: "20px",
  },
  subcategory: {
    flexDirection: "column",
  },
  subcategoryTitle: {
    fontSize: "20px",
    textDecoration: "none",
    fontWeight: "semibold",
    _hover: {
      color: "primary-color",
    },
  },
  subcategoryGrid: {
    gridAutoFlow: "column",
    gridTemplateRows: "repeat(9, min-content)",
    gridAutoColumns: "minmax(0, 1fr)",
  },
  subcategoryLink: {
    fontSize: "16px",
    color: "foreground-color",
    textDecoration: "none",
    fontWeight: "normal",
    transition: "color 0.2s ease-in-out",
    _hover: {
      color: "primary-color",
    },
    _active: {
      color: "primary-color",
    },
  },
  allCategoriesLink: {
    fontSize: "16px",
    color: "foreground-color",
    textDecoration: "none",
    fontWeight: "normal",
    alignItems: "center",
    transition: "color 0.2s ease-in-out",
    _hover: {
      color: "primary-color",
    },
  },
  viewAllButton: {
    textTransform: "uppercase",
    fontWeight: "semibold",
  },
} as const satisfies GlobalStyleObject;
