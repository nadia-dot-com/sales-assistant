export interface FooterSocialItem {
  name: string;
  icon: string;
  href: string;
}

export interface FooterPaymentMethod {
  name: string;
  icon: string;
}

export interface FooterLinkItem {
  title: string;
  href: string;
}

export interface FooterContent {
  brandLogo: string;
  brandDescription: string;
  socials: FooterSocialItem[];
  contacts: FooterLinkItem[];
  links: FooterLinkItem[];
  legalBar: FooterLinkItem[];
}
