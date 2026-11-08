import { cache } from "react";
import { CURRENCY } from "@/config/constants";
import { LOCALE } from "@/config/env.public";
import type { ProductDetails } from "@/features/product/types/productDetails.types";
import { mapProduct } from "@/features/product/utils/mapProduct";
import { httpApiRoot } from "@/graphQl/client/admin/client";

async function getProduct(key: string): Promise<ProductDetails> {
  const query = `
    query GetProductDetails($key: String!, $locale: Locale!) {
      product(key: $key) {
        key
        masterData {
          current {
            name(locale: $locale)
            description(locale: $locale)
            slug(locale: $locale)
            categories {
              id
              key
              name(locale: $locale)
              ancestors {
                id
                key
                name(locale: $locale)
              }
            }
            masterVariant {
              sku
              price(currency: "${CURRENCY}") {
                value {
                  centAmount
                  currencyCode
                }
                discounted {
                  value {
                  centAmount
                }
                discount {
                  name(locale: $locale)
                  }
                }
              }
              attributesRaw {
                name
                value
              }
              images {
                url
              }
              availability {
                noChannel {
                  isOnStock
                  availableQuantity
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await httpApiRoot
    .graphql()
    .post({
      body: {
        query,
        variables: { key, locale: LOCALE },
      },
    })
    .execute();

  if (response.body.errors) {
    throw new Error(
      `Failed to fetch product "${key}": ${response.body.errors[0]?.message ?? "Unknown GraphQL error"}`,
    );
  }

  const product = response.body.data.product;

  return mapProduct(product);
}

const cacheGetProduct = cache(getProduct);

export { cacheGetProduct as getProduct };
