import { Box } from "@chakra-ui/react";
import { styles } from "@/components/atoms/ResponseTail/ResponseTail.styles";

export function ResponseTail() {
  return <Box {...styles.tail} aria-hidden="true" />;
}
