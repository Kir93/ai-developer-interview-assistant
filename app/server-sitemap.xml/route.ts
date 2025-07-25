import { getServerSideSitemap } from 'next-sitemap';

/*
 * Boilerplate code for dynamic sitemap generation.
 * This page is not actually used, but demonstrates how to generate dynamic sitemaps.
 */
export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_DOMAIN_URL || 'http://localhost:3000';

  const response = await fetch(`${siteUrl}/api/posts`);
  const posts: { id: number }[] = await response.json();

  const newsSitemaps = posts.map((id) => ({
    loc: `${process.env.NEXT_PUBLIC_DOMAIN_URL}${id}`,
    lastmod: new Date().toISOString()
  }));

  const fields = [...newsSitemaps];

  return getServerSideSitemap(fields);
}
