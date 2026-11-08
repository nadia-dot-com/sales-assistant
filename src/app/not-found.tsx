import { Flex, Text } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";
import { styles } from "@/app/not-found.styles";

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <Flex {...styles.container}>
      <Flex {...styles.text}>
        <Text {...styles.error}>404</Text>
        <Text>{t("notFoundPage.title")}</Text>
      </Flex>
      {t("notFoundPage.description")}
    </Flex>
  );
}
