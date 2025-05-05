import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'en'
});

export type Locale = (typeof routing.locales)[number];
