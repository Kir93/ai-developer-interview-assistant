import { Box, HStack, Text, VStack } from '@chakra-ui/react';

import { QuestionData } from 'types/generateQuestion.types';

interface QuestionResponseCardProps {
  result: QuestionData;
  index: number;
}

export default function QuestionResponseCard({ result, index }: QuestionResponseCardProps) {
  return (
    <Box
      mt={4}
      p={5}
      borderRadius="md"
      bg="blue.50"
      borderWidth="1px"
      borderColor="blue.200"
      shadow="sm"
      data-testid={`result-${index}`}
    >
      <VStack align="stretch" gap={4}>
        <Box>
          <HStack mb={2}>
            <Text fontWeight="bold" color="blue.700" fontSize="lg" data-testid="question-label">
              Question:
            </Text>
            <Text fontWeight="medium" data-testid="question-content">
              {result.question}
            </Text>
          </HStack>
          <Box bg="white" p={4} borderRadius="md" borderWidth="1px" borderColor="blue.100">
            <Text whiteSpace="pre-wrap" color="gray.700" data-testid="answer-content">
              {result.answer}
            </Text>
          </Box>
        </Box>

        <HStack justify="space-between" wrap="wrap">
          <HStack>
            <Text fontWeight="bold" color="blue.700" data-testid="topic-label">
              Topic:
            </Text>
            <Text data-testid="topic-content">{result.topic}</Text>
          </HStack>
          <HStack>
            <Text fontWeight="bold" color="blue.700" data-testid="difficulty-label">
              Difficulty:
            </Text>
            <Box
              px={2}
              py={1}
              borderRadius="full"
              bg={
                result.difficulty === 'easy'
                  ? 'green.100'
                  : result.difficulty === 'medium'
                    ? 'yellow.100'
                    : 'red.100'
              }
              color={
                result.difficulty === 'easy'
                  ? 'green.700'
                  : result.difficulty === 'medium'
                    ? 'yellow.700'
                    : 'red.700'
              }
              fontSize="sm"
              data-testid="difficulty-content"
            >
              {result.difficulty}
            </Box>
          </HStack>
        </HStack>

        <Box>
          <Text fontWeight="bold" color="blue.700" mb={2} data-testid="tags-label">
            Tags:
          </Text>
          <HStack gap={2} wrap="wrap">
            {result.tags.map((tag, index) => (
              <Box
                key={index}
                px={3}
                py={1}
                borderRadius="full"
                bg="gray.100"
                color="gray.700"
                fontSize="sm"
                data-testid={`tag-${tag}`}
              >
                {tag}
              </Box>
            ))}
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
