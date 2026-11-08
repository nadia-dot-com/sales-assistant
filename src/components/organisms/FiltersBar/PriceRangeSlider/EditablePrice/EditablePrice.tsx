"use client";
import { Editable } from "@chakra-ui/react";
import { useState } from "react";
import { styles } from "@/components/organisms/FiltersBar/PriceRangeSlider/EditablePrice/EditablePrice.styles";
import { CURRENCY } from "@/config/constants";
import { useFormattedPrice } from "@/hooks/useFormattedPrice";

const toMajorUnits = (cents: number) => String(cents / 100);
const toCents = (majorUnits: string) =>
  Math.round(Number(majorUnits.replace(",", ".")) * 100);

const clampCents = (cents: number, min: number, max: number) =>
  Math.min(Math.max(cents, min), max);

const TAG = "EditablePrice";

export interface EditablePriceProps {
  value: number;
  min: number;
  max: number;
  onCommit: (cents: number) => void;
}

export function EditablePrice({
  value,
  min,
  max,
  onCommit,
}: EditablePriceProps) {
  const [inputValue, setInputValue] = useState(toMajorUnits(value));

  const handleCommit = () => {
    const cents = toCents(inputValue);
    const nextCents = Number.isNaN(cents) ? value : clampCents(cents, min, max);

    setInputValue(toMajorUnits(nextCents));
    onCommit(nextCents);
  };

  return (
    <Editable.Root
      value={inputValue}
      onValueChange={(e) => setInputValue(e.value)}
      onValueCommit={handleCommit}
      activationMode="click"
      {...styles.editablePrice}
      data-testid={TAG}
    >
      <Editable.Preview>
        {useFormattedPrice({ centAmount: value, currencyCode: CURRENCY })}
      </Editable.Preview>
      <Editable.Input {...styles.input} />
    </Editable.Root>
  );
}
