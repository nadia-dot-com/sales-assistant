import { Flex, Text } from "@chakra-ui/react";
import { NextLink } from "@/components/atoms/NextLink";
import { styles } from "@/components/molecules/FormLinkSection/FormLinkSection.styles";

interface FormLinkSection {
  label: string;
  linkText: string;
  href: string;
  redirectUrl: string;
}
export function FormLinkSection({
  label,
  linkText,
  href,
  redirectUrl,
}: FormLinkSection) {
  return (
    <Flex {...styles.linkSection}>
      <Text {...styles.accountMissing}>{label}</Text>
      <NextLink href={`${href}?redirectTo=${redirectUrl}`} {...styles.link}>
        {linkText}
      </NextLink>
    </Flex>
  );
}
