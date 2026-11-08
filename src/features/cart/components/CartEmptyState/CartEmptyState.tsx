import { EmptyState, VStack } from "@chakra-ui/react";
import { Handbag } from "lucide-react";
import { useTranslations } from "next-intl";
import { styles } from "@/features/cart/components/CartEmptyState/CartEmptyState.styles";

interface CartEmptyStateProps {
  size: "sm" | "md" | "lg";
}

export function CartEmptyState({ size }: CartEmptyStateProps) {
  const t = useTranslations();

  return (
    <EmptyState.Root {...styles.root} size={size}>
      <EmptyState.Content {...styles.content}>
        <EmptyState.Indicator>
          <Handbag />
        </EmptyState.Indicator>
        <VStack {...styles.vStack}>
          <EmptyState.Title {...styles.emptyStateTitle}>
            {t("rootLayout.header.cartIcon.emptyState.title")}
          </EmptyState.Title>
          <EmptyState.Description {...styles.emptyStateDescription}>
            {t("rootLayout.header.cartIcon.emptyState.description")}
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
