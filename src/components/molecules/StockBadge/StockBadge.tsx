import { Badge } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import {
  sizeStyles,
  stockStatusStyles,
} from "@/components/molecules/StockBadge/StockBadge.styles";
import type { StockStatus } from "@/features/product/utils/defineStockStatus";

const TAG = "StockBadge";

interface StockBadgeProps {
  stockStatus: StockStatus;
  size?: "sm" | "md";
}

export function StockBadge({ stockStatus, size = "md" }: StockBadgeProps) {
  const t = useTranslations();

  return (
    <Badge
      data-testid={TAG}
      {...sizeStyles[size]}
      {...stockStatusStyles[stockStatus]}
    >
      {t(`productPage.stockInformation.${stockStatus}`)}
    </Badge>
  );
}
