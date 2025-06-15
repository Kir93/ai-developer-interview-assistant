import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { QuestionForm } from '@components/home/QuestionForm';

export default function Home() {
  const t = useTranslations('home');
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return (
    <Container maxW="container.md" py={10}>
      <VStack spaceY={6} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            {t('title')}
          </Heading>
          <Text color="gray.900" mb={4}>
            {t('subTitle')}
          </Text>
          <Text mt={2} fontSize="sm" color="gray.800" textAlign="center">
            {t('description')}
          </Text>
        </Box>
        <QuestionForm />
      </VStack>
    </Container>
  );
}
