'use client';

import { BiHistory } from 'react-icons/bi';

import { IconButton } from '@chakra-ui/react';
import { useLocale } from 'next-intl';

import useAuth from '@utils/useAuth';

import { Link } from '@config/i18nRouting';

interface LinkNavProps {
  type?: 'login' | 'common' | 'afterLogin';
}

const LinkNav = ({ type }: LinkNavProps) => {
  const { isAuthenticated } = useAuth();
  const locale = useLocale();
  if (type !== 'login')
    return (
      <Link href={isAuthenticated ? '/history' : '/login'}>
        <IconButton
          colorPalette="primary"
          variant="ghost"
          aria-label={locale === 'ko' ? '기록' : 'history'}
          size="sm"
        >
          <BiHistory />
        </IconButton>
      </Link>
    );
};

export default LinkNav;
