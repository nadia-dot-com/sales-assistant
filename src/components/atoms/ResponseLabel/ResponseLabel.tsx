import { Text } from "@chakra-ui/react";
import { styles } from "@/components/atoms/ResponseLabel/ResponseLabel.styles";

interface ResponseLabelProps {
  title: string;
}

export function ResponseLabel({ title }: ResponseLabelProps) {
  return <Text {...styles.label}>{title}</Text>;
}
