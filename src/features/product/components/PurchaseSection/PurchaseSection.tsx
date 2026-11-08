"use client";

import { Flex, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { ActionButton } from "@/components/atoms/ActionButton";
import { QuantityInput } from "@/components/molecules/QuantityInput/QuantityInput";
import { MIN_QUANTITY } from "@/config/constants";
import { useCartContext } from "@/features/cart/context/CartContext";
import { styles } from "@/features/product/components/PurchaseSection/PurchaseSection.styles";
import { defineMaxStock } from "@/features/product/utils/defineMaxStock";

const TAG = "PurchaseSection";

interface PurchaseSectionProps {
  productId: string;
  isOnStock: boolean;
  lowStock: boolean;
  sku: string;
}

export function PurchaseSection({
  productId,
  isOnStock,
  lowStock,
  sku,
}: PurchaseSectionProps) {
  const t = useTranslations();
  const [quantityValue, setQuantity] = useState(MIN_QUANTITY);
  const { addToCart, cartItems, isPending } = useCartContext();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const quantityInCartBeforeAddRef = useRef(0);

  const quantityInCart =
    cartItems.find((item) => item.productKey === productId)?.quantity ?? 0;

  useEffect(() => {
    if (!isPending && isAddingToCart) {
      setIsAddingToCart(false);
      if (quantityInCart > quantityInCartBeforeAddRef.current) {
        setQuantity(MIN_QUANTITY);
      }
    }
  }, [isPending, isAddingToCart, quantityInCart]);

  const handleAddToCart = () => {
    quantityInCartBeforeAddRef.current = quantityInCart;
    setIsAddingToCart(true);
    addToCart(sku, Math.max(quantityValue, MIN_QUANTITY));
  };

  const maxStock = defineMaxStock(isOnStock, lowStock);
  const remainingAllowed = Math.max(maxStock - quantityInCart, 0);

  const isCartFull = remainingAllowed <= 0;
  const isOverRemaining = quantityValue > remainingAllowed;
  const isAtLowStockLimit =
    lowStock && !isCartFull && quantityValue >= remainingAllowed;

  const maxQuantityMessage = isCartFull
    ? t("productPage.quantityInput.alreadyMaxInCart")
    : isAtLowStockLimit
      ? t("productPage.quantityInput.maxCartQuantity")
      : !lowStock && isOverRemaining
        ? `${t("productPage.quantityInput.maxOrderQuantity")} ${maxStock}`
        : null;

  return (
    <Flex data-testid={TAG} {...styles.wrapper}>
      <Flex {...styles.container}>
        <QuantityInput
          size="sm"
          quantity={quantityValue}
          isOnStock={isOnStock}
          lowStock={lowStock}
          onValueChange={({ valueAsNumber }) => setQuantity(valueAsNumber)}
          disabled={isCartFull}
          maxOverride={remainingAllowed}
        />
        <ActionButton
          {...styles.button}
          data-testid={`${TAG}-buy-button`}
          disabled={
            !isOnStock || isAddingToCart || isCartFull || isOverRemaining
          }
          isPending={isAddingToCart}
          onClick={handleAddToCart}
        >
          {t("productPage.purchaseSection.addToCart")}
        </ActionButton>
      </Flex>
      {maxQuantityMessage && (
        <Text
          data-testid={`${TAG}-max-quantity-message`}
          {...styles.maxQuantityMessage}
        >
          {maxQuantityMessage}
        </Text>
      )}
    </Flex>
  );
}
