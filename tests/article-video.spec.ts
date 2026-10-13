import { test, expect } from '@playwright/test';

const article = '/2026/10/04/linux-and-personal-ai-agents/';
const original = 'https://www.bilibili.com/video/BV1cnpZ6sEpb/';
const player = 'https://player.bilibili.com/player.html?bvid=BV1cnpZ6sEpb&page=1&autoplay=';

test.beforeEach(async ({ page }) => {
  await page.route('https://hm.baidu.com/**', route => route.abort());
  // Check our layout and controls independently of the third-party player network.
  await page.route('https://player.bilibili.com/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Bilibili player stub</title>' }));
});

test('article video precedes the original body and stays responsive without autoplay', async ({ page }) => {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(article);
    const frame = page.locator('.article-video iframe');
    await expect(frame).toHaveAttribute('src', `${player}0`);
    await expect(frame).toHaveAttribute('title', 'B 站视频：AI时代，Linux 又杀回来了');
    await expect(frame).toHaveAttribute('allowfullscreen', '');
    const bounds = (await frame.boundingBox())!;
    expect(bounds.width / bounds.height).toBeCloseTo(16 / 9, 1);
    expect(await page.locator('article').evaluate(el => {
      const children = Array.from(el.children);
      return children.indexOf(el.querySelector('.toc')!) < children.indexOf(el.querySelector('.article-video')!)
        && children.indexOf(el.querySelector('.article-video')!) < children.indexOf(el.querySelector('.prose')!);
    })).toBe(true);
    await expect(page.locator('.prose img')).toHaveCount(6);
    await expect(page.locator('.prose h2')).toHaveCount(4);
    await expect(page.locator('.article-video a')).toHaveAttribute('href', original);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.goto('/2026/10/11/kongming-ai-agent-manager/');
  await expect(page.locator('.article-video')).toHaveCount(0);
  await page.goto('/archives/');
  await expect(page.locator('.post-video-preview')).toHaveCount(0);
});

test('home preview opens on demand, supports keyboard and stops playback on every close', async ({ page }) => {
  const requests: string[] = [];
  const errors: string[] = [];
  page.on('request', request => { if (request.url().startsWith('https://player.bilibili.com/')) requests.push(request.url()); });
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1440, 390, 320]) {
    for (const colorScheme of ['light', 'dark'] as const) {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme });
      requests.length = 0;
      await page.goto('/');
      const preview = page.locator('.post-video-preview');
      await expect(preview).toHaveCount(1);
      await expect(preview).toHaveAttribute('href', original);
      await expect(page.locator('.has-video-preview h2 a')).toHaveAttribute('href', article);
      await expect(preview.locator('img')).toHaveJSProperty('complete', true);
      await expect(preview.locator('img')).toHaveJSProperty('naturalWidth', 1920);
      await expect(page.locator('.video-dialog iframe')).toHaveCount(0);
      expect(requests).toEqual([]);
      expect((await preview.boundingBox())!.width).toBeLessThanOrEqual(184);
      await preview.focus();
      await page.keyboard.press('Enter');
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.locator('iframe')).toHaveAttribute('src', `${player}1`);
      await expect(dialog.getByRole('link', { name: '在 B 站观看 ↗' })).toHaveAttribute('href', original);
      await expect(dialog.getByRole('button', { name: '关闭视频' })).toBeFocused();
      await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
      const bounds = (await dialog.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.keyboard.press('Escape');
      await expect(dialog).toBeHidden();
      await expect(page.locator('.video-dialog iframe')).toHaveCount(0);
      await expect(preview).toBeFocused();
      await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
      await preview.click();
      await dialog.getByRole('button', { name: '关闭视频' }).click();
      await expect(dialog).toBeHidden();
      await expect(page.locator('.video-dialog iframe')).toHaveCount(0);
      await preview.click();
      await page.mouse.click(2, 2);
      await expect(dialog).toBeHidden();
      await expect(page.locator('.video-dialog iframe')).toHaveCount(0);
      await expect(page).toHaveURL(/\/$/);
    }
  }
  expect(errors).toEqual([]);
});

test('without JavaScript, video links and the article embed remain available', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await context.route('https://hm.baidu.com/**', route => route.abort());
  await context.route('https://player.bilibili.com/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Bilibili player stub</title>' }));
  await context.route(original, route => route.fulfill({ contentType: 'text/html', body: '<title>Bilibili fallback stub</title>' }));
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page.locator('.video-dialog')).toBeHidden();
  const [popup] = await Promise.all([page.waitForEvent('popup'), page.locator('.post-video-preview').click()]);
  await popup.waitForLoadState();
  await expect(popup).toHaveURL(original);
  await popup.close();
  await page.goto(`${baseURL}${article}`);
  await expect(page.locator('.article-video iframe')).toHaveAttribute('src', `${player}0`);
  await expect(page.locator('.article-video a')).toHaveAttribute('href', original);
  await expect(page.locator('.prose')).toContainText('线上版小龙虾，和它背后的系统。');
  await context.close();
});
