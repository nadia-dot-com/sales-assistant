import { SANITY_SOURCE } from "@/config/env";
import { LOCALE } from "@/config/env.public";
import { client } from "@/sanity/client";
import type { FooterContent } from "@/sanity/types/footerContent.types";
import { getBackupJson } from "@/sanity/utils/getBackupJson";
import { mapFooterContent } from "@/sanity/utils/mapFooterContent";

export const FOOTER_QUERY = `{
  "brand": *[_id == "footerBrand-${LOCALE}"][0]{ "logo": logo.asset->url, description },
  "socials": *[_id == "footerSocials-${LOCALE}"][0].socials[]{ socialName, socialIcon, socialUrl },
  "contacts": *[_id == "footerContacts-${LOCALE}"][0]{ address, email, phone },
  "links": *[_id == "footerLinks-${LOCALE}"][0].links[]{ title, url },
  "legalBar": *[_id == "footerLegalBar-${LOCALE}"][0].legalBarItems[]{ title, url }
}`;

const EMPTY_FOOTER_CONTENT: FooterContent = {
  brandLogo: "",
  brandDescription: "",
  socials: [],
  links: [],
  contacts: [],
  legalBar: [],
};

export async function getFooterContent(): Promise<FooterContent> {
  if (SANITY_SOURCE === "local") {
    return getBackupJson("footerContent") as Promise<FooterContent>;
  }

  try {
    const footerQueryResult = await client.fetch(FOOTER_QUERY);
    return mapFooterContent(footerQueryResult);
  } catch (error) {
    console.error(
      "Error fetching footer content:",
      error instanceof Error ? error.message : error,
    );
    return EMPTY_FOOTER_CONTENT;
  }
}
