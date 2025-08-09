import { HistoryItem } from 'types/history.types';

// 임시 데이터 (나중에 API 연동 시 제거)
export const mockHistoryData: HistoryItem[] = [
  {
    id: '1',
    topic: 'React',
    difficulty: 'medium',
    question:
      'React에서 useEffect의 dependency array가 빈 배열일 때와 없을 때의 차이점을 설명해주세요.',
    answer:
      'useEffect의 dependency array가 빈 배열([])일 때는 컴포넌트가 마운트될 때 한 번만 실행됩니다. dependency array가 없을 때는 컴포넌트가 렌더링될 때마다 실행됩니다.',
    createdAt: '2024-01-15T10:30:00Z',
    userId: 'user1'
  },
  {
    id: '2',
    topic: 'JavaScript',
    difficulty: 'easy',
    question: 'JavaScript에서 var, let, const의 차이점은 무엇인가요?',
    answer:
      'var는 함수 스코프를 가지며 호이스팅됩니다. let과 const는 블록 스코프를 가지며, const는 재할당이 불가능합니다.',
    createdAt: '2024-01-14T15:20:00Z',
    userId: 'user1'
  },
  {
    id: '3',
    topic: 'Next.js',
    difficulty: 'hard',
    question: 'Next.js의 App Router와 Pages Router의 주요 차이점과 각각의 장단점을 설명해주세요.',
    answer:
      'App Router는 React 18의 서버 컴포넌트를 활용하여 더 나은 성능과 DX를 제공합니다. Pages Router는 기존 방식으로 더 안정적이지만 최신 기능을 활용하기 어렵습니다.',
    createdAt: '2024-01-13T09:45:00Z',
    userId: 'user1'
  }
];
