import { SANITY_SOURCE } from "@/config/env";
import { LOCALE } from "@/config/env.public";
import { client } from "@/sanity/client";
import type { MetadataType } from "@/sanity/types/metadata.types";
import { getBackupJson } from "@/sanity/utils/getBackupJson";

const METADATA_QUERY = `*[_type == "metadata" && _id == "metadata-${LOCALE}"][0]{
                           "favicon": favicon.asset ->url,
                           "socialShareImage": socialShareImage.asset ->url,
                         }`;

const METADATA_INITIAL: MetadataType = {
  favicon: "",
  socialShareImage: "",
};

export async function getMetadata(): Promise<MetadataType> {
  if (SANITY_SOURCE === "local") {
    return getBackupJson("metadata") as Promise<MetadataType>;
  }
  try {
    return await client.fetch<MetadataType>(METADATA_QUERY);
  } catch (error) {
    console.error(
      "Error fetching metadata content: ",
      error instanceof Error ? error.message : error,
    );
    return METADATA_INITIAL;
  }
}
