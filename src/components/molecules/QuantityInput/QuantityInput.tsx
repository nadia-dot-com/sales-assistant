"use client";

import {
  HStack,
  IconButton,
  NumberInput,
  type NumberInputValueChangeDetails,
} from "@chakra-ui/react";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  containerStyles,
  styles,
  valueTextStyles,
} from "@/components/molecules/QuantityInput/QuantityInput.styles";
import { MIN_QUANTITY } from "@/config/constants";
import { defineMaxStock } from "@/features/product/utils/defineMaxStock";

const TAG = "QuantityInput";

interface QuantityInputProps {
  quantity: number;
  isOnStock: boolean;
  lowStock: boolean;
  onValueChange: (details: NumberInputValueChangeDetails) => void;
  onValueCommit?: (details: NumberInputValueChangeDetails) => void;
  onStepClick?: (details: NumberInputValueChangeDetails) => void;
  size?: "2xs" | "xs" | "sm";
  isPending?: boolean;
  disabled?: boolean;
  maxOverride?: number;
}

export function QuantityInput({
  quantity,
  isOnStock,
  lowStock,
  onValueChange,
  onValueCommit,
  onStepClick,
  size = "sm",
  isPending = false,
  disabled = false,
  maxOverride,
}: QuantityInputProps) {
  const t = useTranslations();
  const stockMax = defineMaxStock(isOnStock, lowStock);
  const max =
    maxOverride !== undefined ? Math.min(stockMax, maxOverride) : stockMax;

  const handleStep = (nextValue: number) => {
    const clampedValue = Math.min(Math.max(nextValue, MIN_QUANTITY), max);
    onStepClick?.({ value: String(clampedValue), valueAsNumber: clampedValue });
  };

  const handleValueChange = (details: NumberInputValueChangeDetails) => {
    if (Number.isNaN(details.valueAsNumber)) return;
    onValueChange(details);
  };

  const handleValueCommit = (details: NumberInputValueChangeDetails) => {
    if (Number.isNaN(details.valueAsNumber)) return;
    onValueCommit?.(details);
  };

  return (
    <NumberInput.Root
      data-testid={TAG}
      onValueChange={handleValueChange}
      onValueCommit={handleValueCommit}
      value={String(quantity)}
      min={MIN_QUANTITY}
      max={max}
      defaultValue={String(MIN_QUANTITY)}
      unstyled
      spinOnPress={false}
      disabled={!isOnStock || isPending || disabled}
      name="quantity"
      aria-label={t("productPage.quantityInput.changeQuantity")}
      {...styles.root}
    >
      <HStack {...containerStyles[size]}>
        <NumberInput.DecrementTrigger asChild {...styles.trigger}>
          <IconButton
            variant="outline"
            size={size}
            aria-label={t("productPage.quantityInput.decreaseQuantity")}
            onClick={() => handleStep(quantity)}
          >
            <Minus />
          </IconButton>
        </NumberInput.DecrementTrigger>

        <NumberInput.Input
          aria-label={t("productPage.quantityInput.changeQuantity")}
          {...valueTextStyles[size]}
        />

        <NumberInput.IncrementTrigger asChild {...styles.trigger}>
          <IconButton
            variant="outline"
            size={size}
            aria-label={t("productPage.quantityInput.increaseQuantity")}
            onClick={() => handleStep(quantity)}
          >
            <Plus />
          </IconButton>
        </NumberInput.IncrementTrigger>
      </HStack>
    </NumberInput.Root>
  );
}
