import {
  Link as ChakraLink,
  type LinkProps as ChakraUiLinkProps,
} from "@chakra-ui/react";
import Link, { type LinkProps } from "next/link";
import type { PropsWithChildren } from "react";

interface NextLinkProps
  extends PropsWithChildren,
    Pick<LinkProps, "href">,
    Omit<ChakraUiLinkProps, "href"> {}

export function NextLink({ href, children, ...props }: NextLinkProps) {
  return (
    <ChakraLink asChild {...props}>
      <Link href={href}>{children}</Link>
    </ChakraLink>
  );
}
