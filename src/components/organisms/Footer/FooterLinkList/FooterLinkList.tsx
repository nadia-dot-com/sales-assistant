import type { FlexProps } from "@chakra-ui/react";
import { Flex, Heading, List } from "@chakra-ui/react";
import { NextLink } from "@/components/atoms/NextLink";
import { styles } from "@/components/organisms/Footer/FooterLinkList/FooterLinkList.styles";
import type { FooterLinkItem } from "@/sanity/types/footerContent.types";

const TAG = "FooterLinkList";

interface FooterLinkListProps extends FlexProps {
  heading?: string;
  items: FooterLinkItem[];
}

export function FooterLinkList({
  heading,
  items,
  ...rest
}: FooterLinkListProps) {
  return (
    <Flex data-testid={TAG} {...styles.root} {...rest}>
      {heading && (
        <Heading {...styles.heading} h={6}>
          {heading}
        </Heading>
      )}
      <List.Root {...styles.list}>
        {items.map((item, index) => (
          <List.Item key={item.title} data-testid={`${TAG}-item-${index}`}>
            <NextLink href={item.href} {...styles.link}>
              {item.title}
            </NextLink>
          </List.Item>
        ))}
      </List.Root>
    </Flex>
  );
}
