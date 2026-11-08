"use client";
import { Avatar, VisuallyHidden } from "@chakra-ui/react";
import { User } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { NextLink } from "@/components/atoms/NextLink";
import { styles } from "@/components/organisms/Header/HeaderNavigationIcons/AccountIcon/AccountIcon.styles";
import type { SessionUser } from "@/features/auth/types/auth.types";

const TAG = "AccountIcon";

interface AccountIconProps {
  user: SessionUser | undefined;
}

export function AccountIcon({ user }: AccountIconProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = searchParams.toString();
  const redirectUrl = params ? `${pathname}?${params}` : pathname;
  const label = t("rootLayout.header.accountIcon.title");

  return (
    <NextLink
      href={`/account?redirectTo=${encodeURIComponent(redirectUrl)}`}
      aria-label={t("rootLayout.header.accountIcon.title")}
      data-testid={TAG}
    >
      {user ? (
        <Avatar.Root size="sm" {...styles.avatarRoot}>
          <Avatar.Fallback
            name={`${user.firstName} ${user.lastName}`}
            {...styles.fallback}
          />
        </Avatar.Root>
      ) : (
        <>
          <User aria-hidden focusable="false" />
          <VisuallyHidden>{label}</VisuallyHidden>
        </>
      )}
    </NextLink>
  );
}
