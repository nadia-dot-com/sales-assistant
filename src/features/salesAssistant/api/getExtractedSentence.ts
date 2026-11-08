import "server-only";
import { signedFetch } from "@/aws/client";
import { getEnv } from "@/config/getEnv";
import { NOTHING_EXTRACTED } from "@/features/salesAssistant/constants/chatRoles";
import type {
  SalesAssistantExtractedSentenceResponse,
  SalesAssistantExtractRequest,
} from "@/features/salesAssistant/types/responseAndRequest.types";

export async function getExtractedSentence(
  sentence: string,
  language: string,
): Promise<SalesAssistantExtractedSentenceResponse | typeof NOTHING_EXTRACTED> {
  const query: SalesAssistantExtractRequest = {
    utterance: sentence,
    language,
  };

  const response = await signedFetch(
    getEnv("SALES_ASSISTANT_EXTRACT_API_URL"),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    },
  );

  if (response.status === 422) {
    return NOTHING_EXTRACTED;
  }

  if (!response.ok) {
    throw new Error(
      `Failed to extract sentence: ${response.status} ${response.statusText} - ${response.text()}`,
    );
  }

  const data: SalesAssistantExtractedSentenceResponse = await response.json();

  return data;
}
