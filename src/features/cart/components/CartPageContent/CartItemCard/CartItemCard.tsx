"use client";

import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { DiscountBadge } from "@/components/atoms/DiscountBadge/DiscountBadge";
import { NextImage } from "@/components/atoms/NextImage";
import { NextLink } from "@/components/atoms/NextLink";
import { Tooltip } from "@/components/atoms/Tooltip";
import { ProductPrice } from "@/components/molecules/ProductPrice/ProductPrice";
import { QuantityInput } from "@/components/molecules/QuantityInput/QuantityInput";
import { StockBadge } from "@/components/molecules/StockBadge/StockBadge";
import { routes } from "@/config/routes";
import { styles } from "@/features/cart/components/CartPageContent/CartItemCard/CartItemCard.styles";
import { useCartItemQuantity } from "@/features/cart/hooks/useCartItemQuantity";
import type { CartItem } from "@/features/cart/types/cartTypes.types";

interface CartItemCardProps {
  cartItem: CartItem;
}

export function CartItemCard({ cartItem }: CartItemCardProps) {
  const {
    id,
    productKey,
    name,
    img,
    quantity,
    availability,
    discounted,
    price,
    totalPrice,
  } = cartItem;

  const t = useTranslations();
  const {
    draftQuantity,
    isUpdatingQuantity,
    isRemoving,
    isAtMaxQuantity,
    handleQuantityChange,
    handleCommitQuantity,
    handleRemoveFromCart,
  } = useCartItemQuantity({
    lineItemId: id,
    quantity,
    isOnStock: availability.isOnStock,
    lowStock: availability.lowStock,
  });

  return (
    <Flex {...styles.root}>
      <NextLink href={routes.product(productKey)} unstyled>
        {discounted?.name && <DiscountBadge name={discounted.name} />}
        <Box {...styles.imgWrapper}>
          <NextImage src={img.url} alt={img.alt} fill {...styles.img} />
        </Box>
      </NextLink>

      <Flex {...styles.mobileContent}>
        <NextLink href={routes.product(productKey)} unstyled>
          <Text {...styles.title}>{name}</Text>
        </NextLink>

        {availability.lowStock && (
          <StockBadge stockStatus="lowStock" size="sm" />
        )}

        <Box {...styles.mobileQuantityWrapper}>
          <Tooltip
            content={t("rootLayout.header.cartIcon.maxQuantityTooltip")}
            disabled={!isAtMaxQuantity}
          >
            <Box>
              <QuantityInput
                size="xs"
                quantity={draftQuantity}
                isOnStock={availability.isOnStock}
                lowStock={availability.lowStock}
                onValueChange={handleQuantityChange}
                onValueCommit={handleCommitQuantity}
                onStepClick={handleCommitQuantity}
                isPending={isUpdatingQuantity}
              />
            </Box>
          </Tooltip>
        </Box>

        <Flex {...styles.mobileLastColumn}>
          <ProductPrice
            size="sm"
            price={{
              centAmount: price.centAmount * quantity,
              currencyCode: price.currencyCode,
            }}
            discounted={discounted && { centAmount: totalPrice.centAmount }}
          />
          <IconButton
            variant="ghost"
            size="md"
            aria-label={t("rootLayout.header.cartIcon.removeItem")}
            onClick={handleRemoveFromCart}
            disabled={isRemoving}
          >
            <Trash2 />
          </IconButton>
        </Flex>
      </Flex>

      <Flex {...styles.desktopContent}>
        <Flex {...styles.desktopFirstColumn}>
          <Flex {...styles.titleSection}>
            <NextLink href={routes.product(productKey)} unstyled>
              <Text {...styles.title}>{name}</Text>
            </NextLink>

            {availability.lowStock && (
              <StockBadge stockStatus="lowStock" size="sm" />
            )}
          </Flex>

          <Tooltip
            content={t("rootLayout.header.cartIcon.maxQuantityTooltip")}
            disabled={!isAtMaxQuantity}
          >
            <Box>
              <QuantityInput
                size="xs"
                quantity={draftQuantity}
                isOnStock={availability.isOnStock}
                lowStock={availability.lowStock}
                onValueChange={handleQuantityChange}
                onValueCommit={handleCommitQuantity}
                onStepClick={handleCommitQuantity}
                isPending={isUpdatingQuantity}
              />
            </Box>
          </Tooltip>
        </Flex>
        <Flex {...styles.desktopLastColumn}>
          <IconButton
            variant="ghost"
            size="md"
            aria-label={t("rootLayout.header.cartIcon.removeItem")}
            onClick={handleRemoveFromCart}
            disabled={isRemoving}
          >
            <Trash2 />
          </IconButton>

          <ProductPrice
            size="sm"
            price={{
              centAmount: price.centAmount * quantity,
              currencyCode: price.currencyCode,
            }}
            discounted={discounted && { centAmount: totalPrice.centAmount }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
