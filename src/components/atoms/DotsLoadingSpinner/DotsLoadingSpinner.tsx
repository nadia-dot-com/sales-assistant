import { Box, Flex } from "@chakra-ui/react";
import { styles } from "@/components/atoms/DotsLoadingSpinner/DotsLoadingSpinner.styles";

export function DotsLoadingSpinner() {
  return (
    <Flex {...styles.container} role="status">
      <Box {...styles.dot} {...styles.dotDelay1} />
      <Box {...styles.dot} {...styles.dotDelay2} />
      <Box {...styles.dot} />
    </Flex>
  );
}
