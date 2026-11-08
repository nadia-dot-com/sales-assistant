"use client";
import { Badge, Text } from "@chakra-ui/react";
import { X } from "lucide-react";
import { ActionButton } from "@/components/atoms/ActionButton";
import { styles } from "@/components/organisms/FiltersBar/AppliedFilter/AppliedFilter.styles";

const TAG = "AppliedFilter";

interface AppliedFilterProps {
  label: string;
  isPending: boolean;
  onRemove: () => void;
}

export function AppliedFilter({
  label,
  isPending,
  onRemove,
}: AppliedFilterProps) {
  return (
    <Badge data-testid={TAG} {...styles.badge}>
      <ActionButton
        isPending={isPending}
        onClick={onRemove}
        disabled={isPending}
        variant="subtle"
        {...styles.filter}
      >
        <Text>{label}</Text>
        <X size={12} />
      </ActionButton>
    </Badge>
  );
}
