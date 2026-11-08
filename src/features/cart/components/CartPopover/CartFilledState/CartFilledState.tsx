import { Flex, Heading, List } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { routes } from "@/config/routes";
import { styles } from "@/features/cart/components/CartPopover/CartFilledState/CartFilledState.styles";
import { PopoverItem } from "@/features/cart/components/CartPopover/PopoverItem/PopoverItem";
import { useCartContext } from "@/features/cart/context/CartContext";
import { getCartQuantity } from "@/features/cart/utils/getCartQuantity";
import { getPluralTranslationKey } from "@/utils/getPluralTranslationKey";

export function CartFilledState() {
  const { cartItems } = useCartContext();
  const t = useTranslations();
  const locale = useLocale();
  const CART_ITEMS_QUANTITY = getCartQuantity(cartItems);

  return (
    <Flex {...styles.cartItemsWrapper}>
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
            <PopoverItem cartItem={cartItem} />
          </List.Item>
        ))}
      </List.Root>
      <ButtonLink href={routes.cart} {...styles.button}>
        {t("rootLayout.header.cartIcon.title")}
      </ButtonLink>
    </Flex>
  );
}
