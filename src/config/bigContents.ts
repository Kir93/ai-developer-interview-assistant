import { Noto_Sans_KR } from 'next/font/google';

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
