import { Flex, Text } from "@chakra-ui/react";
import type { Address } from "@commercetools/platform-sdk";
import { styles } from "@/features/checkout/components/AddressStepItem/AddressDetails/AddressDetails.styles";

interface AddressDetailsProps {
  address: Address;
  "data-testid"?: string;
}

export function AddressDetails({ address, ...rest }: AddressDetailsProps) {
  return (
    <Flex {...styles.root} {...rest}>
      <Text>{`${address.streetName} ${address.streetNumber}`}</Text>
      <Text>{`${address.postalCode} ${address.city}, ${address.country}`}</Text>
    </Flex>
  );
}
