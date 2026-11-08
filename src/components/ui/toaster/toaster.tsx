"use client";

import {
  Toaster as ChakraToaster,
  createToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
} from "@chakra-ui/react";
import { styles } from "@/components/ui/toaster/toaster.styles";

export const toaster = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
  offsets: { top: "1rem", bottom: "80px", left: "1rem", right: "1rem" },
});

const accentColorByType: Record<string, string> = {
  success: "success-color",
  error: "destructive-color",
  info: "primary-color",
  loading: "neutral-color",
};

export const Toaster = () => {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} {...styles.toaster}>
        {(toast) => {
          const accent = accentColorByType[toast.type ?? ""] ?? "neutral-color";

          return (
            <Toast.Root
              {...styles.toastRoot}
              borderInlineStartColor={accent}
              data-testid={`Toast-${toast.type}`}
            >
              {toast.type === "loading" ? (
                <Spinner size="sm" color={accent} />
              ) : (
                <Toast.Indicator color={accent} />
              )}
              <Stack {...styles.stack}>
                {toast.title && (
                  <Toast.Title {...styles.title}>{toast.title}</Toast.Title>
                )}
                {toast.description && (
                  <Toast.Description {...styles.description}>
                    {toast.description}
                  </Toast.Description>
                )}
              </Stack>
              {toast.action && (
                <Toast.ActionTrigger color={accent}>
                  {toast.action.label}
                </Toast.ActionTrigger>
              )}
              {toast.closable && <Toast.CloseTrigger />}
            </Toast.Root>
          );
        }}
      </ChakraToaster>
    </Portal>
  );
};
