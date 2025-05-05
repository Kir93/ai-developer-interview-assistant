'use server';

import openai from '@configs/openai';
import { generateQuestionPrompt } from '@configs/prompt';
import supabase from '@configs/supabase';

import { GenerateQuestionOptions, QuestionData } from '@type/generateQuestion.types';

/**
 * GPT로부터 개발자 인터뷰 질문을 생성하는 서버 액션
 */
export default async function generateQuestion({
  question,
  difficulty = 'medium',
  locale
}: GenerateQuestionOptions) {
  try {
    // GPT에 보낼 프롬프트 구성
    const prompt = generateQuestionPrompt({
      question,
      difficulty,
      locale
    });

    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4.1-nano'
    });

    // API 응답 추출
    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error('Failed to find content in API response.');
    }

    // JSON 파싱
    const result = JSON.parse(responseContent);

    if (!result.question) {
      return {
        success: false,
        error: 'Invalid topic. The generated question is not related to software development.'
      };
    }

    const questions: QuestionData = result.questions || result;

    // Supabase에 질문 저장
    const { error } = await supabase.from('questions').insert(questions);

    if (error) {
      throw new Error(`Supabase 저장 중 오류 발생: ${error?.message}`);
    }

    return {
      success: true,
      data: questions
    };
  } catch (error) {
    console.error('Error generating questions:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
