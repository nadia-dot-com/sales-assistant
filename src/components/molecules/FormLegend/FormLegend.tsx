import { Fieldset, Stack } from "@chakra-ui/react";
import { styles } from "@/components/molecules/FormLegend/FormLegend.styles";

interface FormLegend {
  label: string;
  description: string;
}

export function FormLegend({ label, description }: FormLegend) {
  return (
    <Stack>
      <Fieldset.Legend {...styles.legendTitle}>{label}</Fieldset.Legend>
      <Fieldset.HelperText {...styles.legendDescription}>
        {description}
      </Fieldset.HelperText>
    </Stack>
  );
}
