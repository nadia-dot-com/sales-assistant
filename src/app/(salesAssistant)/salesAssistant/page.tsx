import "server-only";
import { unauthorized } from "next/navigation";
import { getServerSession } from "@/features/auth/session/getServerSession";
import { getProductFacets } from "@/features/product/api/getProductFacets";
import { buildFacets } from "@/features/product/helpers/facets/buildFacets";
import { SalesAssistantView } from "@/features/salesAssistant/components/SalesAssistantView/SalesAssistantView";
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE_IN_BCP47,
} from "@/features/salesAssistant/config";
import { assertUserHasAccessToSalesAssistant } from "@/features/salesAssistant/permissions/permissions";
import { searchParamValue } from "@/lib/helpers/searchParamValue";

interface SalesAssistantPageProps extends PageProps<"/salesAssistant"> {}

export default async function SalesAssistantPage({
  searchParams,
}: SalesAssistantPageProps) {
  const session = await getServerSession();

  if (!session) {
    unauthorized();
  }

  const userId = session.user.ctCustomerId;

  await assertUserHasAccessToSalesAssistant(userId);

  const { facets, facetMap } = await getProductFacets();
  const buildedFacets = buildFacets(facets);

  const { language, chatId } = await searchParams;

  const languageValue = searchParamValue(language);
  const languageCode =
    languageValue === "" ? DEFAULT_LANGUAGE_IN_BCP47 : languageValue;
  const chatIdValue = searchParamValue(chatId);

  return (
    <SalesAssistantView
      availableLanguages={AVAILABLE_LANGUAGES}
      language={languageCode}
      facetMap={facetMap}
      buildedFacets={buildedFacets}
      chatId={chatIdValue}
    />
  );
}
