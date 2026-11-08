export function getPluralTranslationKey(
  locale: string,
  baseKey: string,
  count: number,
) {
  const pluralRules = new Intl.PluralRules(locale);
  return `${baseKey}.${pluralRules.select(count)}`;
}
