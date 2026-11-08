"use server";

import type { ProductMatch } from "@/features/product/types/productResponse.types";
import { getProductsKeys } from "@/features/salesAssistant/api/getProductsKeys";
import type { SalesAssistantExtractedSentenceResponse } from "@/features/salesAssistant/types/responseAndRequest.types";

export async function handleProductsKeys(
  extractedQuery: SalesAssistantExtractedSentenceResponse,
): Promise<ProductMatch[]> {
  const productKeys = await getProductsKeys(extractedQuery);

  return productKeys;
}
