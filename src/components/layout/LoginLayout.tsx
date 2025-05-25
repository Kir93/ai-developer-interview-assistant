import { Center } from '@chakra-ui/react';

import AppLayout from './AppLayout';
import Footer from './Footer';
import Header from './Header';

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <Header type="login" />
      <Center as="main" w="100%" px="21px" py="30px">
        {children}
      </Center>
      <Footer />
    </AppLayout>
  );
}
