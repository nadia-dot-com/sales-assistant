"use client";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { type SubmitEvent, useState } from "react";
import { styles } from "@/components/molecules/SearchBar/SearchBar.styles";
import { searchHref } from "@/lib/category/searchHref";
import { isNotVisibleOnPage } from "@/utils/isNotVisibleOnPage";

const TAG = "SearchBar";

export function SearchBar() {
  const t = useTranslations();
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");
  const pathname = usePathname();
  if (isNotVisibleOnPage(pathname)) {
    return null;
  }

  const handleSearch = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = new FormData(e.currentTarget).get("query")?.toString() ?? "";

    if (!query) {
      return;
    }

    router.push(searchHref(query, "", "", 1));
    setInputValue("");
  };

  return (
    <search data-testid={TAG}>
      <Flex {...styles.searchBar} asChild>
        <form onSubmit={handleSearch} name="search">
          <Icon {...styles.searchIcon}>
            <SearchIcon />
          </Icon>
          <Input
            type="search"
            name="query"
            aria-label={t("rootLayout.header.searchBar.placeholder")}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            {...styles.input}
            placeholder={`${t("rootLayout.header.searchBar.placeholder")}...`}
          />
        </form>
      </Flex>
    </search>
  );
}
