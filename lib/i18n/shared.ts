export const supportedLanguages = ['ru', 'en', 'zh'] as const;

export type Language = (typeof supportedLanguages)[number];

export const defaultLanguage: Language = 'ru';

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && supportedLanguages.includes(value as Language);
}
