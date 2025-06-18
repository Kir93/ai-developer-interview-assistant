export interface HistoryItem {
  id: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  answer: string;
  createdAt: string;
  userId: string;
}

export interface HistoryFilters {
  search: string;
  difficulty: 'all' | 'easy' | 'medium' | 'hard';
  sortBy: 'date' | 'topic' | 'difficulty';
  sortOrder: 'asc' | 'desc';
}

export interface HistoryPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
