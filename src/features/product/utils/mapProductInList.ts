import { ATTRIBUTES_RAW_KEYS } from "@/features/product/constants/attributesRawKeys";
import type { ProductInList } from "@/features/product/types/productResponse.types";
import { getAttributeValue } from "@/features/product/utils/getAttributeValue";
import type { ProductAttributeValue } from "@/graphQl/types/commercetoolsProduct.types";

export const mapProductInList = (productInList: ProductInList) => {
  const { price, availability, images, attributesRaw } =
    productInList.masterVariant;
  const mainImage = images[0];

  const brandValue = attributesRaw.find(
    (attribute) => attribute.name === ATTRIBUTES_RAW_KEYS.brand,
  )?.value as ProductAttributeValue | ProductAttributeValue[] | undefined;

  return {
    key: productInList.key,
    name: productInList.name,
    brand: Array.isArray(brandValue) ? brandValue[0]?.label : brandValue?.label,
    shortDescription: getAttributeValue(
      attributesRaw,
      ATTRIBUTES_RAW_KEYS.short_description,
    ),
    image: {
      src: mainImage.url,
      alt: productInList.name,
    },
    isOnStock: availability.noChannel.isOnStock,
    price: {
      centAmount: price.value.centAmount,
      currencyCode: price.value.currencyCode,
    },
    discounted: price.discounted
      ? {
          name: price.discounted.discount.name,
          amount: price.discounted.value.centAmount,
        }
      : null,
    matchedTags: productInList.matchedTags ?? [],
  };
};
