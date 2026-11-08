"use client";

import { Accordion, Checkbox, Flex, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { CASH, PAYMENT_CARD } from "@/config/constants";
import { styles } from "@/features/checkout/components/PaymentStepItem/PaymentStepItem.styles";
import {
  CheckoutValues,
  type PaymentOption,
  type PaymentOptionItem,
} from "@/features/checkout/types/checkoutSections.types";

const TAG = "PaymentStepItem";

interface PaymentStepItemProps {
  isOpen: boolean;
  hasError: boolean;
  selectedOption: PaymentOption | undefined;
  onOptionChange: (option: PaymentOption, checked: boolean) => void;
}

export function PaymentStepItem({
  isOpen,
  hasError,
  selectedOption,
  onOptionChange,
}: PaymentStepItemProps) {
  const t = useTranslations();

  const options: PaymentOptionItem[] = [
    { value: CASH, label: t("checkoutPage.payment.cash.label") },
    { value: PAYMENT_CARD, label: t("checkoutPage.payment.paymentCard.label") },
  ];

  const checkedOption = options.find(
    (option) => option.value === selectedOption,
  );

  return (
    <Accordion.Item
      value={CheckoutValues.Payment}
      data-testid={TAG}
      {...styles.accordionItem}
      {...(hasError && styles.error)}
    >
      <Accordion.ItemTrigger {...styles.accordionItemTrigger}>
        <Flex {...styles.triggerLabelGroup}>
          <Text {...styles.stepLabel}>{t("checkoutPage.payment.title")}</Text>
          {checkedOption && !isOpen && (
            <Flex {...styles.selectedBadge}>{checkedOption.label}</Flex>
          )}
        </Flex>
        <Accordion.ItemIndicator {...styles.indicator} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent {...styles.itemContent}>
        <Accordion.ItemBody {...styles.accordionItemBody}>
          {options.map((option) => (
            <Checkbox.Root
              key={option.value}
              checked={option.value === selectedOption}
              onCheckedChange={({ checked }) =>
                onOptionChange(option.value, checked === true)
              }
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>{option.label}</Checkbox.Label>
            </Checkbox.Root>
          ))}
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}
