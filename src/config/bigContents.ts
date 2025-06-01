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

export const DUMMY_QUESTION = {
  success: true,
  limitCount: 3,
  data: {
    question: 'React란?',
    answer: 'React는 Facebook에서 개발한 UI 라이브러리입니다.',
    topic: 'React',
    difficulty: 'hard',
    tags: ['react', 'frontend']
  }
} as const;
