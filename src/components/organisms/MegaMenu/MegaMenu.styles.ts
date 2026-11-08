import type { GlobalStyleObject } from "@chakra-ui/react";

export const CATEGORY_GAP_PX = 10;

export const styles = {
  container: {
    flexDirection: "column",
    position: "relative",
    width: "full",
  },
  megaMenuContentWrapper: {
    spaceX: "10px",
    alignItems: "center",
    paddingBottom: "5px",
  },
  megaMenuContent: {
    spaceX: "10px",
    alignItems: "center",
    flexWrap: "nowrap",
    flexShrink: 0,
  },
  categoryList: {
    spaceX: `${CATEGORY_GAP_PX}px`,
    flexWrap: "nowrap",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    width: "full",
  },
  measureRow: {
    spaceX: `${CATEGORY_GAP_PX}px`,
    flexWrap: "nowrap",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    visibility: "hidden",
    pointerEvents: "none",
    zIndex: -1,
  },
  categoryHeading: {
    cursor: "pointer",
    fontWeight: "normal",
    fontSize: "14px",
    whiteSpace: "nowrap",
    transition: "color 0.2s ease-in-out",
    _hover: {
      color: "primary-color",
    },
    _active: {
      color: "primary-color",
    },
  },
  skeletonRow: {
    spaceX: `${CATEGORY_GAP_PX}px`,
    flexWrap: "nowrap",
    alignItems: "center",
    width: "full",
    overflow: "hidden",
    height: "30px",
  },
  skeletonItem: {
    height: "60%",
    width: "120px",
    borderRadius: "sm",
    flexShrink: 0,
  },
  moreItem: {
    cursor: "pointer",
    fontWeight: "normal",
    fontSize: "14px",
    whiteSpace: "nowrap",
    padding: 1.5,
    transition: "color 0.2s ease-in-out, background-color 0.2s ease-in-out",
    _hover: {
      color: "primary-color",
      backgroundColor: "active-text-color",
    },
  },
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "black/30",
    width: "100dvw",
    height: "100dvh",
    zIndex: "overlay",
  },
} as const satisfies GlobalStyleObject;
