import { EmptyState, VStack } from "@chakra-ui/react";
import { Barcode } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProductsListEmptyStateProps {
  showDescription?: boolean;
}

export function ProductsListEmptyState({
  showDescription = false,
}: ProductsListEmptyStateProps) {
  const t = useTranslations();
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <Barcode />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>
            {t("searchPage.productsList.emptyState.title")}
          </EmptyState.Title>
          {showDescription && (
            <EmptyState.Description>
              {t("searchPage.productsList.emptyState.description")}
            </EmptyState.Description>
          )}
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
