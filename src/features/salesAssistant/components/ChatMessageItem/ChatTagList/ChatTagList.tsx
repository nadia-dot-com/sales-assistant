import { Flex, Text } from "@chakra-ui/react";
import { styles } from "@/features/salesAssistant/components/ChatMessageItem/ChatTagList/ChatTagList.styles";

export interface ChatTag {
  value: string;
  isNegative: boolean;
}

interface ChatTagListProps {
  tags: ChatTag[];
  testId: string;
}

export function ChatTagList({ tags, testId }: ChatTagListProps) {
  return (
    <Flex data-testid={testId} {...styles.tags}>
      {tags.map((tag) => (
        <Text
          key={tag.value}
          {...styles.tag}
          {...(tag.isNegative && styles.negativeTag)}
        >
          {tag.value}
        </Text>
      ))}
    </Flex>
  );
}
