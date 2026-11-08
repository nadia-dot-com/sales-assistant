import { Flex } from "@chakra-ui/react";
import { Price, type PriceProps } from "@/components/atoms/Price";
import { styles } from "@/components/molecules/ProductPrice/ProductPrice.styles";
import type { PriceType } from "@/types/price.types";

const TAG = "ProductPrice";

interface DiscountedPrice {
  centAmount: number;
}

interface ProductPriceProps {
  price: PriceType;
  discounted: DiscountedPrice | null;
  size?: PriceProps["size"];
  direction?: "row" | "column";
}

export function ProductPrice({
  price,
  discounted,
  size,
  direction = "row",
}: ProductPriceProps) {
  if (!discounted) {
    return (
      <Price data-testid={TAG} price={price} size={size} {...styles.price} />
    );
  }

  return (
    <Flex data-testid={TAG} {...styles.container} flexDir={direction}>
      <Price price={price} size={size} {...styles.originalPrice} />
      <Price
        size={size}
        price={{
          centAmount: discounted.centAmount,
          currencyCode: price.currencyCode,
        }}
        {...styles.discountedPrice}
      />
    </Flex>
  );
}
