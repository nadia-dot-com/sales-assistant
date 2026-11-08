"use client";
import { Field, List } from "@chakra-ui/react";
import { Dot } from "lucide-react";
import { useTranslations } from "next-intl";
import { styles } from "@/features/auth/components/RegisterForm/PasswordCheckList/PasswordCheckList.styles";
import {
  LOWERCASE_REGEX,
  SPECIAL_CHARACTER_REGEX,
  UPPERCASE_REGEX,
} from "@/zod/schema/authSchema";

interface PasswordCheckListProps {
  password: string;
}

const TAG = "PasswordCheckList";

export function PasswordCheckList({ password }: PasswordCheckListProps) {
  const t = useTranslations();
  const checkList = [
    {
      label: t("registerPage.password.lowercaseHint"),
      done: LOWERCASE_REGEX.test(password),
    },
    {
      label: t("registerPage.password.uppercaseHint"),
      done: UPPERCASE_REGEX.test(password),
    },
    {
      label: t("registerPage.password.specialCharacterHint"),
      done: SPECIAL_CHARACTER_REGEX.test(password),
    },
  ];

  return (
    <List.Root variant="plain" data-testid={TAG} {...styles.list}>
      {checkList.map(({ label, done }) => (
        <List.Item key={label} {...styles.listItem}>
          <Dot />
          <Field.HelperText {...(done ? styles.checked : styles.item)}>
            {label}
          </Field.HelperText>
        </List.Item>
      ))}
    </List.Root>
  );
}
