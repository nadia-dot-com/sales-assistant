import { Flex } from "@chakra-ui/react";

import { CampaignsAndCategoryBurger } from "@/components/organisms/CampaignsAndCategoryBurger/CampaignsAndCategoryBurger";
import { styles } from "@/components/organisms/Header/Header.styles";
import { AccountIcon } from "@/components/organisms/Header/HeaderNavigationIcons/AccountIcon/AccountIcon";
import type { SessionUser } from "@/features/auth/types/auth.types";
import type { Campaign } from "@/features/campaigns/types/types";
import { CartPopover } from "@/features/cart/components/CartPopover/CartPopover";
import type { Category } from "@/lib/category/category.types";

const TAG = "HeaderNavigationIcons";

interface HeaderNavigationIconsProps {
  categories: Category[];
  user: SessionUser | undefined;
  campaigns: Campaign[];
}

export async function HeaderNavigationIcons({
  categories,
  user,
  campaigns,
}: HeaderNavigationIconsProps) {
  return (
    <Flex as="nav" {...styles.iconLinkList} data-testid={TAG}>
      <AccountIcon user={user} />
      <CartPopover />
      <CampaignsAndCategoryBurger
        categories={categories}
        campaigns={campaigns}
      />
    </Flex>
  );
}
