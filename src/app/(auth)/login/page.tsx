import { Suspense } from "react";
import { LoginForm } from "@/features/auth/components/LoginForm/LoginForm";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";

export default async function LoginPage() {
  await getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.loginPage);

  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
