import { ATTRIBUTES_RAW_KEYS } from "@/features/product/constants/attributesRawKeys";
import type { ProductDetails } from "@/features/product/types/productDetails.types";
import { defineLowStock } from "@/features/product/utils/defineLowStock";
import { getAttributeValue } from "@/features/product/utils/getAttributeValue";
import type { CommercetoolsProduct } from "@/graphQl/types/commercetoolsProduct.types";

export function mapProduct(product: CommercetoolsProduct): ProductDetails {
  const data = product.masterData.current;
  const variant = data.masterVariant;

  return {
    id: product.key,
    sku: variant.sku,
    name: data.name,
    description: data.description,
    slug: data.slug,
    categories: [
      ...data.categories[0].ancestors.map((ancestor) => ({
        id: ancestor.id,
        key: ancestor.key,
        title: ancestor.name,
      })),
      {
        id: data.categories[0].id,
        key: data.categories[0].key,
        title: data.categories[0].name,
      },
    ],
    price: {
      centAmount: variant.price.value.centAmount,
      currencyCode: variant.price.value.currencyCode,
    },
    discounted: variant.price.discounted
      ? {
          centAmount: variant.price.discounted.value.centAmount,
          name: variant.price.discounted.discount.name,
        }
      : null,
    imagesUrls: variant.images.map((image) => ({
      url: image.url,
      alt: data.name,
    })),
    availability: {
      isOnStock: variant.availability.noChannel.isOnStock,
      lowStock: defineLowStock(
        variant.availability.noChannel.availableQuantity,
      ),
    },
    shortDescription: getAttributeValue(
      variant.attributesRaw,
      ATTRIBUTES_RAW_KEYS.short_description,
    ),
    brand: getAttributeValue(variant.attributesRaw, ATTRIBUTES_RAW_KEYS.brand),
    attributes: {
      netContent: getAttributeValue(
        variant.attributesRaw,
        ATTRIBUTES_RAW_KEYS.net_content,
      ),
      productForm: getAttributeValue(
        variant.attributesRaw,
        ATTRIBUTES_RAW_KEYS.product_form,
      ),
      manufacturingCountry: getAttributeValue(
        variant.attributesRaw,
        ATTRIBUTES_RAW_KEYS.manufacturing_country,
      ),
      targetNeed: getAttributeValue(
        variant.attributesRaw,
        ATTRIBUTES_RAW_KEYS.target_need,
      ),
      packaging: getAttributeValue(
        variant.attributesRaw,
        ATTRIBUTES_RAW_KEYS.packaging,
      ),
    },
    ingredients: getAttributeValue(
      variant.attributesRaw,
      ATTRIBUTES_RAW_KEYS.ingredients,
    ),
  };
}
