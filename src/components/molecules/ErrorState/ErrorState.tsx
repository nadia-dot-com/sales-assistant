"use client";

import { EmptyState, Icon } from "@chakra-ui/react";
import { CircleAlert } from "lucide-react";
import { ActionButton } from "@/components/atoms/ActionButton";
import { styles } from "@/components/molecules/ErrorState/ErrorState.styles";

const TAG = "ErrorState";

interface ErrorStateProps {
  title: string;
  message: string;
  retryLabel: string;
  onRetry: () => void;
  isRetry: boolean;
}

export function ErrorState({
  title,
  message,
  retryLabel,
  onRetry,
  isRetry,
}: ErrorStateProps) {
  return (
    <EmptyState.Root data-testid={TAG} {...styles.container} size="md">
      <EmptyState.Indicator>
        <Icon {...styles.icon}>
          <CircleAlert strokeWidth={1} />
        </Icon>
      </EmptyState.Indicator>
      <EmptyState.Content {...styles.content}>
        <EmptyState.Title {...styles.title}>{title}</EmptyState.Title>
        <EmptyState.Description {...styles.message}>
          {message}
        </EmptyState.Description>
        <ActionButton
          data-testid={`${TAG}-retry`}
          disabled={isRetry}
          onClick={onRetry}
          {...styles.retryButton}
          isPending={isRetry}
        >
          {retryLabel}
        </ActionButton>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
