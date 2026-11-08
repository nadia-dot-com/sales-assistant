export const routes = {
  home: "/",
  account: "/account",
  cart: "/cart",
  checkout: "/checkout",
  login: "/login",
  register: "/register",
  order: "/order",
  salesAssistant: "/salesAssistant",
  product: (key: string) => `/products/${key}`,
  campaign: (slug: string) => `/campaigns/${slug}`,
} as const;
