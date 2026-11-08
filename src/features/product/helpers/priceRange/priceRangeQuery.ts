import type {
  SearchFacetInput,
  SearchFilterInput,
} from "@/features/product/helpers/filterAndFacetsTypes/filterAndFacetsTypes.types";

export const PRICE_PATH = "variants.price.centAmount";
export const PRICE_CURRENCY_PATH = "variants.price.currencyCode";
export const CURRENCY = "EUR";

export const PRICE_SELECTOR = `priceSelector: { currency: "${CURRENCY}" }`;

export const PRICE_RANGE_FACET: SearchFacetInput = {
  model: {
    range: {
      path: PRICE_PATH,
      ranges: [{ from: "0", to: "*" }],
      countProducts: false,
    },
  },
};

export const PRICE_CURRENCY_FILTER: SearchFilterInput = {
  model: { value: { path: PRICE_CURRENCY_PATH, values: [CURRENCY] } },
};
