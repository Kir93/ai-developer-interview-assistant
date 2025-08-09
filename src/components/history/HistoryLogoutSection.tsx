'use client';

import { useState } from 'react';

import { Box, Button } from '@chakra-ui/react';
import { debounce } from 'es-toolkit';
import { useTranslations } from 'next-intl';

import useAuth from '@utils/useAuth';

import { useRouter } from '@config/i18nRouting';

const HistoryLogoutSection = () => {
  const router = useRouter();
  const t = useTranslations('auth');
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onClickSignOut = debounce(async () => {
    if (isLoading) return;
    setIsLoading(true);
    signOut()
      .then(() => {
        router.replace('/');
      })
      .catch((error) => {
        console.error('로그아웃 실패:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, 300);
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
