'use client';

import { Box, Button } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import useAuth from '@utils/useAuth';

const HistoryLogoutSection = () => {
  const t = useTranslations('auth');
  const { signOut } = useAuth();
  return (
    <Box w="100%" textAlign="right">
      <Button size="lg" colorPalette="red" borderRadius="lg" onClick={signOut}>
        {t('logoutTitle')}
      </Button>
    </Box>
  );
};

export default HistoryLogoutSection;
