import { Grid, GridItem } from "@chakra-ui/react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { NextLink } from "@/components/atoms/NextLink";
import { SearchBar } from "@/components/molecules/SearchBar/SearchBar";
import { styles } from "@/components/organisms/Header/Header.styles";
import { HeaderNavigationIcons } from "@/components/organisms/Header/HeaderNavigationIcons/HeaderNavigationIcons";
import { MegaMenu } from "@/components/organisms/MegaMenu/MegaMenu";
import { routes } from "@/config/routes";
import { getServerSession } from "@/features/auth/session/getServerSession";
import campaigns from "@/features/campaigns/components/CampaignsBar/mock/campaigns.json";
import { getCategories } from "@/sanity/queries/getCategories";
import { getHeaderLogo } from "@/sanity/queries/getHeaderLogo";

export async function Header() {
  const [t, categories, headerLogo, session] = await Promise.all([
    getTranslations(),
    getCategories(),
    getHeaderLogo(),
    getServerSession(),
  ]);

  return (
    <Grid as="header" {...styles.header}>
      <NextLink href={routes.home} {...styles.logo}>
        <Image
          src={headerLogo?.asset.url ?? "/logo.svg"}
          alt={t("rootLayout.header.logo.alt")}
          width={160}
          height={40}
        />
      </NextLink>
      <GridItem {...styles.search}>
        <Suspense>
          <SearchBar />
        </Suspense>
      </GridItem>
      <GridItem {...styles.icons}>
        <HeaderNavigationIcons
          categories={categories}
          user={session?.user}
          campaigns={campaigns}
        />
      </GridItem>
      <GridItem {...styles.megaMenu}>
        <Suspense>
          <MegaMenu categories={categories} campaigns={campaigns} />
        </Suspense>
      </GridItem>
    </Grid>
  );
}
