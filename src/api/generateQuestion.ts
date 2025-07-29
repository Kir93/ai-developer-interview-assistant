'use server';

import {
  GenerateQuestionOptions,
  QuestionData,
  ResponseQuestionData
} from 'types/generateQuestion.types';

import { getClientIP } from '@utils/getIp';

import { DAILY_API_REQUEST_LIMIT } from '@config/bigContents';
import openai from '@config/openai';
import { generateQuestionPrompt } from '@config/prompt';
import supabase from '@config/supabase';

import { getIPDailyApiUsage, incrementIPApiUsage } from './checkDailyRequest';

/**
 * GPT로부터 개발자 인터뷰 질문을 생성하는 서버 액션
 */
export default async function generateQuestion({
  question,
  difficulty = 'medium',
  locale
}: GenerateQuestionOptions): Promise<ResponseQuestionData> {
  try {
    const ipAddress = await getClientIP();
    const currentUsage = await getIPDailyApiUsage(ipAddress);

    if (currentUsage >= DAILY_API_REQUEST_LIMIT) {
      return {
        success: false,
        limitCount: 0,
        error: `오늘의 API 요청 한도(${DAILY_API_REQUEST_LIMIT}회)를 초과했습니다. 내일 다시 시도해주세요.`
      };
    }

    const prompt = generateQuestionPrompt({
      question,
      difficulty,
      locale
    });

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4.1-nano'
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error('Failed to find content in API response.');
    }

    const result = JSON.parse(responseContent);

    if (!result.question) {
      return {
        success: false,
        error: 'Invalid topic. The generated question is not related to software development.'
      };
    }

    const questions: QuestionData = result.questions || result;

    const { error } = await supabase.from('questions').insert(questions);

    if (error) {
      throw new Error(`Supabase 저장 중 오류 발생: ${error?.message}`);
    }

    const { limitCount } = await incrementIPApiUsage(ipAddress);

    return {
      success: true,
      data: questions,
      limitCount
    };
  } catch (error) {
    console.error('Error generating questions:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
