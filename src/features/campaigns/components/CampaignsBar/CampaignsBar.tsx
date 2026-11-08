"use client";
import { Flex, Menu } from "@chakra-ui/react";
import { useState } from "react";
import { NextLink } from "@/components/atoms/NextLink";
import { MoreMenu } from "@/components/molecules/MoreMenu/MoreMenu";
import { MAX_CAMPAINGNS_SHOW } from "@/config/constants";
import { routes } from "@/config/routes";
import { styles } from "@/features/campaigns/components/CampaignsBar/CampaignsBar.styles";
import type { Campaign } from "@/features/campaigns/types/types";

const TAG = "CampaignsBar";

interface CampaignsBarProps {
  campaigns: Campaign[];
}

export function CampaignsBar({ campaigns }: CampaignsBarProps) {
  const [moreOpen, setMoreOpen] = useState(false);

  if (campaigns.length <= MAX_CAMPAINGNS_SHOW) {
    return (
      <Flex {...styles.container} data-testid={TAG}>
        {campaigns.map((campaign) => (
          <NextLink
            key={campaign.id}
            href={routes.campaign(campaign.slug)}
            {...styles.campaign}
          >
            {campaign.name}
          </NextLink>
        ))}
      </Flex>
    );
  }

  const firstThreeCampaings = campaigns.slice(0, MAX_CAMPAINGNS_SHOW);
  const restCampaings = campaigns.slice(MAX_CAMPAINGNS_SHOW, campaigns.length);

  return (
    <Flex {...styles.container} data-testid={TAG}>
      {firstThreeCampaings.map((campaign) => (
        <NextLink
          key={campaign.id}
          href={routes.campaign(campaign.slug)}
          {...styles.campaign}
        >
          {campaign.name}
        </NextLink>
      ))}
      <MoreMenu
        open={moreOpen}
        setIsOpen={(details) => setMoreOpen(details.open)}
      >
        {restCampaings.map((campaign) => (
          <Menu.Item
            key={campaign.id}
            value={campaign.slug}
            {...styles.moreItem}
          >
            <NextLink href={routes.campaign(campaign.slug)}>
              {campaign.name}
            </NextLink>
          </Menu.Item>
        ))}
      </MoreMenu>
    </Flex>
  );
}
