import { Box, Flex, Heading, List } from "@chakra-ui/react";
import parse from "html-react-parser";
import { NextLink } from "@/components/atoms/NextLink";
import { styles } from "@/components/organisms/Footer/FooterIconList/FooterIconList.styles";

const TAG = "FooterIconList";

interface FooterIconListItem {
  href?: string;
  icon: string;
  name: string;
}

interface FooterIconListProps {
  heading: string;
  items: FooterIconListItem[];
}

export function FooterIconList({ heading, items }: FooterIconListProps) {
  return (
    <Flex data-testid={TAG} {...styles.root}>
      <Heading {...styles.heading} h={6}>
        {heading}
      </Heading>
      <List.Root {...styles.list}>
        {items.map((item, index) =>
          item.href ? (
            <List.Item key={item.name} data-testid={`${TAG}-item-${index}`}>
              <NextLink
                href={item.href}
                aria-label={item.name}
                {...styles.link}
                {...styles.interactiveLink}
              >
                <Box {...styles.icon}>{item.icon && parse(item.icon)}</Box>
              </NextLink>
            </List.Item>
          ) : (
            <List.Item key={item.name} data-testid={`${TAG}-item-${index}`}>
              <Box {...styles.link} {...styles.icon} aria-label={item.name}>
                {item.icon && parse(item.icon)}
              </Box>
            </List.Item>
          ),
        )}
      </List.Root>
    </Flex>
  );
}
