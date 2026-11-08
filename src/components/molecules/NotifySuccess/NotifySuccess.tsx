import { Icon, Span, Text } from "@chakra-ui/react";
import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { styles } from "@/components/molecules/NotifySuccess/NotifySuccess.styles";
import { DialogBody } from "@/components/ui/dialog/dialog";

const TAG = "NotifySuccess";

interface NotifySuccessProps {
  email: string;
}

export function NotifySuccess({ email }: NotifySuccessProps) {
  const t = useTranslations();

  return (
    <DialogBody data-testid={TAG} {...styles.body}>
      <Icon {...styles.icon}>
        <CircleCheck strokeWidth={1} />
      </Icon>
      <Text {...styles.title}>
        {t("productPage.notifyModal.successTitle").toUpperCase()}
      </Text>
      <Text {...styles.subject}>
        {t("productPage.notifyModal.success").toUpperCase()}
        <Span>{email}</Span>
      </Text>
    </DialogBody>
  );
}
