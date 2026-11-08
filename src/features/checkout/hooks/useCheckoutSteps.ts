"use client";

import { useState } from "react";
import {
  CheckoutValues,
  type SelectedOptions,
} from "@/features/checkout/types/checkoutSections.types";

interface UseCheckoutStepsParams {
  hasInitialAddress: boolean;
}

export function useCheckoutSteps({
  hasInitialAddress,
}: UseCheckoutStepsParams) {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    address: hasInitialAddress,
    delivery: false,
    payment: false,
  });
  const [errorSelected, setErrorSelected] = useState<SelectedOptions>({
    address: false,
    delivery: false,
    payment: false,
  });
  const [openItems, setOpenItems] = useState<string[]>(
    hasInitialAddress ? [] : [CheckoutValues.Address],
  );

  const updateSelectedOption =
    (key: keyof SelectedOptions) => (checked: boolean) => {
      setSelectedOptions((prev) => ({ ...prev, [key]: checked }));
    };

  const handleAccordionValueChange = (value: string[]) => {
    const closingItems = openItems.filter((v) => !value.includes(v));
    const blockedItems = closingItems.filter(
      (v) => !selectedOptions[v as keyof SelectedOptions],
    );

    if (blockedItems.length > 0) {
      setErrorSelected((prev) => {
        const next = { ...prev };
        blockedItems.forEach((v) => {
          next[v as keyof SelectedOptions] = true;
        });
        return next;
      });
    }

    setOpenItems(Array.from(new Set([...value, ...blockedItems])));
  };

  const completeSection = (key: keyof SelectedOptions) => {
    updateSelectedOption(key)(true);
    setErrorSelected((prev) => ({ ...prev, [key]: false }));
    setOpenItems((prev) => prev.filter((item) => item !== key));
  };

  const resetSection = (key: keyof SelectedOptions) => {
    updateSelectedOption(key)(false);
  };

  const isOrderDisabled = Object.values(selectedOptions).some(
    (value) => value === false,
  );

  return {
    selectedOptions,
    errorSelected,
    openItems,
    isOrderDisabled,
    handleAccordionValueChange,
    completeSection,
    resetSection,
  };
}
