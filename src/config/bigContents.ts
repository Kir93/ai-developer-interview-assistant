import { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import { ResponseQuestionData } from 'types/generateQuestion.types';

export const blurDataURL =
  'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==';

export const notoSans = Noto_Sans_KR({
  weight: '400',
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Malgun Gothic',
    'sans-serif'
  ]
});

export const DAILY_API_REQUEST_LIMIT = 3;

export const DUMMY_QUESTION: ResponseQuestionData = {
  success: true,
  limitCount: 3,
  data: {
    question: 'React란?',
    answer: 'React는 Facebook에서 개발한 UI 라이브러리입니다.',
    topic: 'React',
    difficulty: 'hard',
    tags: ['react', 'frontend']
  }
};

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
    'Zustand',
    'Next.js'
  ],
  authors: [{ name: 'Kir93', url: 'https://github.com/Kir93' }],
  openGraph: {
    title: 'AI Developer Interview Assistant',
    description: 'Get the latest development trends and interview tips delivered to your inbox.',
    images: 'https://interview.kir93.co.kr/thumbnail.png',
    url: 'https://interview.kir93.co.kr',
    siteName: 'AI Developer Interview Assistant',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Developer Interview Assistant',
    description: 'Get the latest development trends and interview tips delivered to your inbox.',
    images: 'https://interview.kir93.co.kr/thumbnail.png',
    creator: '@kir93',
    site: 'https://interview.kir93.co.kr'
  },
  metadataBase: new URL('https://interview.kir93.co.kr')
};
