import { headers } from 'next/headers';

/**
 * 클라이언트 IP 주소 가져오기
 * @returns IP 주소 문자열
 */
export async function getClientIP(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIP = headersList.get('x-real-ip');

  const isDevelopment = process.env.NODE_ENV === 'development';
  if (forwardedFor) {
    const ip = forwardedFor.split(',')[0].trim();
    if (isDevelopment && (ip === '::1' || ip === '127.0.0.1')) {
      return 'development-ip';
    }
    return ip;
  }

  if (realIP) {
    if (isDevelopment && (realIP === '::1' || realIP === '127.0.0.1')) {
      return 'development-ip';
    }
    return realIP;
  }

  if (isDevelopment) {
    return 'development-ip';
  }

  return 'unknown';
}
