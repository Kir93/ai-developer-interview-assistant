/** 난이도 */
export type Difficulty = 'easy' | 'medium' | 'hard';

/** 질문 생성을 위한 타입 */
export type GenerateQuestionOptions = {
  question?: string;
  difficulty?: Difficulty;
};

/** 생성된 질문 타입 정의 */
export type QuestionData = {
  question: string;
  answer: string;
  topic: string;
  tags: string[];
  difficulty: Difficulty;
};
