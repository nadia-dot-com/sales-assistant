"use client";

import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { styles } from "@/features/checkout/components/AddressForm/CountrySelect/CountrySelect.styles";
import { COUNTRIES } from "@/features/checkout/constants/countries";

const countriesCollection = createListCollection({
  items: COUNTRIES,
  itemToValue: (country) => country.code,
  itemToString: (country) => country.name,
});

interface CountrySelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  TAG: string;
}

export function CountrySelect<T extends FieldValues>({
  control,
  name,
  label,
  TAG,
}: CountrySelectProps<T>) {
  const t = useTranslations();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select.Root
          collection={countriesCollection}
          value={field.value ? [field.value] : []}
          onValueChange={(details) => field.onChange(details.value[0] ?? "")}
          onInteractOutside={field.onBlur}
          invalid={fieldState.invalid}
          positioning={{ sameWidth: true }}
          data-testid={`${TAG}-${field.name}`}
        >
          <Select.HiddenSelect />
          <Select.Label>{label}</Select.Label>
          <Select.Control>
            <Select.Trigger {...styles.trigger}>
              <Select.ValueText
                placeholder={t("checkoutPage.address.country.placeholder")}
              />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.Indicator {...styles.indicator} />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content {...styles.content}>
                {countriesCollection.items.map((country) => (
                  <Select.Item
                    item={country}
                    key={country.code}
                    {...styles.item}
                  >
                    {country.name}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      )}
    />
  );
}
