"use client";
import {
  Box,
  Flex,
  Heading,
  Menu,
  Portal,
  Separator,
  Skeleton,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { MoreMenu } from "@/components/molecules/MoreMenu/MoreMenu";
import {
  CATEGORY_GAP_PX,
  styles,
} from "@/components/organisms/MegaMenu/MegaMenu.styles";
import { MegaMenuCategory } from "@/components/organisms/MegaMenu/MegaMenuCategory/MegaMenuCategory";
import { CampaignsBar } from "@/features/campaigns/components/CampaignsBar/CampaignsBar";
import type { Campaign } from "@/features/campaigns/types/types";
import { useOverflowCount } from "@/hooks/useOverflowCount";
import type { Category } from "@/lib/category/category.types";
import { isNotVisibleOnPage } from "@/utils/isNotVisibleOnPage";

interface MegaMenuProps {
  categories: Category[];
  campaigns: Campaign[];
}

export function MegaMenu({ categories, campaigns }: MegaMenuProps) {
  const t = useTranslations();
  const {
    containerRef: listRef,
    measureRef,
    moreRef,
    visibleCount,
    measured,
  } = useOverflowCount({
    itemCount: categories.length,
    gap: CATEGORY_GAP_PX,
  });

  const [currentCategory, setCurrentCategory] = useState<
    Category | undefined
  >();
  const [moreOpen, setMoreOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  if (isNotVisibleOnPage(pathname)) {
    return null;
  }

  const visibleCategories = categories.slice(0, visibleCount);
  const overflowCategories = categories.slice(visibleCount);
  const hasOverflowingCategories = overflowCategories.length > 0;

  return (
    <Flex
      {...styles.container}
      ref={containerRef}
      onMouseLeave={() => setCurrentCategory(undefined)}
    >
      <Flex {...styles.megaMenuContentWrapper}>
        <Flex
          {...styles.categoryList}
          justifyContent={hasOverflowingCategories ? "space-between" : ""}
          ref={listRef}
        >
          {!measured && (
            <Flex ref={measureRef} {...styles.skeletonRow} aria-hidden>
              {categories.map((category) => (
                <Skeleton key={category.key} {...styles.skeletonItem} />
              ))}
            </Flex>
          )}

          {measured &&
            visibleCategories.map((category) => {
              const isCurrentCategory = currentCategory === category;

              return (
                <Heading
                  key={category.key}
                  onClick={() =>
                    setCurrentCategory(isCurrentCategory ? undefined : category)
                  }
                  onMouseEnter={() => setCurrentCategory(category)}
                  {...styles.categoryHeading}
                  color={isCurrentCategory ? "primary-color" : ""}
                >
                  {category.title}
                </Heading>
              );
            })}

          {measured && hasOverflowingCategories && (
            <MoreMenu
              open={moreOpen}
              ref={moreRef}
              setIsOpen={(details) => setMoreOpen(details.open)}
              hasCurrentOption={overflowCategories.some(
                (cat) => cat === currentCategory,
              )}
              onClick={() => setCurrentCategory(undefined)}
            >
              {overflowCategories.map((category) => (
                <Menu.Item
                  key={category.key}
                  value={category.key}
                  onClick={() => {
                    setMoreOpen(false);
                    setCurrentCategory(category);
                  }}
                  color={currentCategory === category ? "primary-color" : ""}
                  {...styles.moreItem}
                >
                  {category.title}
                </Menu.Item>
              ))}
            </MoreMenu>
          )}

          <Flex {...styles.measureRow} ref={measureRef} aria-hidden>
            {categories.map((category) => (
              <Heading key={category.key} {...styles.categoryHeading}>
                {category.title}
              </Heading>
            ))}
          </Flex>
        </Flex>

        {campaigns.length > 0 && (
          <Flex
            {...styles.megaMenuContent}
            onMouseEnter={() => setCurrentCategory(undefined)}
            onClick={() => setCurrentCategory(undefined)}
          >
            <Separator orientation="vertical" height={5} size="md" />
            <CampaignsBar campaigns={campaigns} />
          </Flex>
        )}
      </Flex>
      {currentCategory && (
        <>
          <MegaMenuCategory
            category={currentCategory}
            allCategoriesTitle={t("common.allCategories")}
            onLeave={() => setCurrentCategory(undefined)}
            containerRef={containerRef}
          />
          <Portal>
            <Box
              onClick={() => setCurrentCategory(undefined)}
              {...styles.overlay}
            />
          </Portal>
        </>
      )}
    </Flex>
  );
}
