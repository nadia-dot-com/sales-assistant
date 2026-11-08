import { SANITY_SOURCE } from "@/config/env";
import { client } from "@/sanity/client";
import { getBackupJson } from "@/sanity/utils/getBackupJson";

export async function getHomePageContent() {
  if (SANITY_SOURCE === "local") {
    return getBackupJson("homePageContent");
  }
  const HOMEPAGE_CONTENT_QUERY = `*[_id == "homepage-en"][0]{
        "banner": banner.asset->url,
        description
    }`;

  return await client.fetch(HOMEPAGE_CONTENT_QUERY);
}
