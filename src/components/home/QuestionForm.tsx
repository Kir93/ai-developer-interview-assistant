'use client';

import { useState } from 'react';

import { Box, Button, HStack, Input, RadioGroup, Text, VStack } from '@chakra-ui/react';
import { useLocale, useTranslations } from 'next-intl';

import { DUMMY_QUESTION } from '@configs/bigContents';

import { Difficulty, QuestionData } from '@type/generateQuestion.types';

import generateQuestion from '@api/generateQuestion';

import { toaster } from '@components/ui/toaster';

export function QuestionForm() {
  const locale = useLocale();
  const t = useTranslations('home');

  const difficultyList = [
    { label: t('difficulty.hard'), value: 'hard' },
    { label: t('difficulty.medium'), value: 'medium' },
    { label: t('difficulty.easy'), value: 'easy' }
  ];

  const [text, setText] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [results, setResults] = useState<QuestionData[] | null>(null);
  const [limitCount, setLimitCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);

    let generatedResult = DUMMY_QUESTION;

    if (process.env.NODE_ENV !== 'production') {
      generatedResult = await generateQuestion({
        question: text,
        difficulty,
        locale
      });
    }

    setIsLoading(false);

    toaster.create({
      description: generatedResult.success
        ? 'Question generated successfully!'
        : generatedResult.error,
      type: generatedResult.success ? 'success' : 'error'
    });

    if (generatedResult.success) {
      setText('');
      setResults((prev) => [generatedResult?.data as QuestionData, ...(prev || [])]);
      setLimitCount(generatedResult.limitCount || null);
    }
  };

  return (
    <Box p={6} borderRadius="lg" boxShadow="md" bg="white" aria-label="Question Form">
      <VStack gap="4">
        <Input
          type="text"
          name="text"
          placeholder={t('inputPlaceholder')}
          size="lg"
          borderColor="gray.300"
          _hover={{ borderColor: 'blue.500' }}
          _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
          aria-label="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          data-testid="question-input"
        />

        <RadioGroup.Root
          colorPalette="primary"
          defaultValue="medium"
          value={difficulty}
          onValueChange={(e) => setDifficulty(e.value as Difficulty)}
          data-testid="difficulty-radio-group"
        >
          <HStack gap={4}>
            {difficultyList.map((item) => (
              <RadioGroup.Item
                key={item.value}
                value={item.value}
                data-testid={`difficulty-${item.value}`}
              >
                <RadioGroup.ItemHiddenInput />
                <RadioGroup.ItemIndicator />
                <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
              </RadioGroup.Item>
            ))}
          </HStack>
        </RadioGroup.Root>
        <Button
          loading={isLoading}
          aria-disabled={isLoading}
          colorPalette="primary"
          size="lg"
          width="full"
          aria-label={text ? t('generateButtonText.text') : t('generateButtonText.recommend')}
          onClick={handleSubscribe}
          data-testid="generate-button"
        >
          {text ? t('generateButtonText.text') : t('generateButtonText.recommend')}
        </Button>
        {limitCount !== null && (
          <Text fontSize="sm" color="gray.950" mt="0" data-testid="limit-count">
            {t('limitText.text')}:{' '}
            <Text as="span" color="red.500" fontWeight="bold">
              {limitCount}
              {t('limitText.unit')}
            </Text>
          </Text>
        )}
      </VStack>
      <Box mt={4}>
        {results?.map((result, index) => (
          <Box
            key={result.question + index}
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
                  <Text
                    fontWeight="bold"
                    color="blue.700"
                    fontSize="lg"
                    data-testid="question-label"
                  >
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
        ))}
      </Box>
    </Box>
  );
}
