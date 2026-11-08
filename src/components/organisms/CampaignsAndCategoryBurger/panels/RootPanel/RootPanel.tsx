import { Separator, Stack } from "@chakra-ui/react";
import type { IconName } from "lucide-react/dynamic";
import { useTranslations } from "next-intl";
import { DrawerButton } from "@/components/atoms/DrawerButton/DrawerButton";
import type { PathType } from "@/components/organisms/CampaignsAndCategoryBurger/CampaignsAndCategoryBurger";

const TAG = "RootPanel";

interface RootPanelProps {
  onPathClick: (route: PathType) => void;
  iconName?: IconName;
}

export function RootPanel({ onPathClick, iconName }: RootPanelProps) {
  const t = useTranslations();
  return (
    <Stack separator={<Separator />} data-testid={TAG}>
      <DrawerButton
        type="button"
        onClick={() => onPathClick("categories")}
        title={t("rootLayout.header.categories.title")}
        iconName={iconName}
      />
      <DrawerButton
        type="button"
        onClick={() => onPathClick("campaigns")}
        title={t("rootLayout.header.campaigns.title")}
        iconName={iconName}
      />
    </Stack>
  );
}
