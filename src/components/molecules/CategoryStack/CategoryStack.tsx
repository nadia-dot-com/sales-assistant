import { ScrollArea, Stack } from "@chakra-ui/react";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { styles } from "@/components/molecules/CategoryStack/CategoryStack.styles";
import type { Category } from "@/lib/category/category.types";
import { searchHref } from "@/lib/category/searchHref";

interface CategoryStackProps {
  firstLevelCategory: string;
  categories: Omit<Category[], "children">;
  currentCategory: Category;
}

const TAG = "CategoryStack";

export function CategoryStack({
  firstLevelCategory,
  categories,
  currentCategory,
}: CategoryStackProps) {
  return (
    <ScrollArea.Root size="xs" {...styles.root} data-testid={TAG}>
      <ScrollArea.Viewport>
        <ScrollArea.Content {...styles.scrollAreaContent}>
          <Stack as="nav" direction="row" {...styles.nav}>
            {categories.map((category) => {
              const isCurrentCategory = currentCategory.id === category.id;

              if (isCurrentCategory) {
                return null;
              }

              return (
                <ButtonLink
                  key={category.id}
                  href={searchHref(null, firstLevelCategory, category.id, 1)}
                  variant="plain"
                  {...styles.buttonLink}
                >
                  {category.title}
                </ButtonLink>
              );
            })}
          </Stack>
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="horizontal" />
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}
