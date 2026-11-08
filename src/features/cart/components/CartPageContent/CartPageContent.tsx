"use client";

import { Flex, Heading, List } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { CartEmptyState } from "@/features/cart/components/CartEmptyState/CartEmptyState";
import { CartItemCard } from "@/features/cart/components/CartPageContent/CartItemCard/CartItemCard";
import { CartOrderSummary } from "@/features/cart/components/CartPageContent/CartOrderSummary/CartOrderSummary";
import { styles } from "@/features/cart/components/CartPageContent/CartPageContent.styles";
import { useCartContext } from "@/features/cart/context/CartContext";
import { getCartQuantity } from "@/features/cart/utils/getCartQuantity";
import { getTotalPriceWithoutDiscount } from "@/features/cart/utils/getTotalPriceWithoutDiscount";
import type { FooterPaymentMethod } from "@/sanity/types/footerContent.types";
import { getPluralTranslationKey } from "@/utils/getPluralTranslationKey";

interface CartPageContentProps {
  paymentMethods: FooterPaymentMethod[];
  isLoggedIn: boolean;
}

export function CartPageContent({
  paymentMethods,
  isLoggedIn,
}: CartPageContentProps) {
  const { cartItems, totalPrice } = useCartContext();
  const t = useTranslations();
  const locale = useLocale();
  const isEmptyCart = cartItems.length === 0;

  const discountedItem = cartItems.find((cartItem) => cartItem.discounted);
  const discounted = totalPrice &&
    discountedItem?.discounted && {
      name: discountedItem.discounted.name,
      centAmount: totalPrice.centAmount,
    };

  const CART_ITEMS_QUANTITY = getCartQuantity(cartItems);

  return (
    <>
      {isEmptyCart ? (
        <Flex {...styles.content}>
          <CartEmptyState size="lg" />
        </Flex>
      ) : (
        <Flex {...styles.content}>
          <Flex {...styles.layout}>
            <Flex {...styles.cartItems}>
              <Heading {...styles.title}>
                {`${CART_ITEMS_QUANTITY} ${t(
                  getPluralTranslationKey(
                    locale,
                    "rootLayout.header.cartIcon.productsInCart",
                    Number(CART_ITEMS_QUANTITY),
                  ),
                )}`}
              </Heading>
              <List.Root {...styles.list}>
                {cartItems.map((cartItem) => (
                  <List.Item key={cartItem.id}>
                    <CartItemCard cartItem={cartItem} />
                  </List.Item>
                ))}
              </List.Root>
            </Flex>
            {totalPrice && (
              <CartOrderSummary
                totalPrice={
                  discounted
                    ? getTotalPriceWithoutDiscount(
                        cartItems,
                        totalPrice.currencyCode,
                      )
                    : totalPrice
                }
                paymentMethods={paymentMethods}
                discounted={discounted || undefined}
                isLoggedIn={isLoggedIn}
              />
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
}
