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

  // 다양한 헤더에서 IP 주소 확인 (프록시 서버가 있는 경우 대비)
  const forwardedFor = headersList.get('x-forwarded-for');
  const realIP = headersList.get('x-real-ip');

  // 로컬 개발 환경 확인
  const isDevelopment = process.env.NODE_ENV === 'development';

  if (forwardedFor) {
    // x-forwarded-for는 여러 IP가 쉼표로 구분되어 있을 수 있음
    const ip = forwardedFor.split(',')[0].trim();
    // 로컬 IP(::1, 127.0.0.1 등) 체크
    if (isDevelopment && (ip === '::1' || ip === '127.0.0.1')) {
      return 'development-ip';
    }
    return ip;
  }

  if (realIP) {
    // 로컬 IP(::1, 127.0.0.1 등) 체크
    if (isDevelopment && (realIP === '::1' || realIP === '127.0.0.1')) {
      return 'development-ip';
    }
    return realIP;
  }

  // 개발 환경이면 고정 문자열 반환
  if (isDevelopment) {
    return 'development-ip';
  }

  // 기본 fallback으로 unknown 반환
  return 'unknown';
}

/**
 * IP 주소 기반 당일 API 요청 횟수 확인
 * @param ipAddress IP 주소
 * @returns 당일 API 요청 횟수
 */
export async function getIPDailyApiUsage(ipAddress: string): Promise<number> {
  // 오늘 날짜의 시작과 끝 (00:00:00 ~ 23:59:59)
  const startOfDay = dayjs().startOf('day').toISOString();
  const endOfDay = dayjs().endOf('day').toISOString();

  if (ipAddress === 'development-ip' && process.env.NODE_ENV !== 'production') {
    // 개발 환경에서는 항상 1로 설정
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
  // 오늘 날짜의 시작과 끝
  const startOfDay = dayjs().startOf('day').toISOString();
  const endOfDay = dayjs().endOf('day').toISOString();

  // 기존 레코드가 있는지 확인
  const { data, error: fetchError } = await supabase
    .from('api_usage')
    .select('id, count')
    .eq('ip_address', ipAddress)
    .gte('created_at', startOfDay)
    .lte('created_at', endOfDay)
    .single();

  if (fetchError && fetchError.code !== supabaseErrorCodes.RECORD_NOT_FOUND) {
    console.error('API 사용량 조회 중 오류:', fetchError);
    throw new Error('API 사용량 조회 중 오류가 발생했습니다.');
  }

  if (data) {
    // 기존 레코드 업데이트
    await supabase
      .from('api_usage')
      .update({ count: data.count + 1, updated_at: new Date().toISOString() })
      .eq('id', data.id);

    return { limitCount: DAILY_API_REQUEST_LIMIT - (data.count + 1) };
  } else {
    // 새 레코드 생성
    await supabase.from('api_usage').insert({
      ip_address: ipAddress,
      count: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });

    return { limitCount: 1 };
  }
}
