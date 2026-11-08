import type { PriceBounds } from "@/features/product/helpers/priceRange/priceRange.type";
import type { ProductImage } from "@/features/product/types/product.types";
import type { ProductAttribute } from "@/graphQl/types/commercetoolsProduct.types";
import type { PriceType } from "@/types/price.types";

export interface ProductMatch {
  id: string;
  score: number;
  positive: string[];
}

export interface ProductInList {
  key: string;
  name: string;
  masterVariant: {
    price: {
      value: PriceType;
      discounted?: {
        value: PriceType;
        discount: {
          name: string;
        };
      };
    };
    images: ProductImage[];
    availability: {
      noChannel: {
        isOnStock: boolean;
      };
    };
    attributesRaw: ProductAttribute[];
  };
  categories: [
    {
      key: string;
    },
  ];
  score?: number;
  matchedTags?: string[];
}

export interface FacetTerm {
  key: string;
  label: string;
  count: number;
}

export interface ProductFacetResult {
  facet: string;
  terms: FacetTerm[];
}

export interface ProductsResponse {
  totalProducts: number;
  products: ProductInList[];
  priceBounds: PriceBounds;
  facets?: ProductFacetResult[];
}

export interface ProductsByKeysResponse {
  totalProducts: number;
  products: ProductInList[];
  priceBounds: PriceBounds;
  facets?: ProductFacetResult[];
}

export interface ProductFacet {
  name: string;
  isSearchable: boolean;
  type: {
    name: string;
  };
}

export interface ProductFacetResponse {
  facets: ProductFacet[];
  facetMap: Map<string, Map<string, string>>;
}
