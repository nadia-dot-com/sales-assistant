"use client";

import { Accordion, Flex, Heading, Text } from "@chakra-ui/react";
import type { Address } from "@commercetools/platform-sdk";
import { useTranslations } from "next-intl";
import { useActionState, useState } from "react";
import { ActionButton } from "@/components/atoms/ActionButton";
import type { SessionUser } from "@/features/auth/types/auth.types";
import { useCartContext } from "@/features/cart/context/CartContext";
import { completeOrder } from "@/features/checkout/actions/completeOrder";
import { AddressStepItem } from "@/features/checkout/components/AddressStepItem/AddressStepItem";
import { styles } from "@/features/checkout/components/CheckoutSteps/CheckoutSteps.styles";
import { DeliveryStepItem } from "@/features/checkout/components/DeliveryStepItem/DeliveryStepItem";
import { PaymentStepItem } from "@/features/checkout/components/PaymentStepItem/PaymentStepItem";
import { useCheckoutSteps } from "@/features/checkout/hooks/useCheckoutSteps";
import {
  CheckoutValues,
  type DeliveryOption,
  type PaymentOption,
} from "@/features/checkout/types/checkoutSections.types";
import type { CompleteOrderStatus } from "@/features/checkout/types/completeOrderStatus.types";
import { OrderStatus } from "@/features/checkout/types/orderStatus.types";

const TAG = "CheckoutSteps";

const INITIAL_STATE: CompleteOrderStatus = {
  success: false,
  error: false,
};

interface CheckoutStepsProps {
  user: SessionUser;
  addressVersion: number;
  initialAddress: Address | undefined;
  onOrderComplete: (status: OrderStatus) => void;
}

export function CheckoutSteps({
  user,
  addressVersion,
  initialAddress,
  onOrderComplete,
}: CheckoutStepsProps) {
  const t = useTranslations();
  const [address, setAddress] = useState<Address | undefined>(initialAddress);
  const [deliveryOption, setDeliveryOption] = useState<
    DeliveryOption | undefined
  >();
  const [paymentOption, setPaymentOption] = useState<
    PaymentOption | undefined
  >();
  const [newDeliveryAddress, setNewDeliveryAddress] = useState<
    Address | undefined
  >();

  const {
    errorSelected,
    openItems,
    isOrderDisabled,
    handleAccordionValueChange,
    completeSection,
    resetSection,
  } = useCheckoutSteps({ hasInitialAddress: !!initialAddress });

  const { resetCart } = useCartContext();

  const [, formAction, isPending] = useActionState(
    async (prevState: CompleteOrderStatus, formData: FormData) => {
      const result = await completeOrder(prevState, formData);
      onOrderComplete(
        result.error
          ? OrderStatus.Error
          : result.success
            ? OrderStatus.Success
            : OrderStatus.Idle,
      );
      resetCart();
      return result;
    },
    INITIAL_STATE,
  );

  const handleAddressSaved = (savedAddress: Address) => {
    setAddress(savedAddress);
    completeSection("address");
  };

  const handleDeliveryOptionChange = (
    option: DeliveryOption,
    checked: boolean,
  ) => {
    if (!checked) {
      setDeliveryOption(undefined);
      resetSection("delivery");
      return;
    }

    setDeliveryOption(option);

    if (option === "default") {
      completeSection("delivery");
    } else {
      resetSection("delivery");
    }
  };

  const handleNewDeliveryAddressSaved = (savedAddress: Address) => {
    setNewDeliveryAddress(savedAddress);
    completeSection("delivery");
  };

  const handlePaymentOptionChange = (
    option: PaymentOption,
    checked: boolean,
  ) => {
    if (!checked) {
      setPaymentOption(undefined);
      resetSection("payment");
      return;
    }

    setPaymentOption(option);
    completeSection("payment");
  };

  return (
    <Flex {...styles.checkoutSections} data-testid={TAG}>
      <Heading as="h1" {...styles.title}>
        {t("checkoutPage.title")}
      </Heading>
      <Accordion.Root
        {...styles.accordion}
        collapsible
        value={openItems}
        onValueChange={({ value }) => handleAccordionValueChange(value)}
      >
        <Flex {...styles.contactSection}>
          <Text {...styles.contactLabel}>
            {t("checkoutPage.contact.title")}
          </Text>
          <Text
            {...styles.contactValue}
          >{`${user.firstName ?? ""} ${user.lastName ?? ""}`}</Text>
          <Text {...styles.contactValue}>{user.email}</Text>
        </Flex>
        <AddressStepItem
          isOpen={openItems.includes(CheckoutValues.Address)}
          hasError={errorSelected.address}
          address={address}
          customerId={user.ctCustomerId}
          version={addressVersion}
          onSaved={handleAddressSaved}
        />
        <DeliveryStepItem
          isOpen={openItems.includes(CheckoutValues.Delivery)}
          hasError={errorSelected.delivery}
          defaultAddress={address}
          selectedOption={deliveryOption}
          newAddress={newDeliveryAddress}
          onOptionChange={handleDeliveryOptionChange}
          onNewAddressSaved={handleNewDeliveryAddressSaved}
        />
        <PaymentStepItem
          isOpen={openItems.includes(CheckoutValues.Payment)}
          hasError={errorSelected.payment}
          selectedOption={paymentOption}
          onOptionChange={handlePaymentOptionChange}
        />
      </Accordion.Root>

      <Flex asChild {...styles.completeOrderForm}>
        <form action={formAction}>
          <ActionButton
            type="submit"
            isPending={isPending}
            disabled={isOrderDisabled || isPending}
            data-testid={`${TAG}-submit`}
            {...styles.button}
          >
            {t("checkout.completeOrder")}
          </ActionButton>
        </form>
      </Flex>
    </Flex>
  );
}
