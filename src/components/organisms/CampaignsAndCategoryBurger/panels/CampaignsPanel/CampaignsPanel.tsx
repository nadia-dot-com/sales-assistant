import { Separator, Stack } from "@chakra-ui/react";
import { NextLink } from "@/components/atoms/NextLink";
import { styles } from "@/components/organisms/CampaignsAndCategoryBurger/panels/CampaignsPanel/CampaignsPanel.styles";
import { routes } from "@/config/routes";
import type { Campaign } from "@/features/campaigns/types/types";

const TAG = "CampaignsPanel";

interface CampaignsPanelProps {
  campaigns: Campaign[];
  onDrawerClose: () => void;
}

export function CampaignsPanel({
  campaigns,
  onDrawerClose,
}: CampaignsPanelProps) {
  return (
    <Stack separator={<Separator />} data-testid={TAG}>
      {campaigns.map((campaign) => (
        <NextLink
          key={campaign.id}
          href={routes.campaign(campaign.slug)}
          onClick={onDrawerClose}
          {...styles.link}
        >
          {campaign.name}
        </NextLink>
      ))}
    </Stack>
  );
}
