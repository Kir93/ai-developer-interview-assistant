import { FC, ReactNode } from 'react';

import { Box, Container } from '@chakra-ui/react';

import Footer from './Footer';

interface IProps {
  children: ReactNode;
}

const AppLayout: FC<IProps> = ({ children }) => (
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
    <Box as="main" w="100%" px="21px" py="30px">
      {children}
    </Box>
    <Footer />
  </Container>
);

export default AppLayout;
