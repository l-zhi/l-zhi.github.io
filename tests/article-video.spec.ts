import { test, expect } from '@playwright/test';

const videos = [
  {
    article: '/2026/10/28/ai-usage-gap-and-unknowns/',
    bvid: 'BV1QFxy63EKJ',
    title: 'AI 这么强，可惜大多数人都不会用',
    duration: '8:23',
    posterWidth: 1586,
    images: 8,
    sections: 8,
    bodyText: '同一个 AI，两个世界',
  },
  {
    article: '/2026/10/04/linux-and-personal-ai-agents/',
    bvid: 'BV1cnpZ6sEpb',
    title: 'AI时代，Linux 又杀回来了',
    duration: '7:50',
    posterWidth: 1920,
    images: 6,
    sections: 4,
    bodyText: '线上版小龙虾，和它背后的系统。',
  },
];

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/(?:hm\.baidu\.com|www\.googletagmanager\.com|(?:[a-z0-9-]+\.)?google-analytics\.com)\//, route => route.abort());
  // Check our layout and controls independently of the third-party player network.
  await page.route('https://player.bilibili.com/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Bilibili player stub</title>' }));
});

for (const video of videos) {
  const { article, bvid, title, duration, posterWidth, images, sections, bodyText } = video;
  const original = `https://www.bilibili.com/video/${bvid}/`;
  const player = `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&autoplay=`;
  const previewSelector = `.post-video-preview[data-video-bvid="${bvid}"]`;

  test(`${bvid}: article video precedes the original body and stays responsive without autoplay`, async ({ page }) => {
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(article);
      const frame = page.locator('.article-video iframe');
      await expect(frame).toHaveAttribute('src', `${player}0`);
      await expect(frame).toHaveAttribute('title', `B 站视频：${title}`);
      await expect(frame).toHaveAttribute('allowfullscreen', '');
      const bounds = (await frame.boundingBox())!;
      expect(bounds.width / bounds.height).toBeCloseTo(16 / 9, 1);
      expect(await page.locator('article').evaluate(el => {
        const children = Array.from(el.children);
        return children.indexOf(el.querySelector('.toc')!) < children.indexOf(el.querySelector('.article-video')!)
          && children.indexOf(el.querySelector('.article-video')!) < children.indexOf(el.querySelector('.prose')!);
      })).toBe(true);
      await expect(page.locator('.prose img')).toHaveCount(images);
      await expect(page.locator('.prose h2')).toHaveCount(sections);
      await expect(page.locator('.article-video figcaption')).toContainText(duration);
      await expect(page.locator('.article-video a')).toHaveAttribute('href', original);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    await page.goto('/2026/10/11/kongming-ai-agent-manager/');
    await expect(page.locator('.article-video')).toHaveCount(0);
    await page.goto('/archives/');
    await expect(page.locator('.post-video-preview')).toHaveCount(0);
  });

  test(`${bvid}: home preview opens on demand, supports keyboard and stops playback on every close`, async ({ page }) => {
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
        await expect(page.locator('.post-video-preview')).toHaveCount(videos.length);
        const preview = page.locator(previewSelector);
        await expect(preview).toHaveCount(1);
        await expect(preview).toHaveAttribute('href', original);
        await expect(preview).toHaveAttribute('aria-label', `播放视频：${title}（${duration}）`);
        await expect(preview.locator('.video-duration')).toHaveText(duration);
        await expect(page.locator('.has-video-preview').filter({ has: preview }).locator('h2 a')).toHaveAttribute('href', article);
        await preview.scrollIntoViewIfNeeded();
        await expect(preview.locator('img')).toHaveJSProperty('complete', true);
        await expect(preview.locator('img')).toHaveJSProperty('naturalWidth', posterWidth);
        await expect(page.locator('.video-dialog iframe')).toHaveCount(0);
        expect(requests).toEqual([]);
        expect((await preview.boundingBox())!.width).toBeLessThanOrEqual(184);
        await preview.focus();
        await page.keyboard.press('Enter');
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await expect(dialog.getByRole('heading')).toHaveText(title);
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
        const otherVideo = videos.find(item => item.bvid !== bvid)!;
        await page.locator(`.post-video-preview[data-video-bvid="${otherVideo.bvid}"]`).click();
        await expect(dialog.getByRole('heading')).toHaveText(otherVideo.title);
        await expect(dialog.locator('iframe')).toHaveAttribute('src', `https://player.bilibili.com/player.html?bvid=${otherVideo.bvid}&page=1&autoplay=1`);
        await expect(dialog.getByRole('link', { name: '在 B 站观看 ↗' })).toHaveAttribute('href', `https://www.bilibili.com/video/${otherVideo.bvid}/`);
        await dialog.getByRole('button', { name: '关闭视频' }).click();
        await expect(dialog).toBeHidden();
        await expect(page.locator('.video-dialog iframe')).toHaveCount(0);
        await expect(page).toHaveURL(/\/$/);
      }
    }
    expect(errors).toEqual([]);
  });

  test(`${bvid}: without JavaScript, video links and the article embed remain available`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await context.route(/https:\/\/(?:hm\.baidu\.com|www\.googletagmanager\.com|(?:[a-z0-9-]+\.)?google-analytics\.com)\//, route => route.abort());
    await context.route('https://player.bilibili.com/**', route => route.fulfill({ contentType: 'text/html', body: '<title>Bilibili player stub</title>' }));
    await context.route(original, route => route.fulfill({ contentType: 'text/html', body: '<title>Bilibili fallback stub</title>' }));
    const page = await context.newPage();
    await page.goto(`${baseURL}/`);
    await expect(page.locator('.video-dialog')).toBeHidden();
    const [popup] = await Promise.all([page.waitForEvent('popup'), page.locator(previewSelector).click()]);
    await popup.waitForLoadState();
    await expect(popup).toHaveURL(original);
    await popup.close();
    await page.goto(`${baseURL}${article}`);
    await expect(page.locator('.article-video iframe')).toHaveAttribute('src', `${player}0`);
    await expect(page.locator('.article-video a')).toHaveAttribute('href', original);
    await expect(page.locator('.prose')).toContainText(bodyText);
    await context.close();
  });
}
