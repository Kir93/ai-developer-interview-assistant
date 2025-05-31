'use client';

import { useState } from 'react';

import { Box, Button } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { useRouter } from 'src/i18n/routing';

import useAuth from '@utils/useAuth';

const HistoryLogoutSection = () => {
  const router = useRouter();
  const t = useTranslations('auth');
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onClickSignOut = async () => {
    if (isLoading) return; // 중복 클릭 방지
    setIsLoading(true);
    await signOut()
      .then(() => {
        router.replace('/');
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Box w="100%" textAlign="right">
      <Button
        loading={isLoading}
        size="lg"
        colorPalette="red"
        borderRadius="lg"
        onClick={onClickSignOut}
      >
        {t('logoutTitle')}
      </Button>
    </Box>
  );
};

export default HistoryLogoutSection;
