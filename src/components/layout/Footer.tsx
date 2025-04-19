import React from 'react';

import { Box } from '@chakra-ui/react';

const Footer: React.FC = () => {
  return (
    <Box as="footer" w="full" px="21px" py="24px" fontSize="14px" textAlign="center">
      If you have any changes or additional tools you would like to see, please contact us at the
      email address below.
      <br />
      <a href="mailto:kir931028@gmail.com" target="_blank" rel="noreferrer">
        kir931028@gmail.com
      </a>
    </Box>
  );
};

export default Footer;
