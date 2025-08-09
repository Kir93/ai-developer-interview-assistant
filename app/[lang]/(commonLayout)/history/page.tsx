import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import HistoryPage from '@components/history/HistoryPage';

export default function History() {
  const t = useTranslations('history');
  return (
    <Container maxW="container.lg" py={10}>
      <VStack gap={8} align="stretch">
        {/* 헤더 */}
        <Box textAlign="center">
          <Heading
            as="h1"
            size="2xl"
            mb={3}
            bgGradient="linear(to-r, blue.500, purple.500)"
            bgClip="text"
          >
            {t('title')}
          </Heading>
          <Text color="gray.600" fontSize="lg" maxW="2xl" mx="auto">
            {t('description')}
          </Text>
        </Box>
        <HistoryPage />
      </VStack>
    </Container>
  );
}
