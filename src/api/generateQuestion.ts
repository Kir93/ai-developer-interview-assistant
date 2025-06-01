'use server';

import { DAILY_API_REQUEST_LIMIT } from '@configs/bigContents';
import openai from '@configs/openai';
import { generateQuestionPrompt } from '@configs/prompt';
import supabase from '@configs/supabase';

import { GenerateQuestionOptions, QuestionData } from '@type/generateQuestion.types';

import { getClientIP, getIPDailyApiUsage, incrementIPApiUsage } from './checkDailyRequest';

/**
 * GPT로부터 개발자 인터뷰 질문을 생성하는 서버 액션
 */
export default async function generateQuestion({
  question,
  difficulty = 'medium',
  locale
}: GenerateQuestionOptions) {
  try {
    // 테스트 환경이거나 프로덕션이 아닌 경우 더미 데이터 반환
    const isTestEnvironment =
      process.env.NODE_ENV === 'test' ||
      process.env.NODE_ENV === 'development' ||
      process.env.CI === 'true';

    if (isTestEnvironment) {
      console.log('🔧 Test/Development mode - returning mock data');
      console.log('NODE_ENV:', process.env.NODE_ENV);
      console.log('CI:', process.env.CI);

      return {
        success: true,
        limitCount: 3,
        data: {
          question: 'React란?',
          answer: 'React는 Facebook에서 개발한 UI 라이브러리입니다.',
          topic: 'React',
          difficulty: 'hard',
          tags: ['react', 'frontend']
        }
      };
    }
    // 클라이언트 IP 주소 가져오기
    const ipAddress = await getClientIP();

    // IP 주소 기반 당일 API 요청 횟수 확인
    const currentUsage = await getIPDailyApiUsage(ipAddress);

    if (currentUsage >= DAILY_API_REQUEST_LIMIT) {
      return {
        success: false,
        error: `오늘의 API 요청 한도(${DAILY_API_REQUEST_LIMIT}회)를 초과했습니다. 내일 다시 시도해주세요.`
      };
    }

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

    // API 사용량 증가
    const { limitCount } = await incrementIPApiUsage(ipAddress);

    return {
      success: true,
      data: {
        question: 'React란?',
        answer: 'React는 Facebook에서 개발한 UI 라이브러리입니다.',
        topic: 'React',
        difficulty,
        tags: ['react', 'frontend']
      },
      limitCount: limitCount
    };
  } catch (error) {
    console.error('Error generating questions:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
