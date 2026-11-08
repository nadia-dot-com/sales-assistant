"use client";

import { Box, Field, Icon, Input, Text } from "@chakra-ui/react";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useState } from "react";
import { ActionButton } from "@/components/atoms/ActionButton";
import { NotifyError } from "@/components/molecules/NotifyError/NotifyError";
import { styles } from "@/components/molecules/NotifyModal/NotifyModal.styles";
import { NotifySuccess } from "@/components/molecules/NotifySuccess/NotifySuccess";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { sendNotifyForm } from "@/features/product/actions/sendNotifyForm.action";
import type { NotifyFormStatus } from "@/features/product/types/notifyFormStatus.types";
import { EMAIL_PATTERN } from "@/zod/schema/notifySchema";

const TAG = "NotifyModal";

type View = "form" | "success" | "error";

interface NotifyModalProps {
  subjectName: string;
}

const INITIAL_STATE: NotifyFormStatus = {
  success: false,
  error: false,
  email: "",
};

export function NotifyModal({ subjectName }: NotifyModalProps) {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [view, setView] = useState<View>("form");

  const [state, formAction, isPending] = useActionState(
    sendNotifyForm,
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.success) {
      setView("success");
    } else if (state.error) {
      setView("error");
    }
  }, [state]);

  return (
    <DialogContent data-testid={TAG} {...styles.root}>
      {view === "success" ? (
        <NotifySuccess email={state.email ?? ""} />
      ) : view === "error" ? (
        <NotifyError onRetry={() => setView("form")} />
      ) : (
        <>
          <DialogHeader {...styles.heading}>
            <DialogTitle {...styles.title}>
              <Text>{t("productPage.notifyModal.title").toUpperCase()}</Text>
              <Box {...styles.divider} />
              <Text {...styles.subject}>{subjectName.toUpperCase()}</Text>
            </DialogTitle>
          </DialogHeader>

          <form action={formAction} autoComplete="on">
            <DialogBody {...styles.body}>
              <Field.Root>
                <Field.Label>
                  {t("productPage.notifyModal.emailLabel").toUpperCase()}
                </Field.Label>
                <Input
                  data-testid={`${TAG}-email`}
                  name="email"
                  type="email"
                  required
                  pattern={EMAIL_PATTERN.source}
                  placeholder={t("productPage.notifyModal.emailPlaceholder")}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  {...styles.input}
                />
              </Field.Root>
            </DialogBody>
            <DialogFooter>
              <ActionButton
                data-testid={`${TAG}-submit`}
                type="submit"
                disabled={!email || isPending}
                isPending={isPending}
                {...styles.submitButton}
              >
                <Icon size="sm">
                  <Mail />
                </Icon>
                {t("productPage.notifyModal.submit").toUpperCase()}
              </ActionButton>
            </DialogFooter>
          </form>
        </>
      )}
      <DialogCloseTrigger />
    </DialogContent>
  );
}
