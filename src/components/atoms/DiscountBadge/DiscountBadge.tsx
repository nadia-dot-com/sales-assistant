import { Badge } from "@chakra-ui/react";
import { styles } from "@/components/atoms/DiscountBadge/DiscountBadge.styles";

interface DiscountBadgeProps {
  name: string;
}

export function DiscountBadge({ name }: DiscountBadgeProps) {
  return <Badge {...styles.badge}>{name}</Badge>;
}
