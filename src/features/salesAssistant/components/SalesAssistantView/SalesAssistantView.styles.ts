import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  container: {
    height: "full",
    minHeight: "70dvh",
    width: "full",
    flexDirection: "column",
  },
  inputBar: {
    backgroundColor: "light-primary-color",
    zIndex: "dropdown",
    position: "sticky",
    flexWrap: "wrap",
    bottom: 4,
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "full",
    paddingX: 2,
    paddingY: 2,
    gap: { base: 2, lg: 3 },
    borderWidth: "1px",
    borderRadius: "xl",
  },
  editableWrapper: {
    gap: 1,
    width: { base: "100%", md: "80dvw", lg: "55dvw" },
    minWidth: 0,
    alignItems: "flex-end",
  },
  wrapper: {
    width: "full",
    height: "full",
    paddingTop: { base: 0 },
    flexDirection: "column",
    alignItems: "center",
    justifyContent: { base: "space-between", md: "center" },
    gap: { md: "100px", lg: 14 },
  },
  submitButton: {
    color: "background-color",
    backgroundColor: "primary-color",
    _disabled: {
      color: "background-color",
      backgroundColor: "primary-color",
      opacity: "0.5",
    },
  },
  controlButtons: {
    gap: 3,
  },
  controlContainer: {
    gap: 3,
  },
} as const satisfies GlobalStyleObject;
