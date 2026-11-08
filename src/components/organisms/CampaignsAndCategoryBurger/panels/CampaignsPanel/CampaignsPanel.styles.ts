import type { GlobalStyleObject } from "@chakra-ui/react";
import { drawerLink } from "@/components/organisms/CampaignsAndCategoryBurger/panels/panels.styles";

export const styles = {
  link: drawerLink,
} as const satisfies GlobalStyleObject;
