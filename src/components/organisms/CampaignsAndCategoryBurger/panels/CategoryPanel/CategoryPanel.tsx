import { Flex, Separator, Stack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { DrawerButton } from "@/components/atoms/DrawerButton/DrawerButton";
import { NextLink } from "@/components/atoms/NextLink";
import { styles } from "@/components/organisms/CampaignsAndCategoryBurger/panels/CategoryPanel/CategoryPanel.styles";
import type { Category, CategoryStack } from "@/lib/category/category.types";
import { searchHref } from "@/lib/category/searchHref";

const TAG = "CategoryPanel";

interface CategoryPanelProps {
  stack: CategoryStack[];
  onCategoryClick: (category: Category) => void;
  onDrawerClose: () => void;
}

export function CategoryPanel({
  stack,
  onCategoryClick,
  onDrawerClose,
}: CategoryPanelProps) {
  const currentCategory = stack[stack.length - 1];
  const showViewAllLink = stack.length >= 2;
  const ancestorTags = stack.slice(1).map((entry) => entry.key);
  const firstLevelCategory = ancestorTags[0];
  const t = useTranslations();

  return (
    <Flex {...styles.wrapper} data-testid={TAG}>
      {showViewAllLink && (
        <NextLink
          href={searchHref(null, firstLevelCategory, currentCategory.id, 1)}
          onClick={onDrawerClose}
          {...styles.viewAll}
        >
          {t("common.viewAll")}
        </NextLink>
      )}
      <Stack separator={<Separator />} {...styles.stack}>
        {currentCategory.items.map((category) => {
          const hasSubcategories = (category.children ?? []).length > 1;

          if (!hasSubcategories) {
            return (
              <NextLink
                key={category.key}
                href={searchHref(
                  null,
                  firstLevelCategory ?? category.key,
                  category.id,
                  1,
                )}
                onClick={onDrawerClose}
                {...styles.link}
              >
                {category.title}
              </NextLink>
            );
          }

          return (
            <DrawerButton
              key={category.key}
              type="button"
              onClick={() => onCategoryClick(category)}
              title={category.title}
            />
          );
        })}
      </Stack>
    </Flex>
  );
}
