import { Box } from "@chakra-ui/react";
import { styles } from "@/components/atoms/RequestTail/RequestTail.styles";

export function RequestTail() {
  return <Box {...styles.tail} aria-hidden="true" />;
}
