'use client';

import { BiHistory } from 'react-icons/bi';

import { IconButton } from '@chakra-ui/react';

import useAuth from '@utils/useAuth';

import { Link } from '@config/i18nRouting';

interface LinkNavProps {
  type?: 'login' | 'common' | 'afterLogin';
}

const LinkNav = ({ type }: LinkNavProps) => {
  const { isAuthenticated } = useAuth();
  if (type !== 'login')
    return (
      <Link href={isAuthenticated ? '/history' : '/login'}>
        <IconButton colorPalette="primary" variant="ghost" aria-label="history" size="sm">
          <BiHistory />
        </IconButton>
      </Link>
    );
};

export default LinkNav;
