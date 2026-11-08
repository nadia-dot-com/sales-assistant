"use client";

import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ReactCountryFlag from "react-country-flag";
import {
  flagStyle,
  styles,
} from "@/components/molecules/LanguageSwitcher/LanguageSwitcher.styles";
import {
  AVAILABLE_LANGUAGES,
  type AvailableLanguage,
} from "@/features/salesAssistant/config";

interface LanguageSwitcherProps {
  selectedLanguage: string;
  availableLanguages: AvailableLanguage[];
  onLanguageChange: (language: string) => void;
}

const TAG = "LanguageSwitcher";

export function LanguageSwitcher({
  selectedLanguage,
  availableLanguages,
  onLanguageChange,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const languages = createListCollection({
    items: availableLanguages,
    itemToValue: (language) => language.value,
    itemToString: (language) => language.label,
  });

  const selectedAvailableLanguage = AVAILABLE_LANGUAGES.find(
    (language) => language.value === selectedLanguage,
  );

  const handleLanguageChange = (option: string[]) => {
    const next = option[0];
    if (!next) {
      return;
    }

    onLanguageChange(next);

    startTransition(() => {
      const params = new URLSearchParams({ language: next });
      router.push(`/salesAssistant?${params.toString()}`);
    });
  };

  return (
    <Select.Root
      collection={languages}
      value={[selectedLanguage]}
      onValueChange={(e) => handleLanguageChange(e.value)}
      data-testid={TAG}
      readOnly={isPending}
      {...styles.select}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText {...styles.value} data-testid={`${TAG}-value`}>
            <ReactCountryFlag
              countryCode={selectedAvailableLanguage?.countryCode ?? "EN"}
              svg
              aria-label={selectedAvailableLanguage?.countryCode}
              style={flagStyle}
            />
          </Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup {...styles.indicatorGroup}>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content {...styles.content} {...styles.smallContentView}>
            {languages.items.map((language) => (
              <Select.Item
                item={language}
                key={language.value}
                {...styles.item}
                {...styles.smallItemView}
              >
                <Select.ItemIndicator />
                {language.label}
                <ReactCountryFlag
                  countryCode={language.countryCode}
                  svg
                  aria-hidden="true"
                  style={flagStyle}
                />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
