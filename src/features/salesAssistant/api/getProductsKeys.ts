import "server-only";
import { signedFetch } from "@/aws/client";
import { MAX_PRODUCTS_BY_KEYS_LIMIT } from "@/config/constants";
import { getEnv } from "@/config/getEnv";
import type { ProductMatch } from "@/features/product/types/productResponse.types";
import type {
  SalesAssistantExtractedSentenceResponse,
  SalesAssistantProductKeysRequest,
} from "@/features/salesAssistant/types/responseAndRequest.types";

export async function getProductsKeys(
  extractedQuery: SalesAssistantExtractedSentenceResponse,
): Promise<ProductMatch[]> {
  if (!extractedQuery.keywords.length) {
    throw new Error("No key words");
  }

  const query: SalesAssistantProductKeysRequest = {
    extracted_query: extractedQuery.extracted_query,
    keywords: extractedQuery.keywords,
    negative_keywords: extractedQuery.negative_keywords,
    salesperson_note: extractedQuery.salesperson_note,
    limit: MAX_PRODUCTS_BY_KEYS_LIMIT,
  };

  const response = await signedFetch(
    getEnv("SALES_ASSISTANT_SEARCH_PRODUCTS_API_URL"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to found products keys: ${response.status} ${response.statusText} - ${response.text()}`,
    );
  }

  const data = await response.json();

  return data.search_result.products;
}
