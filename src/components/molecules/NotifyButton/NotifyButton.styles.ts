import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  button: {
    mt: { base: 2, md: 0 },
    width: { base: "full", sm: "fit-content" },
    gap: 3,
    fontWeight: 700,
    px: 6,
    py: 4,
    backgroundColor: "dark-background-color",
    rounded: "none",
    borderLeft: "1px solid",
  },
} as const satisfies GlobalStyleObject;
