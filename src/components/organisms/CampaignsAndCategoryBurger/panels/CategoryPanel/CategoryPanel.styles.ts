import type { GlobalStyleObject } from "@chakra-ui/react";
import { drawerLink } from "@/components/organisms/CampaignsAndCategoryBurger/panels/panels.styles";

export const styles = {
  wrapper: {
    flexDirection: "column",
    spaceY: "10px",
  },
  stack: {
    width: "full",
  },
  viewAll: {
    alignSelf: "end",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  link: drawerLink,
} as const satisfies GlobalStyleObject;
