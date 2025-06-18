'use client';

import { FcGoogle } from 'react-icons/fc';

import { Button } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import useAuth from '@utils/useAuth';

export default function GoogleLoginButton() {
  const t = useTranslations('auth');
  const { signInWithGoogle } = useAuth();
  return (
    <Button w="full" variant="outline" size="lg" onClick={signInWithGoogle}>
      <FcGoogle /> {t('googleButtonText')}
    </Button>
  );
}
