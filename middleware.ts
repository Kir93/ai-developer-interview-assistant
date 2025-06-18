import createMiddleware from 'next-intl/middleware';

import { routing } from '@config/i18nRouting';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|robots.txt|sitemap(?:-\\d+)?\\.xml|thumbnail.png).*)']
};
