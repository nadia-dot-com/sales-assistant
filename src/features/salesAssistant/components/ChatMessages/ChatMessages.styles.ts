import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  list: {
    flex: 1,
    minHeight: 0,
    flexDirection: "column",
    scrollBehavior: "smooth",
    width: "full",
    paddingBottom: 10,
    overflowX: "hidden",
  },
  spinner: {
    paddingTop: 2,
    alignSelf: "flex-start",
  },
} as const satisfies GlobalStyleObject;
