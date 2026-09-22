import { test, expect } from '@playwright/test';
import { SITE } from '../src/config';

test('home, pagination, theme persistence and search', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  const entries = await (await page.request.get('/search-index.json')).json();
  await page.goto('/');
  await expect(page.locator('.brand')).toHaveText('AI-build.cn');
  await expect(page).toHaveTitle('AI-build.cn · l-zhi');
  await expect(page.locator('.intro p')).toContainText('我是立之，一个热爱思考，充满好奇心的 AI builder');
  await expect(page.locator('.post-list > li')).toHaveCount(Math.min(SITE.pageSize, entries.length));
  await page.screenshot({ path: 'docs/screenshots/home-desktop.png', fullPage: true });
  await page.getByRole('button', { name: '切换明暗主题' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.screenshot({ path: 'docs/screenshots/home-dark.png', fullPage: true });
  await page.goto('/page/2/');
  await expect(page.locator('.post-list > li')).toHaveCount(Math.min(SITE.pageSize, entries.length - SITE.pageSize));
  await page.getByRole('link', { name: '下一页 →' }).click();
  await expect(page.locator('.post-list > li')).toHaveCount(Math.min(SITE.pageSize, entries.length - SITE.pageSize * 2));
  await page.goto('/search/');
  await page.getByRole('searchbox').fill('Docker');
  await expect(page.locator('#search-results')).toContainText('Docker 入门');
  await expect(page.locator('#search-results')).toContainText('初探Docker');
  await page.getByRole('searchbox').fill('不可能存在的关键词xyz');
  await expect(page.getByRole('status')).toContainText('没有找到');
  await page.goto('/search/?q=用户体验');
  await expect(page.locator('#search-results')).toContainText('麦当劳早餐与用户体验思考');
  await page.goto('/archives/');
  await expect(page.locator('.post-list > li')).toHaveCount(entries.length);
  expect(errors).toEqual([]);
});

test('article images, code, old URL, anchors and mobile widths', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.screenshot({ path: 'docs/screenshots/home-mobile.png', fullPage: true });
  const paths = ['/', '/tags/', '/search/', '/2016/02/26/docker-quick-start/', '/2022/06/12/mdlzcyyhtysk/', '/2014/01/05/Performance%20profiling%20with%20the%20Timeline/'];
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.goto('/2016/02/26/docker-quick-start/#获取基础镜像');
  await expect(page.locator('pre')).not.toHaveCount(0);
  await expect(page.locator('[id="获取基础镜像"]')).toHaveCount(1);
  await page.locator('.prose img').evaluateAll(images => images.forEach(image => image.setAttribute('loading', 'eager')));
  await expect.poll(() => page.locator('.prose img').evaluateAll(images => images.every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
  await page.goto('/2022/06/12/mdlzcyyhtysk/');
  await page.screenshot({ path: 'docs/screenshots/article-mobile.png', fullPage: true });
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('reading and system dark mode work without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, colorScheme: 'dark' });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4321/2022/06/12/mdlzcyyhtysk/');
  await expect(page.locator('.prose')).toContainText('服务的确定性');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(32, 38, 48)');
  await expect(page.getByRole('button', { name: '切换明暗主题' })).toBeHidden();
  await context.close();
});
