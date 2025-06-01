/** 난이도 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/** 질문 생성을 위한 타입 */
export type GenerateQuestionOptions = {
  question?: string;
  difficulty?: Difficulty;
  locale?: string;
};

/** 생성된 질문 타입 정의 */
export type QuestionData = {
  question: string;
  answer: string;
  topic: string;
  tags: string[];
  difficulty: Difficulty;
};

export type ResponseQuestionData = {
  success: boolean;
  error?: string;
  limitCount?: number; // API 요청 한도
  data?: QuestionData; // 생성된 질문 데이터
};
