import { SANITY_SOURCE } from "@/config/env";
import { LOCALE } from "@/config/env.public";
import { client } from "@/sanity/client";
import { getBackupJson } from "@/sanity/utils/getBackupJson";

export interface HeaderLogo {
  _type: "image";
  asset: {
    url: string;
    dimensions: {
      _type: "sanity.imageDimensions";
      aspectRatio: number;
      height: number;
      width: number;
    };
  };
}

export async function getHeaderLogo(): Promise<HeaderLogo | null> {
  if (SANITY_SOURCE === "local") {
    return getBackupJson("headerLogo") as Promise<HeaderLogo | null>;
  }

  const LOGO_QUERY = `*[_id == "header-${LOCALE}"][0].logo{
  ...,
  asset->{
    url,
    "dimensions": metadata.dimensions,
  }
}`;

  return client.fetch<HeaderLogo | null>(LOGO_QUERY);
}
