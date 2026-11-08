"use client";

import {
  Box,
  Circle,
  Flex,
  Float,
  Popover,
  Portal,
  Text,
  useToggle,
} from "@chakra-ui/react";
import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { NextLink } from "@/components/atoms/NextLink";
import { routes } from "@/config/routes";
import { CartEmptyState } from "@/features/cart/components/CartEmptyState/CartEmptyState";
import { CartFilledState } from "@/features/cart/components/CartPopover/CartFilledState/CartFilledState";
import { styles } from "@/features/cart/components/CartPopover/CartPopover.styles";
import { useCartContext } from "@/features/cart/context/CartContext";
import { getCartQuantity } from "@/features/cart/utils/getCartQuantity";
import { isNotVisibleOnPage } from "@/utils/isNotVisibleOnPage";

const TAG = "CartPopover";

export function CartPopover() {
  const { pressed: isCartPopoverOpen, setPressed: setCartPopoverOpen } =
    useToggle({
      defaultPressed: false,
    });

  const pathname = usePathname();
  const isOnCartPage = pathname === routes.cart;
  const { cartItems } = useCartContext();
  const isEmptyCart = cartItems.length === 0;
  if (isNotVisibleOnPage(pathname)) {
    return null;
  }

  if (isOnCartPage) {
    setCartPopoverOpen(false);
  }

  const CART_ITEMS_COUNT = getCartQuantity(cartItems);

  return (
    <>
      <NextLink href={routes.cart} {...styles.mobileTrigger}>
        {isEmptyCart ? (
          <ShoppingCart />
        ) : (
          <Box {...styles.iconWrapper}>
            <ShoppingCart />
            <Float>
              <Circle size={5} {...styles.circle}>
                <Text {...styles.count}>{CART_ITEMS_COUNT}</Text>
              </Circle>
            </Float>
          </Box>
        )}
      </NextLink>
      <Popover.Root
        open={isCartPopoverOpen}
        onOpenChange={(e) => setCartPopoverOpen(e.open)}
        positioning={{ placement: "bottom-end" }}
      >
        <Popover.Trigger asChild data-testid={TAG}>
          <Flex {...styles.desktopTrigger}>
            {isEmptyCart ? (
              <ShoppingCart />
            ) : (
              <Box {...styles.iconWrapper}>
                <ShoppingCart />
                <Float>
                  <Circle size={5} {...styles.circle}>
                    <Text {...styles.count}>{CART_ITEMS_COUNT}</Text>
                  </Circle>
                </Float>
              </Box>
            )}
          </Flex>
        </Popover.Trigger>

        <Portal>
          <Popover.Positioner>
            <Popover.Content {...styles.popoverContent}>
              <Popover.Arrow />
              <Popover.Body {...styles.popoverBody}>
                {isEmptyCart ? (
                  <CartEmptyState size="sm" />
                ) : (
                  <CartFilledState />
                )}
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </>
  );
}
