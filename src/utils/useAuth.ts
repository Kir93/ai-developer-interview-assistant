'use client';

import { useEffect, useState } from 'react';

import { User } from '@supabase/supabase-js';
import { useLocale } from 'next-intl';

import supabase from '@configs/supabase';

/**
 * Supabase 인증 상태 관리 및 인증 작업을 위한 커스텀 React 훅입니다.
 *
 * 이 훅은 다음과 같은 포괄적인 인증 기능을 제공합니다:
 * - 현재 사용자 상태 관리
 * - Google OAuth 로그인
 * - 로그아웃 기능
 * - 인증 상태 모니터링
 *
 * 훅은 인증 상태 변경을 자동으로 구독하고 컴포넌트 생명주기 동안
 * 현재 사용자 세션을 유지합니다.
 *
 * @example
 * ```tsx
 * const { user, signInWithGoogle, signOut, isAuthenticated } = useAuth();
 *
 * if (isAuthenticated) {
 *   return <div>환영합니다, {user.email}님!</div>;
 * }
 *
 * return <button onClick={signInWithGoogle}>Google로 로그인</button>;
 * ```
 *
 * @returns {Object} 인증 상태와 메서드들
 * @returns {User | null} returns.user - Supabase의 현재 인증된 사용자 객체, 인증되지 않은 경우 null
 * @returns {() => Promise<void>} returns.signInWithGoogle - Google OAuth 로그인 플로우를 시작하는 비동기 함수
 * @returns {() => Promise<void>} returns.signOut - 현재 사용자를 로그아웃시키는 비동기 함수
 * @returns {boolean} returns.isAuthenticated - 사용자가 현재 인증되어 있는지를 나타내는 불린 값
 *
 * @throws {Error} Google 로그인이 실패할 경우 에러를 발생시킵니다
 * @throws {Error} 로그아웃 작업이 실패할 경우 에러를 발생시킵니다
 *
 * @requires supabase - 구성된 Supabase 클라이언트가 필요합니다
 * @requires next-intl - 리다이렉트 URL 구성을 위해 next-intl의 locale을 사용합니다
 *
 * @since 1.0.0
 */
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const locale = useLocale();

  useEffect(() => {
    // 현재 세션 확인
    const getSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    getSession();

    // Auth 상태 변경 리스너
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/${locale}/auth/callback`
      }
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return {
    user,
    signInWithGoogle,
    signOut,
    isAuthenticated: !!user
  };
};

export default useAuth;
