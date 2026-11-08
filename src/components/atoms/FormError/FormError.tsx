import { Text } from "@chakra-ui/react";
import { styles } from "@/components/atoms/FormError/FormError.styles";

interface FormErrorProps {
  message: string;
}

export function FormError({ message }: FormErrorProps) {
  return <Text {...styles.formError}>{message}</Text>;
}
