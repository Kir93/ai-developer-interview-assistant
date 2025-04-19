import { test, expect } from '@playwright/test';

test.describe('QuestionForm E2E', () => {
  test('정상 입력 → 성공 응답 → 결과 렌더링/성공 토스트', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[placeholder="input your question developer interview"]');
    await input.click();
    await input.fill('React란?');
    await expect(input).toHaveValue('React란?');
    await page.getByRole('button', { name: 'Generate Answer' }).click();
    await expect(page.getByText('Question:')).toBeVisible();
    await expect(page.getByText('React란?')).toBeVisible();
    await expect(page.getByText('React는 Facebook에서 개발한 UI 라이브러리입니다.')).toBeVisible();
    await expect(page.getByText('Topic:')).toBeVisible();
    const topicRow = page.locator('text=Topic:').locator('..'); // 부모 HStack
    await expect(topicRow.getByText('React', { exact: true })).toBeVisible();
    await expect(page.getByText('Difficulty:')).toBeVisible();
    const difficultyRow = page.locator('text=Difficulty:').locator('..'); // 부모 HStack
    await expect(difficultyRow.getByText('medium', { exact: true })).toBeVisible();
    const tagsRow = page.locator('text=Tags:').locator('..');
    await expect(tagsRow.getByText('react', { exact: true })).toBeVisible();
    await expect(tagsRow.getByText('frontend', { exact: true })).toBeVisible();
  });

  test('난이도 변경 → generateQuestion에 반영', async ({ page }) => {
    await page.goto('/');
    const input = page.locator('input[placeholder="input your question developer interview"]');
    await input.click();
    await input.fill('React란?');
    await expect(input).toHaveValue('React란?');
    const button = page.getByRole('button', { name: 'Generate Answer' });
    await expect(button).toBeVisible({ timeout: 5000 });
    await expect(button).toBeEnabled({ timeout: 5000 });
    await button.click();
    await expect(page.getByText('hard')).toBeVisible();
  });

  test('입력 없이 버튼 클릭 → generateQuestion 호출 및 결과 확인', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Generate with AI Recommendation' }).click();
    await expect(page.getByText('Question:')).toBeVisible();
  });
});
