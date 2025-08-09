export interface HistoryItem {
  id: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  answer: string;
  createdAt: string;
  userId: string;
}

export type HistoryFiltersType = {
  search: string;
  difficulty: 'all' | 'easy' | 'medium' | 'hard';
  sortBy: 'date' | 'topic' | 'difficulty';
  sortOrder: 'asc' | 'desc';
};

export type HistoryPaginationType = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
