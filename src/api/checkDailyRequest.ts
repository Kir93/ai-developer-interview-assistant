'use server';

import dayjs from 'dayjs';
import { headers } from 'next/headers';

import { DAILY_API_REQUEST_LIMIT } from '@config/bigContents';
import supabase from '@config/supabase';
import { supabaseErrorCodes } from '@config/supabaseErrorCodes';

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

/**
 * IP 주소 기반 당일 API 요청 횟수 확인
 * @param ipAddress IP 주소
 * @returns 당일 API 요청 횟수
 */
export async function getIPDailyApiUsage(ipAddress: string): Promise<number> {
  const startOfDay = dayjs().startOf('day').toISOString();
  const endOfDay = dayjs().endOf('day').toISOString();

  if (ipAddress === 'development-ip' && process.env.NODE_ENV !== 'production') {
    return 1;
  }

  const { data, error } = await supabase
    .from('api_usage')
    .select('count')
    .eq('ip_address', ipAddress)
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay)
    .single();

  if (error) {
    console.error('API 사용량 조회 중 오류:', error);
    return 0;
  }

  return data?.count || 0;
}

/**
 * IP 기반 API 사용량 증가
 * @param ipAddress IP 주소
 */
export async function incrementIPApiUsage(ipAddress: string): Promise<{ limitCount: number }> {
  const startOfDay = dayjs().startOf('day').toISOString();
  const endOfDay = dayjs().endOf('day').toISOString();

  const { data, error: fetchError } = await supabase
    .from('api_usage')
    .select('id, count')
    .eq('ip_address', ipAddress)
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay)
    .single();

  if (fetchError && fetchError.code !== supabaseErrorCodes.RECORD_NOT_FOUND) {
    console.error('기존 레코드 있는지 확인 중 오류:', fetchError);
    throw new Error('기존 레코드 있는지 확인 중 오류가 발생했습니다.');
  }

  if (data) {
    await supabase
      .from('api_usage')
      .update({ count: data.count + 1, updated_at: new Date().toISOString() })
      .eq('id', data.id);

    return { limitCount: DAILY_API_REQUEST_LIMIT - (data.count + 1) };
  } else {
    await supabase.from('api_usage').insert({
      ip_address: ipAddress,
      count: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    return { limitCount: DAILY_API_REQUEST_LIMIT - 1 };
  }
}
