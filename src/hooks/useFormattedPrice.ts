import { useFormatter } from "next-intl";
import type { PriceType } from "@/types/price.types";

export const useFormattedPrice = (price: PriceType) => {
  const priceInMajorUnits = price.centAmount / 100;
  const format = useFormatter();

  const formattedPrice = format.number(priceInMajorUnits, {
    style: "currency",
    currency: price.currencyCode,
  });

  return formattedPrice;
};
