import { PropsWithChildren } from 'react';

import { Box, Container } from '@chakra-ui/react';

import Footer from './Footer';
import SelectLocale from './SelectLocale';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      minW={['414px', '768px', '768px', '1024px']}
      minH="100vh"
      m="auto auto 0"
      p="0"
    >
      <SelectLocale />
      <Box as="main" w="100%" px="21px" py="30px">
        {children}
      </Box>
      <Footer />
    </Container>
  );
}
