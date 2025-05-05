import { ReactNode } from 'react';

import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { notoSans } from '@configs/bigContents';

import ChakraUIProvider from '@provider/ChakraUIProvider';
import ReactQueryProvider from '@provider/ReactQueryProvider';

import AppLayout from '@components/layout/AppLayout';
import { Toaster } from '@components/ui/toaster';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Developer Interview Assistant',
  description: 'Get the latest development trends and interview tips delivered to your inbox.',
  keywords: [
    'AI',
    'Developer',
    'Interview',
    'Assistant',
    'NextJS',
    'React',
    'ChakraUI',
    '프론트엔드',
    '면접',
    '개발자',
    '인터뷰',
    '최신 트렌드',
    '코딩',
    'React Query',
    'Zustand'
  ],
  authors: [{ name: 'Kir93' }],
  openGraph: {
    title: 'AI Developer Interview Assistant',
    description: 'Get the latest development trends and interview tips delivered to your inbox.',
    url: 'https://interview.kir93.co.kr',
    siteName: 'AI Developer Interview Assistant',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Developer Interview Assistant',
    description: 'Get the latest development trends and interview tips delivered to your inbox.',
    creator: '@kir93',
    site: 'https://interview.kir93.co.kr'
  },
  metadataBase: new URL('https://interview.kir93.co.kr')
};

type RootLayoutProps = {
  children: ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { lang } = await params;
  let messages;
  try {
    messages = await getMessages({ locale: lang });
  } catch (error) {
    notFound();
  }
  return (
    <html lang={lang} className={notoSans.className} suppressHydrationWarning>
      <head>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID!} />
        <NextIntlClientProvider locale={lang} messages={messages}>
          <ReactQueryProvider>
            <ChakraUIProvider>
              <AppLayout>{children}</AppLayout>
              <Toaster />
            </ChakraUIProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
