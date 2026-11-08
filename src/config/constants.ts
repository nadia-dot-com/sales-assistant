import { addFacetPrefix } from "@/features/product/helpers/facets/facetPrefix";

export const NO_DATA = "—";
export const PRODUCTS_PER_PAGE_LIMIT = 24;
export const CHAT_PRODUCTS_PER_PAGE_LIMIT = 12;
export const SECOND = 1000;
export const MIN_QUANTITY = 1;
export const MAX_VISIBLE_CART_ITEMS_COUNT = 99;
export const MAX_CAMPAINGNS_SHOW = 2;
export const MAX_SHARE_DESCRIPTION_LENGTH = 160;

//TODO: change with future payment methods logic
export const CASH = "cash";
export const PAYMENT_CARD = "paymentCard";
// Commercetools max limit per request
export const MAX_PRODUCTS_BY_KEYS_LIMIT = 100;

//depends on the database
export const BRAND_ATTRIBUTE = addFacetPrefix("brand");

//TODO: change with future bussiness logic
export const CURRENCY = "EUR";
