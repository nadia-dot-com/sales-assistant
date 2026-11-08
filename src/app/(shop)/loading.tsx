import { Flex, Spinner } from "@chakra-ui/react";
import { styles } from "@/app/loading.styles";
import { Provider as ChakraUIProvider } from "@/components/ui/provider/provider";

export default function Loading() {
  return (
    <ChakraUIProvider {...styles.loading}>
      <Flex {...styles.loading}>
        <Spinner size="lg" {...styles.loadingSpinner} />
      </Flex>
    </ChakraUIProvider>
  );
}
