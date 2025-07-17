'use client';

import { useState } from 'react';
import { FiActivity, FiBookOpen, FiTrendingUp } from 'react-icons/fi';

import { Box, Container, Text, VStack, SimpleGrid, Card, HStack, Icon } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { HistoryFiltersType, HistoryPaginationType } from 'types/history.types';

import { mockHistoryData } from '@config/mockData';

import HistoryFilters from './HistoryFilters';
import HistoryList from './HistoryList';
import HistoryPagination from './HistoryPagination';

export default function HistoryPage() {
  const t = useTranslations('history');

  const [filters, setFilters] = useState<HistoryFiltersType>({
    search: '',
    difficulty: 'all',
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const [pagination, setPagination] = useState<HistoryPaginationType>({
    page: 1,
    limit: 10,
    total: mockHistoryData.length,
    totalPages: Math.ceil(mockHistoryData.length / 10)
  });

  // 필터링된 데이터 (실제 구현 시 API 호출로 대체)
  const filteredData = mockHistoryData.filter((item) => {
    const matchesSearch =
      !filters.search ||
      item.topic.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.question.toLowerCase().includes(filters.search.toLowerCase());

    const matchesDifficulty =
      filters.difficulty === 'all' || item.difficulty === filters.difficulty;

    return matchesSearch && matchesDifficulty;
  });

  // 정렬
  const sortedData = [...filteredData].sort((a, b) => {
    let comparison = 0;

    switch (filters.sortBy) {
      case 'date':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'topic':
        comparison = a.topic.localeCompare(b.topic);
        break;
      case 'difficulty':
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        break;
    }

    return filters.sortOrder === 'desc' ? -comparison : comparison;
  });

  const handleFiltersChange = (newFilters: HistoryFiltersType) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }));
  };

  return (
    <Container maxW="container.lg" py={10}>
      <VStack gap={8} align="stretch">
        {/* 통계 섹션 */}
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={6}>
          <Card.Root
            p={6}
            bg="gradient-to-br from-blue-50 to-blue-100"
            borderWidth="1px"
            borderColor="blue.200"
          >
            <Card.Body>
              <HStack gap={4}>
                <Box p={3} borderRadius="lg" bg="blue.500" color="white" _dark={{ bg: 'blue.400' }}>
                  <Icon fontSize="xl">
                    <FiBookOpen />
                  </Icon>
                </Box>
                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color="blue.700">
                    {mockHistoryData.length}
                  </Text>
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    {t('stats.totalQuestions')}
                  </Text>
                </Box>
              </HStack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            p={6}
            bg="gradient-to-br from-green-50 to-green-100"
            borderWidth="1px"
            borderColor="green.200"
          >
            <Card.Body>
              <HStack gap={4}>
                <Box
                  p={3}
                  borderRadius="lg"
                  bg="green.500"
                  color="white"
                  _dark={{ bg: 'green.400' }}
                >
                  <Icon fontSize="xl">
                    <FiTrendingUp />
                  </Icon>
                </Box>
                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color="green.700">
                    {Math.round(
                      (mockHistoryData.filter((item) => item.difficulty === 'hard').length /
                        mockHistoryData.length) *
                        100
                    )}
                    %
                  </Text>
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    {t('stats.hardDifficulty')}
                  </Text>
                </Box>
              </HStack>
            </Card.Body>
          </Card.Root>

          <Card.Root
            p={6}
            bg="gradient-to-br from-purple-50 to-purple-100"
            borderWidth="1px"
            borderColor="purple.200"
          >
            <Card.Body>
              <HStack gap={4}>
                <Box
                  p={3}
                  borderRadius="lg"
                  bg="purple.500"
                  color="white"
                  _dark={{ bg: 'purple.400' }}
                >
                  <Icon fontSize="xl">
                    <FiActivity />
                  </Icon>
                </Box>
                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color="purple.700">
                    {new Set(mockHistoryData.map((item) => item.topic)).size}
                  </Text>
                  <Text fontSize="sm" color="gray.600" fontWeight="medium">
                    {t('stats.diverseTopics')}
                  </Text>
                </Box>
              </HStack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {/* 필터 */}
        <HistoryFilters filters={filters} onFiltersChange={handleFiltersChange} />

        {/* 리스트 */}
        <HistoryList items={sortedData} loading={false} />

        {/* 페이지네이션 */}
        <HistoryPagination pagination={pagination} onPageChange={handlePageChange} />
      </VStack>
    </Container>
  );
}
