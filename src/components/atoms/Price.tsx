import { Heading, type HeadingProps } from "@chakra-ui/react";
import { useFormattedPrice } from "@/hooks/useFormattedPrice";
import type { PriceType } from "@/types/price.types";

export interface PriceProps extends HeadingProps {
  price: PriceType;
}

export function Price({ price, size = "xl", ...styles }: PriceProps) {
  const formattedPrice = useFormattedPrice(price);

  return (
    <Heading size={size} {...styles}>
      {formattedPrice}
    </Heading>
  );
}
