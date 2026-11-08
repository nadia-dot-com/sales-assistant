"use client";

import { Accordion, Checkbox, Flex, Text } from "@chakra-ui/react";
import type { Address } from "@commercetools/platform-sdk";
import { useTranslations } from "next-intl";
import { AddressForm } from "@/features/checkout/components/AddressForm/AddressForm";
import { AddressDetails } from "@/features/checkout/components/AddressStepItem/AddressDetails/AddressDetails";
import { styles } from "@/features/checkout/components/DeliveryStepItem/DeliveryStepItem.styles";
import {
  CheckoutValues,
  type DeliveryOption,
} from "@/features/checkout/types/checkoutSections.types";
import type { AddressSchema } from "@/zod/schema/addressSchema";

const TAG = "DeliveryStepItem";

async function saveLocalAddress(data: AddressSchema) {
  return {
    error: false as const,
    message: "" as const,
    address: data as Address,
  };
}

interface DeliveryStepItemProps {
  isOpen: boolean;
  hasError: boolean;
  defaultAddress: Address | undefined;
  selectedOption: DeliveryOption | undefined;
  newAddress: Address | undefined;
  onOptionChange: (option: DeliveryOption, checked: boolean) => void;
  onNewAddressSaved: (address: Address) => void;
}

export function DeliveryStepItem({
  isOpen,
  hasError,
  defaultAddress,
  selectedOption,
  newAddress,
  onOptionChange,
  onNewAddressSaved,
}: DeliveryStepItemProps) {
  const t = useTranslations();

  const displayAddress =
    selectedOption === "default"
      ? defaultAddress
      : selectedOption === "new"
        ? newAddress
        : undefined;

  return (
    <Accordion.Item
      value={CheckoutValues.Delivery}
      data-testid={TAG}
      {...styles.accordionItem}
      {...(hasError && styles.error)}
    >
      <Accordion.ItemTrigger {...styles.accordionItemTrigger}>
        <Flex {...styles.triggerLabelGroup}>
          <Text {...styles.stepLabel}>{t("checkoutPage.delivery.title")}</Text>
          {displayAddress && !isOpen && (
            <Flex {...styles.selectedBadge}>
              <AddressDetails address={displayAddress} />
            </Flex>
          )}
        </Flex>
        <Accordion.ItemIndicator {...styles.indicator} />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent {...styles.itemContent}>
        <Accordion.ItemBody {...styles.accordionItemBody}>
          <Checkbox.Root
            checked={selectedOption === "default"}
            onCheckedChange={({ checked }) =>
              onOptionChange("default", checked === true)
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              {t("checkoutPage.delivery.defaultAddress.label")}
            </Checkbox.Label>
          </Checkbox.Root>
          {selectedOption === "default" && defaultAddress && (
            <Flex {...styles.addressContainer}>
              <AddressDetails address={defaultAddress} />
            </Flex>
          )}

          <Checkbox.Root
            checked={selectedOption === "new"}
            onCheckedChange={({ checked }) =>
              onOptionChange("new", checked === true)
            }
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label>
              {t("checkoutPage.delivery.newAddress.label")}
            </Checkbox.Label>
          </Checkbox.Root>
          {selectedOption === "new" &&
            (newAddress ? (
              <Flex {...styles.addressContainer}>
                <AddressDetails address={newAddress} />
              </Flex>
            ) : (
              <AddressForm
                onSave={saveLocalAddress}
                onSaved={onNewAddressSaved}
              />
            ))}
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}
