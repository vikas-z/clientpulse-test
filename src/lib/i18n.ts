import { getRequestConfig } from 'next-intl/server';

export const SUPPORTED_LOCALES = ['en', 'es', 'fr'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}));