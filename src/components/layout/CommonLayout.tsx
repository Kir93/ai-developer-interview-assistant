import { Box } from '@chakra-ui/react';

import AppLayout from './AppLayout';
import Footer from './Footer';
import Header from './header/Header';

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <Header />
      <Box as="main" w="100%" px="21px" py="30px">
        {children}
      </Box>
      <Footer />
    </AppLayout>
  );
}
