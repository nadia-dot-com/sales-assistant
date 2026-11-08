import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  root: {
    position: "relative",
    flex: { base: "1 1 100%", sm: 1 },
    minWidth: 0,
    width: "full",
    order: { base: -1, sm: 0 },
  },
  rootMultiline: {
    position: "relative",
    flex: "1 1 100%",
    minWidth: 0,
    width: "full",
    order: -1,
  },
  textarea: {
    display: "block",
    border: "1px solid",
    borderColor: "input-dark-border-color",
    width: "full",
    minWidth: 0,
    minHeight: 0,
    height: "auto",
    maxHeight: "200px",
    paddingX: 3,
    paddingY: 2,
    resize: "none",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    fieldSizing: "content",
    fontSize: "16px",
    lineHeight: 1.4,
    _focus: {
      outline: "1px solid",
      outlineColor: "primary-color",
    },
    paddingRight: "40px",
  },
  submitButton: {
    alignSelf: "flex-end",
  },
  deleteButton: {
    position: "absolute",
    right: "0px",
    top: "0px",
    border: "none",
    backgroundColor: "transparent",
    willChange: "transform",
    transition: "scale 500ms ease",
    _hover: {
      scale: 1.06,
    },
    _disabled: {
      color: "foreground-color.muted",
    },
  },
} as const satisfies GlobalStyleObject;
