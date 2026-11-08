"use server";

import { getExtractedSentence } from "@/features/salesAssistant/api/getExtractedSentence";
import type { NOTHING_EXTRACTED } from "@/features/salesAssistant/constants/chatRoles";
import type { SalesAssistantExtractedSentenceResponse } from "@/features/salesAssistant/types/responseAndRequest.types";

export async function handleExtractedSentence(
  sentence: string,
  language: string,
): Promise<SalesAssistantExtractedSentenceResponse | typeof NOTHING_EXTRACTED> {
  const extractedSentence = await getExtractedSentence(sentence, language);
  return extractedSentence;
}
