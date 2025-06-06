'use client';

import { useEffect } from 'react';

import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';

import supabase from '@config/supabase';

const RETRY_DELAY_MS = 2000;

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const next = searchParams.get('next') ?? 'history';

        const { data, error } = await supabase.auth.getSession();

        if (data.session && !error) {
          return router.replace(`${window.location.origin}/${next}`);
        }

        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));

        const { data: retryData, error: retryError } = await supabase.auth.getSession();

        if (retryData.session && !retryError) {
          return router.replace(`${window.location.origin}/${next}`);
        }

        router.replace('/');
      } catch (error) {
        console.error('인증 콜백 처리 중 에러:', error);
        router.replace('/');
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <Center h="100vh" bg="gray.50">
      <VStack gap="4">
        <Spinner size="xl" colorPalette="blue" />
        <Text textStyle="lg" color="gray.600">
          로그인 처리 중입니다...
        </Text>
        <Text textStyle="sm" color="gray.500">
          잠시만 기다려주세요
        </Text>
      </VStack>
    </Center>
  );
}
