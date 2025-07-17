'use client';

import { Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import useAuth from '@utils/useAuth';

import { Link } from '@config/i18nRouting';

export default function LoginPrompt() {
  const t = useTranslations('home');
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return null;
  return (
    <Text mt={2} fontSize="sm" color="gray.600" textAlign="center">
      {t('loginPrompt')}
      <Link href="/login">
        <Text as="span" color="blue.600" fontWeight="bold" ml="8px">
          {t('loginLinkText')}
        </Text>
      </Link>
    </Text>
  );
}
