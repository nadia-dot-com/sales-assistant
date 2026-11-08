import { Flex, Text } from "@chakra-ui/react";
import { styles } from "@/features/product/components/ProductTabs/ProductTabs.styles";
import type { ParameterRow } from "@/features/product/types/ProductTabs.types";

const TAG = "ProductParametersList";

interface ProductParametersListProps {
  parameters: ParameterRow[];
}

export function ProductParametersList({
  parameters,
}: ProductParametersListProps) {
  return (
    <Flex as="dl" {...styles.parametersList} data-testid={TAG}>
      {parameters.map((parameter) => (
        <Flex as="div" key={parameter.label} {...styles.parameterRow}>
          <Text as="dt" {...styles.parameterLabel}>
            {parameter.label}
          </Text>
          <Text as="dd" {...styles.parameterValue}>
            {parameter.value}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}
