// /app/api/mocks/mock.ts

import { NextResponse } from 'next/server';

// POST 요청 핸들러 추가
export const POST = async () => {
  try {
    return NextResponse.json(
      {
        success: true,
        data: {
          question: 'React란?',
          answer: 'React는 Facebook에서 개발한 UI 라이브러리입니다.',
          topic: 'React',
          difficulty: 'medium',
          tags: ['react', 'frontend']
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 });
  }
};
