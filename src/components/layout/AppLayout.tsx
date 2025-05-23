import { PropsWithChildren } from 'react';

import { Container } from '@chakra-ui/react';

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
      {children}
    </Container>
  );
}
