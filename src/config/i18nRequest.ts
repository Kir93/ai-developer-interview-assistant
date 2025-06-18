import { getRequestConfig } from 'next-intl/server';

import { routing } from './i18nRouting';

export default getRequestConfig(async ({ requestLocale }) => {
  // 이것은 일반적으로 '[locale]' 세그먼트에 해당합니다
  let locale = await requestLocale;

  // 유효한 locale이 사용되었는지 확인합니다
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
