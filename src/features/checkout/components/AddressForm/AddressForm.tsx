"use client";

import { Flex } from "@chakra-ui/react";
import type { Address } from "@commercetools/platform-sdk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ActionButton } from "@/components/atoms/ActionButton";
import { FormError } from "@/components/atoms/FormError/FormError";
import { ControlledInput } from "@/components/molecules/ControlledInput/ControlledInput";
import { styles } from "@/features/checkout/components/AddressForm/AddressForm.styles";
import { CountrySelect } from "@/features/checkout/components/AddressForm/CountrySelect/CountrySelect";
import { type AddressSchema, addressSchema } from "@/zod/schema/addressSchema";

const TAG = "AddressForm";

interface AddressFormProps {
  onSave: (
    data: AddressSchema,
  ) => Promise<{ error: boolean; message: I18nKey | ""; address?: Address }>;
  onSaved: (address: Address) => void;
}

export function AddressForm({ onSave, onSaved }: AddressFormProps) {
  const t = useTranslations();
  const { control, handleSubmit, setError, formState } = useForm<AddressSchema>(
    {
      resolver: zodResolver(addressSchema),
      mode: "onChange",
      defaultValues: {
        streetName: "",
        streetNumber: "",
        city: "",
        postalCode: "",
        country: "",
      },
    },
  );

  const onSubmit = async (data: AddressSchema) => {
    const result = await onSave(data);

    if (result.error || !result.address) {
      setError("root", { message: t(result.message) });
      return;
    }

    onSaved(result.address);
  };

  return (
    <Flex asChild {...styles.form}>
      <form onSubmit={handleSubmit(onSubmit)} name="address">
        <ControlledInput
          control={control}
          name="streetName"
          type="text"
          label={t("checkoutPage.address.streetName.label")}
          placeholder={t("checkoutPage.address.streetName.placeholder")}
          TAG={TAG}
          autoComplete="address-line1"
        />
        <ControlledInput
          control={control}
          name="streetNumber"
          type="text"
          label={t("checkoutPage.address.streetNumber.label")}
          placeholder={t("checkoutPage.address.streetNumber.placeholder")}
          TAG={TAG}
          autoComplete="address-line2"
        />
        <ControlledInput
          control={control}
          name="city"
          type="text"
          label={t("checkoutPage.address.city.label")}
          placeholder={t("checkoutPage.address.city.placeholder")}
          TAG={TAG}
          autoComplete="address-level2"
        />
        <ControlledInput
          control={control}
          name="postalCode"
          type="text"
          label={t("checkoutPage.address.postalCode.label")}
          placeholder={t("checkoutPage.address.postalCode.placeholder")}
          TAG={TAG}
          autoComplete="postal-code"
        />
        <CountrySelect
          control={control}
          name="country"
          label={t("checkoutPage.address.country.label")}
          TAG={TAG}
        />
        <ActionButton
          type="submit"
          isPending={formState.isSubmitting}
          disabled={formState.isSubmitting || !formState.isValid}
          data-testid={`${TAG}-submit`}
          {...styles.saveButton}
        >
          {t("checkoutPage.address.save")}
        </ActionButton>
        {formState.errors.root && (
          <FormError message={formState.errors.root.message ?? ""} />
        )}
      </form>
    </Flex>
  );
}
