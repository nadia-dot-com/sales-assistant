import { Badge, Box, Card, Flex } from "@chakra-ui/react";
import NextImage from "next/image";
import { DiscountBadge } from "@/components/atoms/DiscountBadge/DiscountBadge";
import { NextLink } from "@/components/atoms/NextLink";
import { ProductPrice } from "@/components/molecules/ProductPrice/ProductPrice";
import { StockBadge } from "@/components/molecules/StockBadge/StockBadge";
import { routes } from "@/config/routes";
import { styles } from "@/features/product/components/ProductCard/ProductCard.styles";
import type { ProductInList } from "@/features/product/types/productResponse.types";
import { mapProductInList } from "@/features/product/utils/mapProductInList";

interface ProductCardProps {
  productInList: ProductInList;
}

const TAG = "ProductCard";

export function ProductCard({ productInList }: ProductCardProps) {
  const mappedProduct = mapProductInList(productInList);

  return (
    <Card.Root {...styles.card} data-testid={TAG} asChild>
      <NextLink href={routes.product(mappedProduct.key)} {...styles.link}>
        <Box
          {...styles.imageWrapper}
          data-disabled={!mappedProduct.isOnStock || undefined}
        >
          <NextImage
            src={mappedProduct.image.src}
            alt={mappedProduct.image.alt}
            fill
            {...styles.image}
          />
        </Box>
        {mappedProduct.discounted?.name && (
          <DiscountBadge name={mappedProduct.discounted.name} />
        )}
        <Card.Body {...styles.body}>
          <Flex {...styles.productInfo}>
            <Badge {...styles.brandBadge}>{mappedProduct.brand}</Badge>
            {!mappedProduct.isOnStock && (
              <StockBadge stockStatus="outOfStock" size="sm" />
            )}
            <Card.Title as="h3" {...styles.title}>
              {mappedProduct.name}
            </Card.Title>
          </Flex>
          <ProductPrice
            size={{ base: "sm", md: "md" }}
            price={mappedProduct.price}
            discounted={
              mappedProduct.discounted && {
                centAmount: mappedProduct.discounted.amount,
              }
            }
          />
        </Card.Body>
      </NextLink>
    </Card.Root>
  );
}
