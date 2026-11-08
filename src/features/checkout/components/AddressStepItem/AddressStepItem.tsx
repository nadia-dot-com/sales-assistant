"use client";

import { Accordion, Flex, Text } from "@chakra-ui/react";
import type { Address } from "@commercetools/platform-sdk";
import { useTranslations } from "next-intl";
import { saveCustomerAddress } from "@/features/checkout/actions/saveCustomerAddress";
import { AddressForm } from "@/features/checkout/components/AddressForm/AddressForm";
import { AddressDetails } from "@/features/checkout/components/AddressStepItem/AddressDetails/AddressDetails";
import { styles } from "@/features/checkout/components/AddressStepItem/AddressStepItem.styles";
import { CheckoutValues } from "@/features/checkout/types/checkoutSections.types";

const TAG = "AddressStepItem";

interface AddressStepItemProps {
  isOpen: boolean;
  hasError: boolean;
  address: Address | undefined;
  customerId: string;
  version: number;
  onSaved: (address: Address) => void;
}

export function AddressStepItem({
  isOpen,
  hasError,
  address,
  customerId,
  version,
  onSaved,
}: AddressStepItemProps) {
  const t = useTranslations();

  return (
    <Accordion.Item
      value={CheckoutValues.Address}
      data-testid={TAG}
      disabled={!!address}
      {...styles.accordionItem}
      {...(hasError && styles.error)}
    >
      <Accordion.ItemTrigger {...styles.accordionItemTrigger}>
        <Flex {...styles.triggerLabelGroup}>
          <Text {...styles.stepLabel}>{t("checkoutPage.address.title")}</Text>
          {address && !isOpen && (
            <Flex {...styles.selectedBadge}>
              <AddressDetails address={address} />
            </Flex>
          )}
        </Flex>
        {!address && <Accordion.ItemIndicator {...styles.indicator} />}
      </Accordion.ItemTrigger>
      <Accordion.ItemContent {...styles.itemContent}>
        <Accordion.ItemBody {...styles.accordionItemBody}>
          {address ? (
            <AddressDetails address={address} data-testid={`${TAG}-value`} />
          ) : (
            <AddressForm
              onSave={(data) => saveCustomerAddress(customerId, version, data)}
              onSaved={onSaved}
            />
          )}
        </Accordion.ItemBody>
      </Accordion.ItemContent>
    </Accordion.Item>
  );
}
