interface SocialItem {
  socialName: string;
  socialIcon: string;
  socialUrl: string;
}

export interface PaymentMethod {
  paymentMethodName: string;
  paymentMethodIcon: string;
}

interface LinkItem {
  title: string;
  url: string;
}

export interface FooterQueryResult {
  brand: {
    logo: string;
    description?: string;
  } | null;
  socials: SocialItem[] | null;
  contacts: {
    address?: string;
    email?: string;
    phone?: string;
  } | null;
  links: LinkItem[] | null;
  legalBar: LinkItem[] | null;
}
