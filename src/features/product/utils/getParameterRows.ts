import type { ParameterRow } from "@/features/product/types/ProductTabs.types";
import type { ProductDetailsAttributes } from "@/features/product/types/productDetails.types";

const BLANK_VALUE = "blank";

export function getParameterRows(
  attributes: ProductDetailsAttributes,
  t: (key: string) => string,
): ParameterRow[] {
  const rows: (ParameterRow | null)[] = [
    attributes.productForm
      ? {
          label: t("productPage.productTabs.parameters.productForm"),
          value: attributes.productForm,
        }
      : null,
    attributes.netContent
      ? {
          label: t("productPage.productTabs.parameters.netContent"),
          value: attributes.netContent,
        }
      : null,
    attributes.manufacturingCountry
      ? {
          label: t("productPage.productTabs.parameters.manufacturingCountry"),
          value: attributes.manufacturingCountry,
        }
      : null,
    attributes.targetNeed
      ? {
          label: t("productPage.productTabs.parameters.targetNeed"),
          value: attributes.targetNeed,
        }
      : null,
    attributes.packaging
      ? {
          label: t("productPage.productTabs.parameters.packaging"),
          value: attributes.packaging,
        }
      : null,
  ];

  return rows.filter((row) => !!row).filter((row) => row.value !== BLANK_VALUE);
}
