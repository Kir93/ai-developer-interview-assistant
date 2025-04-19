import { test, expect } from '@playwright/test';

// Home 페이지 렌더링 테스트

test.describe('Home Page', () => {
  test('페이지가 정상적으로 렌더링되고 주요 요소가 보인다', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /AI Developer Interview Assistant/i })
    ).toBeVisible();
    await expect(
      page.getByText(/Get the latest development trends and interview tips/i)
    ).toBeVisible();
    await expect(page.getByLabel('Question Form')).toBeVisible();
  });
});
