import type { FooterQueryResult } from "@/sanity/types/footer.types";
import type {
  FooterContent,
  FooterLinkItem,
} from "@/sanity/types/footerContent.types";

export function mapFooterContent(
  footerQueryResult: FooterQueryResult,
): FooterContent {
  return {
    brandLogo: footerQueryResult.brand?.logo ?? "",
    brandDescription: footerQueryResult.brand?.description ?? "",
    socials: (footerQueryResult.socials ?? []).map((social) => ({
      name: social.socialName,
      icon: social.socialIcon,
      href: social.socialUrl,
    })),
    contacts: [
      footerQueryResult.contacts?.address && {
        title: footerQueryResult.contacts.address.replace(", ", ",\n"),
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(footerQueryResult.contacts.address)}`,
      },
      footerQueryResult.contacts?.email && {
        title: footerQueryResult.contacts.email,
        href: `mailto:${footerQueryResult.contacts.email}`,
      },
      footerQueryResult.contacts?.phone && {
        title: footerQueryResult.contacts.phone,
        href: `tel:${footerQueryResult.contacts.phone}`,
      },
    ].filter(Boolean) as FooterLinkItem[],
    links: (footerQueryResult.links ?? []).map((link) => ({
      title: link.title,
      href: link.url,
    })),
    legalBar: (footerQueryResult.legalBar ?? []).map((item) => ({
      title: item.title,
      href: item.url,
    })),
  };
}
