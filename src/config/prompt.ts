import { GenerateQuestionOptions } from 'types/generateQuestion.types';

const promptTemplate = process.env.PROMPT_TEMPLATE ?? '';

export const generateQuestionPrompt = ({
  difficulty = 'medium',
  question = 'General developer interview',
  locale = 'en'
}: GenerateQuestionOptions) => {
  // 템플릿 내에서 ${difficulty}, ${question}을 실제 값으로 치환
  return promptTemplate
    .replace(/\${difficulty}/g, difficulty)
    .replace(/\${question}/g, question)
    .replace(/\${locale}/g, locale);
};
