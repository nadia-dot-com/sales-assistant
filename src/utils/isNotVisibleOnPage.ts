import { routes } from "@/config/routes";

export function isNotVisibleOnPage(pathname: string) {
  return (
    pathname === routes.checkout ||
    pathname === routes.login ||
    pathname === routes.register
  );
}
