import { useTranslations } from "next-intl";
import { ErrorState } from "@/components/molecules/ErrorState/ErrorState";
import { DialogBody } from "@/components/ui/dialog/dialog";

const TAG = "NotifyError";

interface NotifyErrorProps {
  onRetry: () => void;
}

export function NotifyError({ onRetry }: NotifyErrorProps) {
  const t = useTranslations();

  return (
    <DialogBody data-testid={TAG}>
      <ErrorState
        title={t("productPage.notifyModal.errorTitle").toUpperCase()}
        message={t("productPage.notifyModal.errorMessage")}
        retryLabel={t("productPage.notifyModal.retry").toUpperCase()}
        onRetry={onRetry}
        isRetry={false}
      />
    </DialogBody>
  );
}
