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
import { loginAction } from "@/features/auth/actions/loginAction";
import { styles } from "@/features/auth/styles/authFormStyles.styles";
import { useCartContext } from "@/features/cart/context/CartContext";
import { type LoginSchema, loginSchema } from "@/zod/schema/authSchema";

const TAG = "LoginForm";

export function LoginForm() {
  const router = useRouter();
  const t = useTranslations();
  const params = useSearchParams();
  const { refreshCart } = useCartContext();
  const redirectTo = params.get("redirectTo") ?? routes.home;

  const { control, setError, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    const { error, message } = await loginAction(data);

    if (error) {
      setError("root", {
        message: t(message),
      });
      return;
    }

    refreshCart();
    router.push(redirectTo);
  }

  return (
    <Flex as="section" {...styles.container} asChild>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid={TAG}
        name="loginForm"
      >
        <Fieldset.Root {...styles.wrapper}>
          <FormLegend
            label={t("loginPage.legend.title")}
            description={t("loginPage.legend.description")}
          />
          <Fieldset.Content>
            <ControlledInput
              control={control}
              name="email"
              type="email"
              label={t("loginPage.email.label")}
              placeholder={t("loginPage.email.placeholder")}
              TAG={TAG}
              indicator
            />
            <ControlledInput
              control={control}
              name="password"
              type="password"
              label={t("loginPage.password.label")}
              placeholder={t("loginPage.password.placeholder")}
              TAG={TAG}
              indicator
            />
            <ActionButton
              type="submit"
              disabled={
                formState.isSubmitting ||
                (formState.isSubmitted && !formState.isValid)
              }
              isPending={formState.isSubmitting}
              data-testid={`${TAG}-submit`}
            >
              {t("loginPage.submit")}
            </ActionButton>

            {formState.errors.root && (
              <FormError message={formState.errors.root.message ?? ""} />
            )}
          </Fieldset.Content>
        </Fieldset.Root>
        <FormLinkSection
          label={t("loginPage.linkSection.title")}
          linkText={t("loginPage.linkSection.linkText")}
          href="/register"
          redirectUrl={encodeURIComponent(redirectTo)}
        />
      </form>
    </Flex>
  );
}
