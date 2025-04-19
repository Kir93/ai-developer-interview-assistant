'use client';

import { useState } from 'react';

import { Box, Button, HStack, Input, RadioGroup, Text, VStack } from '@chakra-ui/react';

import { Difficulty, QuestionData } from '@type/generateQuestion.types';

import generateQuestion from '@api/generateQuestion';

import { toaster } from '@components/ui/toaster';

const difficultyList = [
  { label: 'hard', value: 'hard' },
  { label: 'medium', value: 'medium' },
  { label: 'easy', value: 'easy' }
];

export function QuestionForm() {
  const [text, setText] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [result, setResult] = useState<QuestionData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    const generatedResult = await generateQuestion({
      question: text,
      difficulty
    });

    setIsLoading(false);

    toaster.create({
      description: generatedResult.success
        ? 'Question generated successfully!'
        : generatedResult.error,
      type: generatedResult.success ? 'success' : 'error'
    });

    if (generatedResult.success) {
      setText('');
      setResult(generatedResult.data || null);
    }
  };

  return (
    <Box p={6} borderRadius="lg" boxShadow="md" bg="white" aria-label="Question Form">
      <VStack spaceY={4}>
        <Input
          type="text"
          name="text"
          placeholder="input your question developer interview"
          size="lg"
          borderColor="gray.300"
          _hover={{ borderColor: 'blue.500' }}
          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
          aria-label="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <RadioGroup.Root
          colorPalette="primary"
          defaultValue="medium"
          value={difficulty}
          onValueChange={(e) => setDifficulty(e.value as Difficulty)}
        >
          <HStack gap={4}>
            {difficultyList.map((item) => (
              <RadioGroup.Item key={item.value} value={item.value}>
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </HStack>
        </RadioGroup.Root>
        <Button
          loading={isLoading}
          colorPalette="primary"
          size="lg"
          width="full"
          aria-label={text ? 'Generate Answer' : 'Generate with AI Recommendation'}
          onClick={handleSubscribe}
        >
          {text ? 'Generate Answer' : 'Generate with AI Recommendation'}
        </Button>
      </VStack>
      <Box mt={4}>
        {result && (
          <Box
            mt={4}
            p={5}
            borderRadius="md"
            bg="blue.50"
            borderWidth="1px"
            borderColor="blue.200"
            shadow="sm"
          >
            <VStack align="stretch" gap={4}>
              <Box>
                <HStack mb={2}>
                  <Text fontWeight="bold" color="blue.700" fontSize="lg">
                    Question:
                  </Text>
                  <Text fontWeight="medium">{result.question}</Text>
                </HStack>
                <Box bg="white" p={4} borderRadius="md" borderWidth="1px" borderColor="blue.100">
                  <Text whiteSpace="pre-wrap" color="gray.700">
                    {result.answer}
                  </Text>
                </Box>
              </Box>

              <HStack justify="space-between" wrap="wrap">
                <HStack>
                  <Text fontWeight="bold" color="blue.700">
                    Topic:
                  </Text>
                  <Text>{result.topic}</Text>
                </HStack>
                <HStack>
                  <Text fontWeight="bold" color="blue.700">
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
                  >
                    {result.difficulty}
                  </Box>
                </HStack>
              </HStack>

              <Box>
                <Text fontWeight="bold" color="blue.700" mb={2}>
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
                    >
                      {tag}
                    </Box>
                  ))}
                </HStack>
              </Box>
            </VStack>
          </Box>
        )}
      </Box>
    </Box>
  );
}
