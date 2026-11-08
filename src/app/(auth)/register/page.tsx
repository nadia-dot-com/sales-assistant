import { Suspense } from "react";
import { RegisterForm } from "@/features/auth/components/RegisterForm/RegisterForm";
import { getPageTranslationsFromSanity } from "@/sanity/queries/getPageTranslationsFromSanity";
import { TRANSLATION_PAGE_IDS } from "@/sanity/sanityConstants";

export default async function RegisterPage() {
  await getPageTranslationsFromSanity(TRANSLATION_PAGE_IDS.registerPage);
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  );
}
