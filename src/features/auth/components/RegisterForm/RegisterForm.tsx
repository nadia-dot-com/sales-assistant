"use client";
import { Fieldset, Flex } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ActionButton } from "@/components/atoms/ActionButton";
import { FormError } from "@/components/atoms/FormError/FormError";
import { ControlledInput } from "@/components/molecules/ControlledInput/ControlledInput";
import { FormLegend } from "@/components/molecules/FormLegend/FormLegend";
import { FormLinkSection } from "@/components/molecules/FormLinkSection/FormLinkSection";
import { routes } from "@/config/routes";
import { registerAction } from "@/features/auth/actions/registerAction";
import { PasswordCheckList } from "@/features/auth/components/RegisterForm/PasswordCheckList/PasswordCheckList";
import { styles } from "@/features/auth/styles/authFormStyles.styles";
import { type RegisterSchema, registerSchema } from "@/zod/schema/authSchema";

const TAG = "RegisterForm";

export function RegisterForm() {
  const router = useRouter();
  const t = useTranslations();
  const params = useSearchParams();
  const redirectTo = params.get("redirectTo") ?? routes.home;

  const { control, setError, handleSubmit, formState, getValues } =
    useForm<RegisterSchema>({
      resolver: zodResolver(registerSchema),
      mode: "onChange",
      defaultValues: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
      },
    });

  async function onSubmit(data: RegisterSchema) {
    const { error, message } = await registerAction(data);

    if (error) {
      setError("root", {
        message: t(message),
      });
      return;
    }

    router.push(redirectTo);
  }

  return (
    <Flex as="section" {...styles.container} asChild>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid={TAG}
        name="registerForm"
      >
        <Fieldset.Root {...styles.wrapper}>
          <FormLegend
            label={t("registerPage.legend.title")}
            description={t("registerPage.legend.description")}
          />
          <Fieldset.Content>
            <ControlledInput
              control={control}
              name="firstName"
              type="text"
              label={t("registerPage.firstName.label")}
              placeholder={t("registerPage.firstName.placeholder")}
              TAG={TAG}
            />
            <ControlledInput
              control={control}
              name="lastName"
              type="text"
              label={t("registerPage.lastName.label")}
              placeholder={t("registerPage.lastName.placeholder")}
              TAG={TAG}
            />
            <ControlledInput
              control={control}
              name="email"
              type="email"
              label={t("registerPage.email.label")}
              placeholder={t("registerPage.email.placeholder")}
              TAG={TAG}
              indicator
            />
            <ControlledInput
              control={control}
              name="password"
              type="password"
              label={t("registerPage.password.label")}
              placeholder={t("registerPage.password.placeholder")}
              TAG={TAG}
              indicator
            >
              <PasswordCheckList password={getValues("password")} />
            </ControlledInput>
            <ActionButton
              type="submit"
              disabled={
                formState.isSubmitting ||
                (formState.isSubmitted && !formState.isValid)
              }
              isPending={formState.isSubmitting}
              data-testid={`${TAG}-submit`}
            >
              {t("registerPage.submit")}
            </ActionButton>

            {formState.errors.root && (
              <FormError message={formState.errors.root.message ?? ""} />
            )}
          </Fieldset.Content>
        </Fieldset.Root>
        <FormLinkSection
          label={t("registerPage.linkSection.title")}
          linkText={t("registerPage.linkSection.linkText")}
          href="/login"
          redirectUrl={encodeURIComponent(redirectTo)}
        />
      </form>
    </Flex>
  );
}
