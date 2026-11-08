export interface AvailableLanguage {
  label: string;
  value: string;
  countryCode: string;
}

export const DEFAULT_LANGUAGE_IN_BCP47 = "en-GB";
export const AVAILABLE_LANGUAGES: AvailableLanguage[] = [
  {
    label: "English",
    value: DEFAULT_LANGUAGE_IN_BCP47,
    countryCode: "GB",
  },
  {
    label: "Mandarin Chinese",
    value: "zh-CN",
    countryCode: "CN",
  },
  {
    label: "Hindi",
    value: "hi-IN",
    countryCode: "IN",
  },
  {
    label: "Spanish",
    value: "es-ES",
    countryCode: "ES",
  },
  {
    label: "French",
    value: "fr-FR",
    countryCode: "FR",
  },
  {
    label: "Arabic",
    value: "ar-SA",
    countryCode: "SA",
  },
  {
    label: "Portuguese",
    value: "pt-PT",
    countryCode: "PT",
  },
  {
    label: "Russian",
    value: "ru-RU",
    countryCode: "RU",
  },
  {
    label: "Japanese",
    value: "ja-JP",
    countryCode: "JP",
  },
  {
    label: "German",
    value: "de-DE",
    countryCode: "DE",
  },
  {
    label: "Italian",
    value: "it-IT",
    countryCode: "IT",
  },
  {
    label: "Dutch",
    value: "nl-NL",
    countryCode: "NL",
  },
  {
    label: "Norwegian",
    value: "nb-NO",
    countryCode: "NO",
  },
  {
    label: "Swedish",
    value: "sv-SE",
    countryCode: "SE",
  },
  {
    label: "Danish",
    value: "da-DK",
    countryCode: "DK",
  },
  {
    label: "Lithuanian",
    value: "lt-LT",
    countryCode: "LT",
  },
  {
    label: "Latvian",
    value: "lv-LV",
    countryCode: "LV",
  },
  {
    label: "Estonian",
    value: "et-EE",
    countryCode: "EE",
  },
  {
    label: "Polish",
    value: "pl-PL",
    countryCode: "PL",
  },
];
