import en from "./locales/en";
import es from "./locales/es";

export const DEFAULT_LANGUAGE = "es";
export const SUPPORTED_LANGUAGES = ["es", "en"];

export const messages = { es, en };

export function isSupportedLanguage(value) {
  return SUPPORTED_LANGUAGES.includes(value);
}

function resolveKey(dictionary, key) {
  return key
    .split(".")
    .reduce((node, part) => (node == null ? undefined : node[part]), dictionary);
}

/**
 * Looks up `key` (dot notation, e.g. "contact.errors.nameRequired") in the
 * given language, falling back to the default language and finally to the
 * key itself. `{{name}}` placeholders are replaced with `values[name]`.
 *
 * The result is plain text; React escapes it when rendering, so translated
 * strings are never injected as HTML.
 */
export function translate(language, key, values) {
  const dictionary = messages[language] ?? messages[DEFAULT_LANGUAGE];
  let text = resolveKey(dictionary, key);
  if (typeof text !== "string") text = resolveKey(messages[DEFAULT_LANGUAGE], key);

  if (typeof text !== "string") {
    if (import.meta.env.DEV) console.warn(`[i18n] Missing translation: "${key}"`);
    return key;
  }

  if (!values) return text;
  return text.replace(/\{\{(\w+)\}\}/g, (match, name) =>
    Object.hasOwn(values, name) ? String(values[name]) : match
  );
}

/**
 * Picks the right language from a content value that is either a plain
 * string or an object keyed by language code ({ es: "...", en: "..." }).
 */
export function localize(value, language) {
  if (value == null || typeof value === "string") return value ?? "";
  return value[language] ?? value[DEFAULT_LANGUAGE] ?? "";
}
