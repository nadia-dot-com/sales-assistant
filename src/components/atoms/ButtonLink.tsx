import { Button, type ButtonProps } from "@chakra-ui/react";
import type { LinkProps } from "next/link";
import { NextLink } from "@/components/atoms/NextLink";

export interface ButtonLinkProps extends ButtonProps, Pick<LinkProps, "href"> {}

export function ButtonLink({
  href,
  variant,
  disabled,
  children,
  ...props
}: ButtonLinkProps) {
  if (disabled) {
    return (
      <Button variant={variant} disabled {...props}>
        {children}
      </Button>
    );
  }

  return (
    <Button asChild variant={variant} {...props}>
      <NextLink href={href} variant="plain" textDecoration="none">
        {children}
      </NextLink>
    </Button>
  );
}
