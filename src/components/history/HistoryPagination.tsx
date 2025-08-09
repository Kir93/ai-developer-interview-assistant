import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import { Box, Button, HStack, IconButton, Text } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { HistoryPaginationType } from 'types/history.types';

interface HistoryPaginationProps {
  pagination: HistoryPaginationType;
  onPageChange: (page: number) => void;
}

export default function HistoryPagination({ pagination, onPageChange }: HistoryPaginationProps) {
  const t = useTranslations('history');

  const { page, totalPages, total, limit } = pagination;
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <Box py={8}>
      <HStack justify="space-between" align="center">
        <Text fontSize="sm" color="gray.600">
          {t('pagination.showing', {
            start: startItem,
            end: endItem,
            total: total
          })}
        </Text>

        <HStack gap={2}>
          <IconButton
            aria-label={t('pagination.previous')}
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
          >
            <BiChevronLeft />
          </IconButton>

          {getVisiblePages().map((pageNum, index) => (
            <Box key={index}>
              {pageNum === '...' ? (
                <Text px={2} color="gray.400">
                  ...
                </Text>
              ) : (
                <Button
                  variant={pageNum === page ? 'solid' : 'outline'}
                  colorPalette={pageNum === page ? 'blue' : 'gray'}
                  size="sm"
                  onClick={() => onPageChange(pageNum as number)}
                  minW="40px"
                >
                  {pageNum}
                </Button>
              )}
            </Box>
          ))}

          <IconButton
            aria-label={t('pagination.next')}
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            <BiChevronRight />
          </IconButton>
        </HStack>
      </HStack>
    </Box>
  );
}
