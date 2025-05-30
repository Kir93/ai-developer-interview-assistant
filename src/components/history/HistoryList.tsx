import { Box, Button, Card, Container, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { HistoryItem } from '@type/history.types';

import HistoryLogoutSection from './HistoryLogoutSection';

interface HistoryListProps {
  items: HistoryItem[];
  loading?: boolean;
}

export default function HistoryList({ items, loading = false }: HistoryListProps) {
  const homeT = useTranslations('home');
  const t = useTranslations('history');

  if (loading) {
    return (
      <VStack gap={4}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Card.Root key={index} w="100%" p={6} bg="white" borderWidth="1px" borderColor="gray.200">
            <VStack align="stretch" gap={4}>
              <HStack justify="space-between">
                <HStack gap={3}>
                  <Box w="20" h="4" bg="gray.200" borderRadius="md" />
                  <Box w="16" h="4" bg="gray.200" borderRadius="md" />
                  <Box w="12" h="6" bg="gray.200" borderRadius="full" />
                </HStack>
                <Box w="20" h="8" bg="gray.200" borderRadius="md" />
              </HStack>
              <Box w="full" h="6" bg="gray.200" borderRadius="md" />
              <Box w="3/4" h="16" bg="gray.200" borderRadius="md" />
            </VStack>
          </Card.Root>
        ))}
      </VStack>
    );
  }

  if (items.length === 0) {
    return (
      <Container maxW="container.lg" py={20}>
        <VStack gap={8} textAlign="center">
          <Box>
            <Box fontSize="6xl" mb={4}>
              📝
            </Box>
            <Heading size="lg" color="gray.600" mb={3}>
              {t('empty.title')}
            </Heading>
            <Text color="gray.500" fontSize="lg" maxW="md" mx="auto">
              {t('empty.description')}
            </Text>
          </Box>
          <Link href="/">
            <Button
              colorPalette="blue"
              size="lg"
              px={8}
              py={6}
              borderRadius="xl"
              _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              transition="all 0.2s"
            >
              {t('empty.buttonText')}
            </Button>
          </Link>
        </VStack>
      </Container>
    );
  }

  return (
    <VStack gap={4}>
      {items.map((item) => (
        <Card.Root
          key={item.id}
          w="100%"
          p={6}
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="xl"
          _hover={{
            shadow: 'lg',
            borderColor: 'blue.300',
            transform: 'translateY(-2px)'
          }}
          cursor="pointer"
          transition="all 0.2s ease-in-out"
        >
          <VStack align="stretch" gap={5}>
            {/* 헤더 - 메타 정보 */}
            <HStack justify="space-between" align="flex-start" wrap="wrap" gap={3}>
              <HStack gap={4} wrap="wrap" align="center">
                <HStack gap={2} align="center">
                  <Box color="gray.400" fontSize="sm">
                    📅
                  </Box>
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">
                    {new Date(item.createdAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </Text>
                </HStack>

                <HStack gap={2} align="center">
                  <Box color="gray.400" fontSize="sm">
                    🏷️
                  </Box>
                  <Text fontSize="sm" color="blue.600" fontWeight="semibold">
                    {item.topic}
                  </Text>
                </HStack>

                <Box
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="bold"
                  bg={
                    item.difficulty === 'easy'
                      ? 'green.100'
                      : item.difficulty === 'medium'
                        ? 'yellow.100'
                        : 'red.100'
                  }
                  color={
                    item.difficulty === 'easy'
                      ? 'green.800'
                      : item.difficulty === 'medium'
                        ? 'yellow.800'
                        : 'red.800'
                  }
                  border="1px solid"
                  borderColor={
                    item.difficulty === 'easy'
                      ? 'green.200'
                      : item.difficulty === 'medium'
                        ? 'yellow.200'
                        : 'red.200'
                  }
                >
                  {homeT(`difficulty.${item.difficulty}`).toUpperCase()}
                </Box>
              </HStack>
            </HStack>

            {/* 질문 내용 */}
            <Box>
              <Text fontWeight="bold" fontSize="lg" color="gray.800" lineHeight="1.6" mb={3}>
                {item.question}
              </Text>
              <Box
                p={4}
                bg="gray.50"
                borderRadius="lg"
                borderLeft="4px solid"
                borderLeftColor="blue.400"
              >
                <Text color="gray.700" lineHeight="1.7">
                  {item.answer}
                </Text>
              </Box>
            </Box>
          </VStack>
        </Card.Root>
      ))}
      <HistoryLogoutSection />
    </VStack>
  );
}
