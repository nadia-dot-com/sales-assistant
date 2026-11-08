"use client";

import { Button, Drawer, Portal, Separator, Stack } from "@chakra-ui/react";
import { ArrowLeft, MenuIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { styles } from "@/components/organisms/CampaignsAndCategoryBurger/CampaignsAndCategoryBurger.styles";
import { CampaignsPanel } from "@/components/organisms/CampaignsAndCategoryBurger/panels/CampaignsPanel/CampaignsPanel";
import { CategoryPanel } from "@/components/organisms/CampaignsAndCategoryBurger/panels/CategoryPanel/CategoryPanel";
import { RootPanel } from "@/components/organisms/CampaignsAndCategoryBurger/panels/RootPanel/RootPanel";
import type { Campaign } from "@/features/campaigns/types/types";
import type { Category, CategoryStack } from "@/lib/category/category.types";

export type PathType = "root" | "categories" | "campaigns";

const TAG = "CampaignsAndCategoryBurger";

interface CampaignsAndCategoryBurgerProps {
  categories: Category[];
  campaigns: Campaign[];
}

export function CampaignsAndCategoryBurger({
  categories,
  campaigns,
}: CampaignsAndCategoryBurgerProps) {
  const t = useTranslations();

  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);
  const [path, setPath] = useState<PathType>("root");
  const initialCategoryObject = useMemo(
    () => ({
      id: categories[0].id,
      title: t("rootLayout.header.categories.title"),
      items: categories,
      key: "",
    }),
    [t, categories],
  );
  const [stack, setStack] = useState<CategoryStack[]>([initialCategoryObject]);

  const handleCategoryClick = (category: Category) => {
    return setStack((s) => [
      ...s,
      {
        id: category.id,
        title: category.title,
        key: category.key,
        items: category.children ?? [],
      },
    ]);
  };

  const handleBackNavigation = () => {
    if (path === "categories" && stack.length > 1) {
      setStack((s) => s.slice(0, -1));
      return;
    }

    setStack([initialCategoryObject]);
    setPath("root");
  };

  const handleDrawerClose = () => {
    if (path === "categories") {
      setStack([initialCategoryObject]);
    }

    setPath("root");
    setIsDrawerOpened(false);
  };

  const title =
    path === "categories"
      ? stack[stack.length - 1].title
      : path === "campaigns"
        ? t("rootLayout.header.campaigns.title")
        : t("rootLayout.header.burger.choose");

  return (
    <Drawer.Root
      open={isDrawerOpened}
      onOpenChange={(e) => setIsDrawerOpened(e.open)}
      size={{ sm: "full", md: "lg" }}
      placement="start"
    >
      <Drawer.Backdrop />
      <Drawer.Trigger asChild {...styles.burger} data-testid={TAG}>
        <MenuIcon />
      </Drawer.Trigger>
      <Portal>
        <Drawer.Positioner zIndex="max">
          <Drawer.Content {...styles.content}>
            <Drawer.Header>
              {path !== "root" && (
                <Button
                  type="button"
                  onClick={handleBackNavigation}
                  variant="ghost"
                >
                  <ArrowLeft />
                </Button>
              )}
              <Drawer.Title textAlign={path !== "root" ? "center" : "start"}>
                {title}
              </Drawer.Title>
              <Button type="button" onClick={handleDrawerClose} variant="ghost">
                <X />
              </Button>
            </Drawer.Header>
            <Drawer.Body>
              <Stack separator={<Separator />}>
                {path === "root" && (
                  <RootPanel onPathClick={(path: PathType) => setPath(path)} />
                )}
                {path === "categories" && (
                  <CategoryPanel
                    stack={stack}
                    onCategoryClick={handleCategoryClick}
                    onDrawerClose={handleDrawerClose}
                  />
                )}
                {path === "campaigns" && (
                  <CampaignsPanel
                    campaigns={campaigns}
                    onDrawerClose={handleDrawerClose}
                  />
                )}
              </Stack>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
