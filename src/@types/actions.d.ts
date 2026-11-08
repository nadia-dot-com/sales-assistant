/** Shape of the compiled i18n messages (repo-root `messages/translations.json`). */
type I18nMessages = typeof import("../../messages/translations.json");

/**
 * Union of every valid dot-notation translation key, e.g.
 * `"authLayout.forms.errors.invalidCredentials"`. Derived from the compiled
 * messages, so a typo or a removed key fails to type-check.
 */
type I18nKey<T = I18nMessages> = {
  [K in keyof T & string]: T[K] extends string ? K : `${K}.${I18nKey<T[K]>}`;
}[keyof T & string];

/**
 * Standard result shape returned by form/server actions.
 * `message` can be either empty or filled on success and an i18n key on error.
 * @example
 * ```ts
 * const res: ActionResponse = { error: true, message: "authLayout.forms.errors.invalidCredentials" };
 * ```
 */
interface ActionResponse {
  error: boolean;
  message: I18nKey | "";
}
