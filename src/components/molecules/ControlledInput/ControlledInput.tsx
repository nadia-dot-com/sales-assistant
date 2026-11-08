"use client";
import { Field, Input, type InputProps } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import {
  Controller,
  type ControllerProps,
  type FieldValues,
} from "react-hook-form";
import { styles } from "@/components/molecules/ControlledInput/ControlledInput.styles";

interface ControlledInputProps<T extends FieldValues>
  extends Pick<ControllerProps<T>, "control" | "name">,
    Omit<InputProps, "name" | "defaultValue"> {
  label: string;
  TAG: string;
  indicator?: boolean;
}

export function ControlledInput<T extends FieldValues>({
  label,
  indicator = false,
  TAG,
  control,
  name,
  type,
  children,
  placeholder,
}: ControlledInputProps<T>) {
  const t = useTranslations();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field.Root required={indicator} invalid={fieldState.invalid}>
          <Field.Label htmlFor={field.name}>
            {label}
            {indicator && (
              <Field.RequiredIndicator {...styles.requiredIndicator} />
            )}
          </Field.Label>
          <Input
            id={field.name}
            type={type}
            placeholder={placeholder}
            data-testid={`${TAG}-${field.name}`}
            aria-invalid={fieldState.invalid}
            {...field}
            {...styles.input}
          />
          {fieldState.error?.message && (
            <Field.ErrorText>{t(fieldState.error.message)}</Field.ErrorText>
          )}
          {children}
        </Field.Root>
      )}
    />
  );
}
