import { ReactNode } from 'react';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { metadata, notoSans } from '@config/bigContents';

import ChakraUIProvider from '@provider/ChakraUIProvider';
import ReactQueryProvider from '@provider/ReactQueryProvider';

import { Toaster } from '@components/ui/toaster';

export { metadata };

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lang } = await params;
  let messages;
  try {
    messages = await getMessages({ locale: lang });
  } catch (error) {
    console.error(`Failed to load messages for locale "${lang}":`, error);
    notFound();
  }
  return (
    <html lang={lang} className={notoSans.className} suppressHydrationWarning>
      <body>
        <script
          async
          crossOrigin="anonymous"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
        />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID!} />
        <NextIntlClientProvider locale={lang} messages={messages}>
          <ReactQueryProvider>
            <ChakraUIProvider>
              {children}
              <Toaster />
              <Analytics />
            </ChakraUIProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
