import type { GlobalStyleObject } from "@chakra-ui/react";

export const styles = {
  header: {
    position: "relative",
    zIndex: "modal",
    backgroundColor: "background-color",
    width: "full",
    paddingX: { base: "20px", md: "30px", xxl: "48px" },
    paddingTop: "20px",
    paddingBottom: "5px",
    columnGap: "20px",
    rowGap: { base: "16px", sm: "10px" },
    alignItems: "center",
    shadow: "md",
    gridTemplateColumns: "1fr auto auto",
    gridTemplateAreas: `"logo logo icons" "search search search"`,
    sm: {
      gridTemplateColumns: "auto 1fr auto",
      gridTemplateAreas: `"logo search icons" "megaMenu megaMenu megaMenu"`,
    },
  },
  logo: {
    gridArea: "logo",
    flexShrink: 0,
    width: "fit-content",
  },
  search: {
    gridArea: "search",
  },
  icons: {
    gridArea: "icons",
    justifySelf: "end",
  },
  megaMenu: {
    gridArea: "megaMenu",
    display: "none",
    lg: {
      display: "block",
      flexDirection: "column",
    },
  },
  iconLinkList: {
    spaceX: "15px",
    alignItems: "center",
  },
} as const satisfies GlobalStyleObject;
