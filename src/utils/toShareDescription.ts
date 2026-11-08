import { MAX_SHARE_DESCRIPTION_LENGTH } from "@/config/constants";

export function toShareDescription(text: string): string {
  if (text.length <= MAX_SHARE_DESCRIPTION_LENGTH) return text;
  return `${text.slice(0, MAX_SHARE_DESCRIPTION_LENGTH - 1).trimEnd()}…`;
}
