import React from 'react';

import { Box } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const t = useTranslations('layout');
  return (
    <Box as="footer" w="full" px="21px" py="24px" fontSize="14px" textAlign="center">
      {t('footer')}
      <br />
      <a href="mailto:kir931028@gmail.com" target="_blank" rel="noreferrer">
        kir931028@gmail.com
      </a>
    </Box>
  );
};

export default Footer;
