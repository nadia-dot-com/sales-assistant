"use client";

import { Button, Icon } from "@chakra-ui/react";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { styles } from "@/components/molecules/NotifyButton/NotifyButton.styles";
import { NotifyModal } from "@/components/molecules/NotifyModal/NotifyModal";
import { DialogRoot, DialogTrigger } from "@/components/ui/dialog/dialog";

const TAG = "NotifyButton";

interface NotifyButtonProps {
  subjectName: string;
}

export function NotifyButton({ subjectName }: NotifyButtonProps) {
  const t = useTranslations();
  const label = t("productPage.stockInformation.notify");
  const [modalKey, setModalKey] = useState(0);

  return (
    <DialogRoot
      placement="center"
      unmountOnExit
      onOpenChange={({ open }) => {
        if (open) {
          setModalKey((key) => key + 1);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button data-testid={TAG} {...styles.button}>
          <Icon size="sm">
            <Mail />
          </Icon>
          {label.toUpperCase()}
        </Button>
      </DialogTrigger>
      <NotifyModal key={modalKey} subjectName={subjectName} />
    </DialogRoot>
  );
}
