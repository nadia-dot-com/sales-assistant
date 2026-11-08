"use client";

import { Badge, Box, Card, Flex, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import { CircularProgress } from "@/components/atoms/CircularProgress/CircularProgress";
import { DiscountBadge } from "@/components/atoms/DiscountBadge/DiscountBadge";
import { NextLink } from "@/components/atoms/NextLink";
import { ProductPrice } from "@/components/molecules/ProductPrice/ProductPrice";
import { StockBadge } from "@/components/molecules/StockBadge/StockBadge";
import { routes } from "@/config/routes";
import type { ProductInList } from "@/features/product/types/productResponse.types";
import { mapProductInList } from "@/features/product/utils/mapProductInList";
import { styles } from "@/features/salesAssistant/components/ChatProductCard/ChatProductCard.styles";
import { CHAT_SESSION_KEY } from "@/features/salesAssistant/constants/chatSessionKey";

interface ChatProductCardProps {
  product: ProductInList;
  score: number;
}

const TAG = "ChatProductCard";

export function ChatProductCard({ product, score }: ChatProductCardProps) {
  const mappedProduct = mapProductInList(product);
  const progressScore = Math.round(score * 100);

  let LOCAL_STORAGE_SESSION: string | null = null;

  try {
    const LOCAL_STORAGE_VALUE = localStorage.getItem(CHAT_SESSION_KEY);
    LOCAL_STORAGE_SESSION = LOCAL_STORAGE_VALUE
      ? JSON.parse(LOCAL_STORAGE_VALUE).session
      : null;
  } catch {
    LOCAL_STORAGE_SESSION = null;
  }

  const PRODUCT_HREF = LOCAL_STORAGE_SESSION
    ? `${routes.product(mappedProduct.key)}?chatId=${LOCAL_STORAGE_SESSION}`
    : routes.product(mappedProduct.key);

  return (
    <Card.Root {...styles.card} data-testid={TAG} asChild>
      <Flex {...styles.info}>
        <Flex {...styles.container}>
          <NextLink href={PRODUCT_HREF} {...styles.link}>
            <Box
              {...styles.imageWrapper}
              data-disabled={!mappedProduct.isOnStock || undefined}
            >
              <NextImage
                loading="eager"
                src={mappedProduct.image.src}
                alt={mappedProduct.image.alt}
                sizes="120px"
                fill
                {...styles.image}
              />
            </Box>
          </NextLink>
          <Card.Body {...styles.body}>
            <Flex {...styles.brandContainer}>
              <Badge {...styles.brandBadge}>{mappedProduct.brand}</Badge>
            </Flex>
            {mappedProduct.discounted?.name && (
              <DiscountBadge name={mappedProduct.discounted.name} />
            )}
            {!mappedProduct.isOnStock && (
              <StockBadge stockStatus="outOfStock" size="sm" />
            )}
            <NextLink href={PRODUCT_HREF} {...styles.link}>
              <Card.Title as="h3" {...styles.title}>
                {mappedProduct.name}
              </Card.Title>
            </NextLink>
            <ProductPrice
              size={{ base: "sm", md: "md" }}
              price={mappedProduct.price}
              discounted={
                mappedProduct.discounted && {
                  centAmount: mappedProduct.discounted.amount,
                }
              }
            />
            <CircularProgress score={progressScore} />
          </Card.Body>
        </Flex>
        {mappedProduct.matchedTags.length > 0 && (
          <Flex {...styles.matchedTagsWrapper}>
            {mappedProduct.matchedTags.map((tag) => (
              <Badge key={tag} {...styles.matchedTagBadge}>
                {tag}
              </Badge>
            ))}
          </Flex>
        )}
        <Text {...styles.shortDescription}>
          {mappedProduct.shortDescription}
        </Text>
      </Flex>
    </Card.Root>
  );
}
