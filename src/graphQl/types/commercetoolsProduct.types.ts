import type { PriceType } from "@/types/price.types";

export interface ProductAttribute {
  name: string;
  value: string | ProductAttributeValue | ProductAttributeValue[];
}

export interface ProductAttributeValue {
  key: string;
  label: string;
}

export interface CommercetoolsProduct {
  key: string;

  masterData: {
    current: {
      name: string;
      description: string;
      slug: string;
      categories: {
        id: string;
        key: string;
        name: string;
        ancestors: {
          id: string;
          key: string;
          name: string;
        }[];
      }[];
      masterVariant: {
        sku: string;
        price: {
          value: PriceType;
          discounted: {
            value: PriceType;
            discount: {
              name: string;
            };
          } | null;
        };
        images: {
          url: string;
        }[];
        availability: {
          noChannel: {
            isOnStock: boolean;
            availableQuantity: number;
          };
        };
        attributesRaw: ProductAttribute[];
      };
    };
  };
}
