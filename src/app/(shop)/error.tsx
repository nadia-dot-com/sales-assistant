"use client";

import { Flex } from "@chakra-ui/react";
import type { ErrorInfo } from "next/error";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { styles } from "@/app/(shop)/error.styles";
import { ErrorState } from "@/components/molecules/ErrorState/ErrorState";
import { Provider as ChakraUIProvider } from "@/components/ui/provider/provider";

const TAG = "ProductError";

export default function ProductError({ reset }: ErrorInfo) {
  const t = useTranslations();
  const [ispending, startTransition] = useTransition();

  const handleRetry = () => startTransition(() => reset());

  return (
    <ChakraUIProvider>
      <Flex data-testid={TAG} {...styles.errorBoundary}>
        <ErrorState
          title={t("common.error.title").toUpperCase()}
          message={t("common.error.message")}
          retryLabel={t("common.error.retry").toUpperCase()}
          onRetry={handleRetry}
          isRetry={ispending}
        />
      </Flex>
    </ChakraUIProvider>
  );
}
