import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Keep local UI checks out of production analytics and independent of its network.
  await page.route('https://hm.baidu.com/**', route => route.abort());
  await page.route('https://player.bilibili.com/**', route => route.fulfill({ contentType: 'text/html', body: '<html><body>Video player placeholder for local layout checks</body></html>' }));
});

test('compact project rail adapts to viewport and supports buttons and keyboard', async ({ page }) => {
  // Make scroll assertions deterministic instead of reversing an in-flight smooth animation.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const colorScheme of ['light', 'dark'] as const) {
    await page.emulateMedia({ colorScheme });
    for (const width of [1280, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await expect(page.locator('.site-header nav a').first()).toHaveText('AI项目');
      await expect(page.locator('.intro')).toHaveCount(0);
      await expect(page.locator('.project-tile h2')).toHaveText(['ai-rss', 'pith-wiki', 'mcc', '荔枝头像', '荔枝排班']);
      await expect(page.locator('.post-list > li')).toHaveCount(8);
      await expect.poll(() => page.locator('.project-tile img').evaluateAll(images => images.every(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0))).toBe(true);
      const bounds = await page.locator('.project-tile img').first().boundingBox();
      expect(bounds!.width).toBeLessThanOrEqual(160);
      expect(bounds!.height).toBeLessThanOrEqual(110);
      expect((await page.locator('.recent-projects').boundingBox())!.height).toBeLessThan(300);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const rail = page.locator('.project-rail');
      const overflow = await rail.evaluate(el => el.scrollWidth > el.clientWidth + 2);
      if (overflow) {
        await expect(page.getByRole('button', { name: '查看前面的项目' })).toBeDisabled();
        await page.getByRole('button', { name: '查看后面的项目' }).click();
        await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeGreaterThan(50);
        await rail.focus();
        await page.keyboard.press('ArrowLeft');
        await expect.poll(() => rail.evaluate(el => el.scrollLeft)).toBeLessThan(3);
        await rail.evaluate(el => { el.scrollLeft = el.scrollWidth; });
        await expect(page.getByRole('button', { name: '查看后面的项目' })).toBeDisabled();
      } else {
        await expect(page.locator('.project-scroll-buttons')).toBeHidden();
      }
    }
  }
  expect(errors).toEqual([]);
});

test('project index, details, GitHub addresses and sitemap connect correctly', async ({ page }) => {
  await page.goto('/');
  await page.locator('.project-tile-link').filter({ has: page.getByRole('heading', { name: 'pith-wiki', exact: true }) }).click();
  await expect(page).toHaveURL(/\/projects\/pith-wiki\/$/);
  await expect(page.locator('.project-repository .repository-label')).toHaveText('GitHub');
  await expect(page.locator('.project-repository .repository-address')).toHaveText('github.com/l-zhi/pith-wiki');
  await expect(page.locator('.project-repository')).toHaveAttribute('href', 'https://github.com/l-zhi/pith-wiki');
  await expect(page.locator('.project-repository')).toHaveAttribute('rel', 'noopener noreferrer');
  await page.getByRole('link', { name: '← 全部 AI 项目' }).click();
  await expect(page.locator('.project-list > li')).toHaveCount(5);
  await expect(page.locator('.site-header a[aria-current="page"]')).toHaveText('AI项目');
  const paths = ['/projects/', '/projects/ai-rss/', '/projects/pith-wiki/', '/projects/mcc/', '/projects/lizhi-avatar/', '/projects/lizhi-shifts/'];
  const sitemap = await (await page.request.get('/sitemap.xml')).text();
  for (const path of paths) {
    expect(sitemap).toContain(`https://ai-build.cn${path}`);
    for (const width of [1280, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      expect((await page.goto(path))?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  }
  await page.goto('/projects/mcc/');
  await expect(page.locator('.project-repository')).toHaveAttribute('href', 'https://github.com/l-zhi/mcc');
  await page.getByRole('link', { name: 'AI时代的「虚」与「实」 →' }).click();
  await expect(page.locator('.prose')).toContainText('ai-rss');
  for (const slug of ['ai-rss', 'lizhi-avatar', 'lizhi-shifts']) {
    await page.goto(`/projects/${slug}/`);
    await expect(page.locator('.project-repository')).toHaveCount(0);
  }
  expect((await (await page.request.get('/search-index.json')).json()).length).toBe(54);
});

test('projects remain readable and navigable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, colorScheme: 'dark' });
  const page = await context.newPage();
  await page.goto(`${baseURL}/`);
  await expect(page.locator('.project-tile-link')).toHaveCount(5);
  await expect(page.locator('.project-scroll-buttons')).toBeHidden();
  await page.locator('.project-tile-link').nth(2).click();
  await expect(page.getByRole('heading', { name: 'mcc', exact: true })).toBeVisible();
  await expect(page.locator('.project-repository')).toBeVisible();
  await context.close();
});

test('pith-wiki embeds an opt-in video and keeps its screenshot and external fallback', async ({ page }) => {
  await page.goto('/projects/pith-wiki/');
  const player = page.locator('.project-video iframe');
  await expect(player).toHaveAttribute('src', 'https://player.bilibili.com/player.html?bvid=BV14WJs6aEWE&page=1&autoplay=0');
  await expect(player).toHaveAttribute('title', /硬盘里/);
  await expect(player).toHaveAttribute('allowfullscreen', '');
  await expect(page.getByRole('link', { name: '在 B 站观看 · 4 分 21 秒 ↗' })).toHaveAttribute('href', 'https://www.bilibili.com/video/BV14WJs6aEWE/');
  await expect(page.locator('.project-sections .project-screenshot img')).toHaveAttribute('src', '/img/wechat/ae6c11825d77ba42e37d3a13.png');
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    const box = await player.boundingBox();
    expect(box!.width / box!.height).toBeCloseTo(16 / 9, 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.goto('/projects/mcc/');
  await expect(page.locator('iframe')).toHaveCount(0);
  await expect(page.locator('.project-hero .project-screenshot')).toHaveCount(1);
});
