import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import parse from "html-react-parser";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/atoms/ButtonLink";
import { Price } from "@/components/atoms/Price";
import { ProductPrice } from "@/components/molecules/ProductPrice/ProductPrice";
import { DialogRoot, DialogTrigger } from "@/components/ui/dialog/dialog";
import { routes } from "@/config/routes";
import { styles } from "@/features/cart/components/CartPageContent/CartOrderSummary/CartOrderSummary.styles";
import { LoginRequired } from "@/features/checkout/components/LoginRequired/LoginRequired";
import type { FooterPaymentMethod } from "@/sanity/types/footerContent.types";
import type { DiscountedType, PriceType } from "@/types/price.types";

interface CartOrderSummaryProps {
  totalPrice: PriceType;
  paymentMethods: FooterPaymentMethod[];
  discounted?: DiscountedType;
  isLoggedIn: boolean;
}

export function CartOrderSummary({
  totalPrice,
  paymentMethods,
  discounted,
  isLoggedIn,
}: CartOrderSummaryProps) {
  const t = useTranslations();

  return (
    <Flex {...styles.container}>
      <Flex {...styles.row}>
        <Text>{t("cartPage.orderSummary.productsValue")}</Text>
        <ProductPrice
          price={{
            centAmount: totalPrice.centAmount,
            currencyCode: totalPrice.currencyCode,
          }}
          discounted={discounted ?? null}
          size="sm"
        />
      </Flex>
      <Flex {...styles.row}>
        <Text>{t("cartPage.orderSummary.delivery")}</Text>
        {/* TODO: update delivery price with future logic */}
        <Price
          price={{ centAmount: 0, currencyCode: totalPrice.currencyCode }}
          size="sm"
        />
      </Flex>
      <Flex {...styles.totalRow}>
        <Text {...styles.totalLabel}>
          {t("cartPage.orderSummary.totalToPay")}{" "}
          <Text as="span" {...styles.totalLabelHint}>
            {t("cartPage.orderSummary.inclVat")}
          </Text>
        </Text>
        <Price
          price={{
            centAmount: discounted?.centAmount ?? totalPrice.centAmount,
            currencyCode: totalPrice.currencyCode,
          }}
          size="md"
          {...styles.totalPrice}
        />
      </Flex>
      {isLoggedIn ? (
        <ButtonLink href={routes.checkout} {...styles.checkoutButton}>
          {t("cartPage.orderSummary.checkout")}
        </ButtonLink>
      ) : (
        <DialogRoot placement="center" unmountOnExit>
          <DialogTrigger asChild>
            <Button {...styles.checkoutButton}>
              {t("cartPage.orderSummary.checkout")}
            </Button>
          </DialogTrigger>
          <LoginRequired />
        </DialogRoot>
      )}
      {paymentMethods.length > 0 && (
        <>
          <Heading {...styles.weAcceptHeading}>
            {t("cartPage.orderSummary.weAccept")}
          </Heading>
          <Flex {...styles.paymentMethods}>
            {paymentMethods.map((paymentMethod) => (
              <Flex
                key={paymentMethod.name}
                aria-label={paymentMethod.name}
                {...styles.paymentMethodIcon}
              >
                {parse(paymentMethod.icon)}
              </Flex>
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
}
