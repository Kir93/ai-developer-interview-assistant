import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

import { QuestionForm } from '@components/home/QuestionForm';

export default function Home() {
  return (
    <Container maxW="container.md" py={10}>
      <VStack spaceY={6} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>
            AI Developer Interview Assistant
          </Heading>
          <Text color="gray.600" mb={4}>
            Get the latest development trends and interview tips delivered to your inbox.
          </Text>
          <Text mt={2} fontSize="sm" color="gray.500" textAlign="center">
            Have a question about tech interviews? Enter your topic and let AI generate a practice
            question and answer for you.
          </Text>
        </Box>
        <QuestionForm aria-label="Question Form" />
      </VStack>
    </Container>
  );
}
