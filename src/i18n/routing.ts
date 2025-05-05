import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'en'
});

/*
 * Lightweight wrappers around Next.js' navigation APIs
 * that will consider the routing configuration
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
