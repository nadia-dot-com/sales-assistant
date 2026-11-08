import { Breadcrumb } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import { Fragment } from "react";
import { NextLink } from "@/components/atoms/NextLink";
import { styles } from "@/components/molecules/CategoryBreadcrumb/CategoryBreadcrumb.styles";
import { routes } from "@/config/routes";
import type { Category } from "@/lib/category/category.types";
import { searchHref } from "@/lib/category/searchHref";

const TAG = "ProductBreadcrumb";

interface CategoryBreadcrumbProps {
  categoryList: Category[];
  productName?: string;
}

export async function CategoryBreadcrumb({
  categoryList,
  productName,
}: CategoryBreadcrumbProps) {
  const t = await getTranslations();
  const firstLevelCategory = categoryList[0];

  return (
    <Breadcrumb.Root data-testid={TAG} size="md">
      <Breadcrumb.List {...styles.list}>
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild {...styles.link}>
            <NextLink href={routes.home}>
              {t("productPage.breadcrumb.home")}
            </NextLink>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator {...styles.separator}>/</Breadcrumb.Separator>
        {categoryList.map((category) => (
          <Fragment key={category.id}>
            <Breadcrumb.Item>
              <Breadcrumb.Link asChild {...styles.link}>
                <NextLink
                  href={searchHref(
                    null,
                    firstLevelCategory.key,
                    category.id,
                    1,
                  )}
                >
                  {category.title}
                </NextLink>
              </Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator {...styles.separator}>/</Breadcrumb.Separator>
          </Fragment>
        ))}

        <Breadcrumb.Item>
          <Breadcrumb.CurrentLink {...styles.current}>
            {productName}
          </Breadcrumb.CurrentLink>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
}
