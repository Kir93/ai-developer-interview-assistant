import { useState } from 'react';

import {
  Box,
  HStack,
  Input,
  VStack,
  Card,
  Text,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  createListCollection
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { HistoryFilters } from '@type/history.types';

interface HistoryFiltersProps {
  filters: HistoryFilters;
  onFiltersChange: (filters: HistoryFilters) => void;
}

export default function HistoryFiltersComponent({ filters, onFiltersChange }: HistoryFiltersProps) {
  const homeT = useTranslations('home');
  const t = useTranslations('history');
  const [searchInput, setSearchInput] = useState(filters.search || '');

  const difficultyOptions = createListCollection({
    items: [
      { value: 'all', label: t('filters.all') },
      { value: 'easy', label: homeT('difficulty.easy') },
      { value: 'medium', label: homeT('difficulty.medium') },
      { value: 'hard', label: homeT('difficulty.hard') }
    ]
  });

  const sortOptions = createListCollection({
    items: [
      { value: 'date', label: t('filters.date') },
      { value: 'topic', label: t('item.topic') },
      { value: 'difficulty', label: t('item.difficulty') }
    ]
  });

  // 안전한 기본값 설정
  const safeFilters = {
    search: filters.search || '',
    difficulty: filters.difficulty || 'all',
    sortBy: filters.sortBy || 'date',
    sortOrder: filters.sortOrder || 'desc'
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    onFiltersChange({ ...safeFilters, search: value });
  };

  const handleDifficultyChange = (value: string) => {
    onFiltersChange({
      ...safeFilters,
      difficulty: value as HistoryFilters['difficulty']
    });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({
      ...safeFilters,
      sortBy: value as HistoryFilters['sortBy']
    });
  };

  return (
    <Card.Root
      p={6}
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="xl"
      shadow="sm"
    >
      <Card.Body>
        <VStack gap={6} align="stretch">
          {/* 검색 입력 */}
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={3}>
              🔍 {t('filters.search')}
            </Text>
            <Input
              placeholder={t('filters.searchPlaceholder')}
              value={searchInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSearchChange(e.target.value)
              }
              bg="gray.50"
              borderColor="gray.300"
              borderRadius="lg"
              _hover={{ borderColor: 'blue.400', bg: 'white' }}
              _focus={{ borderColor: 'blue.500', bg: 'white', shadow: '0 0 0 1px blue.500' }}
              size="lg"
            />
          </Box>

          {/* 필터 옵션들 */}
          <HStack gap={6} wrap="wrap" justify="space-between">
            <Box flex={1} minW="200px">
              <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={3}>
                📊 {t('filters.difficulty')}
              </Text>
              <SelectRoot
                key={`difficulty-${safeFilters.difficulty}`}
                collection={difficultyOptions}
                defaultValue={[safeFilters.difficulty]}
                onValueChange={(details: any) => handleDifficultyChange(details.value[0])}
              >
                <SelectTrigger
                  bg="gray.50"
                  borderColor="gray.300"
                  borderRadius="lg"
                  _hover={{ borderColor: 'blue.400', bg: 'white' }}
                  fontSize="lg"
                >
                  <SelectValueText placeholder={t('filters.difficulty')} />
                </SelectTrigger>
                <SelectContent borderRadius="lg" shadow="lg">
                  {difficultyOptions.items.map((option) => (
                    <SelectItem key={option.value} item={option.value} _hover={{ bg: 'blue.50' }}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Box>

            <Box flex={1} minW="200px">
              <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={3}>
                📅 {t('filters.date')}
              </Text>
              <SelectRoot
                key={`sortBy-${safeFilters.sortBy}`}
                collection={sortOptions}
                defaultValue={[safeFilters.sortBy]}
                onValueChange={(details: any) => handleSortChange(details.value[0])}
              >
                <SelectTrigger
                  bg="gray.50"
                  borderColor="gray.300"
                  borderRadius="lg"
                  _hover={{ borderColor: 'blue.400', bg: 'white' }}
                  fontSize="lg"
                >
                  <SelectValueText placeholder={t('filters.date')} />
                </SelectTrigger>
                <SelectContent borderRadius="lg" shadow="lg">
                  {sortOptions.items.map((option) => (
                    <SelectItem key={option.value} item={option.value} _hover={{ bg: 'blue.50' }}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectRoot>
            </Box>
          </HStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
