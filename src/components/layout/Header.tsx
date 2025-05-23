import { BiUser } from 'react-icons/bi';

import { HStack, IconButton } from '@chakra-ui/react';
import Link from 'next/link';

import Logo from '@public/logo.png';

import NextImage from '@components/common/NextImage';

import SelectLocale from './SelectLocale';

interface IProps {
  type?: 'login' | 'common' | 'afterLogin';
}

export default function Header({ type = 'common' }: IProps) {
  return (
    <HStack as="header" w="100%" px="21px" py="12px" justifyContent="space-between">
      <Link href="/">
        <NextImage src={Logo} alt="logo" w="24px" h="24px" />
      </Link>
      <HStack gap="12px">
        {type !== 'login' && (
          <Link href="/login">
            <IconButton colorPalette="blue" variant="outline" aria-label="login" size="sm">
              <BiUser />
            </IconButton>
          </Link>
        )}
        <SelectLocale />
      </HStack>
    </HStack>
  );
}
