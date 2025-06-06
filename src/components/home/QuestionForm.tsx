'use client';

import { useState } from 'react';

import { Box, Button, HStack, Input, RadioGroup, Text, VStack } from '@chakra-ui/react';
import { useLocale, useTranslations } from 'next-intl';

import { DUMMY_QUESTION } from '@configs/bigContents';
import { Difficulty, QuestionData } from 'types/generateQuestion.types';

import generateQuestion from '@api/generateQuestion';

import QuestionResponseCard from '@components/ui/QuestionResponseCard';
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
          <QuestionResponseCard key={result.question + index} result={result} index={index} />
        ))}
      </Box>
    </Box>
  );
}
