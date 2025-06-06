import { test, expect } from '@playwright/test';

test.describe('QuestionForm E2E', () => {
  test('정상 입력 → 성공 응답 → 결과 렌더링/성공 토스트', async ({ page }) => {
    await page.goto('/en');
    const input = page.getByTestId('question-input');
    await input.click();
    await input.fill('React란?');
    await expect(input).toHaveValue('React란?');
    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('question-label')).toBeVisible();
    await expect(page.getByTestId('question-content')).toBeVisible();
    await expect(page.getByTestId('answer-content')).toBeVisible();
    await expect(page.getByTestId('topic-label')).toBeVisible();
    await expect(page.getByTestId('topic-content')).toContainText('React');
    await expect(page.getByTestId('difficulty-label')).toBeVisible();
    await expect(page.getByTestId('difficulty-content')).toBeVisible();
    await expect(page.getByTestId('tag-react')).toBeVisible();
    await expect(page.getByTestId('tag-frontend')).toBeVisible();
  });

  test('난이도 변경 → generateQuestion에 반영', async ({ page }) => {
    await page.goto('/en');
    const input = page.getByTestId('question-input');
    await input.click();
    await input.fill('React란?');
    await expect(input).toHaveValue('React란?');

    // 난이도 변경 (hard로 설정)
    await page.getByTestId('difficulty-hard').click();

    const button = page.getByTestId('generate-button');
    await expect(button).toBeVisible({ timeout: 5000 });
    await expect(button).toBeEnabled({ timeout: 5000 });
    await button.click();

    // 결과에서 hard 난이도 확인
    await expect(page.getByTestId('difficulty-content')).toContainText('hard');
  });

  test('입력 없이 버튼 클릭 → generateQuestion 호출 및 결과 확인', async ({ page }) => {
    await page.goto('/en');
    await page.getByTestId('generate-button').click();
    await expect(page.getByTestId('question-label')).toBeVisible();
  });
});
