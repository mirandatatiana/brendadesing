import en from "./en";
import nl from "./nl";
import type { Locale } from "./config";

const dictionaries = { en, nl };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type { Dictionary } from "./en";
export * from "./config";
