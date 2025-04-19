import { test, expect } from '@playwright/test';

// Layout 렌더링 및 메타데이터, Provider, 외부 스크립트 테스트

test.describe('App Layout', () => {
  test('레이아웃의 주요 구조와 메타데이터가 정상적으로 렌더링된다', async ({ page }) => {
    await page.goto('/');
    console.log('ENV:', process.env.NODE_ENV);
    // 메타데이터 확인
    await expect(page).toHaveTitle(/AI Developer Interview Assistant/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Get the latest development trends and interview tips delivered to your inbox./
    );

    // Google Analytics, Tag Manager 스크립트 확인
    await expect(
      page.locator('script[src*="googlesyndication.com/pagead/js/adsbygoogle.js"]')
    ).toHaveCount(1);
    await expect(page.locator('script[id="google-fc-present"]')).toHaveCount(1);

    /*
     * 주요 Provider/레이아웃 구조 확인 (AppLayout, Toaster 등)
     * AppLayout 내 main 태그와 Footer 존재 확인
     */
    await expect(page.locator('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible(); // Footer
    // Toaster 컴포넌트가 렌더링되는지 확인 (id, class 등으로 구분)
    await expect(page.locator('[data-sonner-toast]')).toHaveCount(0); // 기본적으로 토스트는 없음
  });
});
