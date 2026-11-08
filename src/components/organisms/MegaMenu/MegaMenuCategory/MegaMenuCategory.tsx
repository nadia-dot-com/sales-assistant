import { Button, Flex, Grid, Icon, Portal, SimpleGrid } from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { type RefObject, useState } from "react";
import { NextLink } from "@/components/atoms/NextLink";
import { styles } from "@/components/organisms/MegaMenu/MegaMenuCategory/MegaMenuCategory.styles";
import type { Category } from "@/lib/category/category.types";
import { searchHref } from "@/lib/category/searchHref";

interface MegaMenuCategoryProps {
  category: Category;
  allCategoriesTitle: string;
  containerRef: RefObject<HTMLDivElement | null>;
  onLeave: () => void;
}

export function MegaMenuCategory({
  category,
  containerRef,
  allCategoriesTitle,
  onLeave,
}: MegaMenuCategoryProps) {
  const hiddenCategories = category.children?.filter(
    (category) => category.show === false,
  );
  const [showSecondaryCategories, setShowSecondaryCategories] = useState<
    string[]
  >([]);
  const t = useTranslations();

  return (
    <Portal container={containerRef}>
      <Flex onMouseLeave={onLeave} {...styles.container}>
        <NextLink
          href={searchHref(null, category.key, category.id, 1)}
          {...styles.categoryTitle}
          onClick={() => onLeave()}
        >
          {category.title}
        </NextLink>
        <SimpleGrid columns={4} {...styles.subcategoryList}>
          {category.children?.map((secondLevelCategory) => {
            if (
              !secondLevelCategory.show &&
              !showSecondaryCategories.includes(category.id)
            ) {
              return null;
            }

            return (
              <Flex key={secondLevelCategory.key} {...styles.subcategory}>
                <NextLink
                  href={searchHref(
                    null,
                    category.key,
                    secondLevelCategory.id,
                    1,
                  )}
                  {...styles.subcategoryTitle}
                  onClick={() => onLeave()}
                >
                  {secondLevelCategory.title}
                </NextLink>
                <Grid {...styles.subcategoryGrid}>
                  {secondLevelCategory.children?.map(
                    (thirdLevelCategory: Category) => (
                      <NextLink
                        key={thirdLevelCategory.key}
                        href={searchHref(
                          null,
                          category.key,
                          thirdLevelCategory.id,
                          1,
                        )}
                        {...styles.subcategoryLink}
                        onClick={() => onLeave()}
                      >
                        {thirdLevelCategory.title}
                      </NextLink>
                    ),
                  )}
                  <NextLink
                    href={searchHref(
                      null,
                      category.key,
                      secondLevelCategory.id,
                      1,
                    )}
                    {...styles.allCategoriesLink}
                    onClick={() => onLeave()}
                  >
                    {allCategoriesTitle}
                    <Icon>
                      <ChevronRight size={16} />
                    </Icon>
                  </NextLink>
                </Grid>
              </Flex>
            );
          })}
        </SimpleGrid>
        {hiddenCategories &&
          hiddenCategories.length > 0 &&
          !showSecondaryCategories.includes(category.id) && (
            <Button
              variant="outline"
              onClick={() =>
                setShowSecondaryCategories((prev) => [...prev, category.id])
              }
              {...styles.viewAllButton}
            >
              {t("common.viewAll")}
            </Button>
          )}
      </Flex>
    </Portal>
  );
}
