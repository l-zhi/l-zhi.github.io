// Exercises the author's real commands with a temporary post, then removes it.
import { execFileSync, spawn } from 'node:child_process';
import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'node:fs';
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const title = 'Writing workflow verification fixture';
const slug = `workflow-check-${process.pid}`;
const run = (args) => execFileSync('npm', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const output = run(['run', 'new:post', '--', slug, title]);
const file = output.match(/Created (.*\.md)/)[1];
let server;
let browser;
try {
  const original = readFileSync(file, 'utf8');
  const path = JSON.parse(original.match(/^permalink: (.+)$/m)[1]);
  assert.match(original, /draft: true/);
  assert.throws(() => run(['run', 'new:post', '--', slug, title]), 'Existing post must never be overwritten');
  server = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4322', '--ignore-lock'], { stdio: 'ignore', detached: true });
  for (let i = 0; i < 80; i++) {
    try { if ((await fetch('http://127.0.0.1:4322/')).ok) break; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:4322/${path}/`);
  assert.equal(await page.locator('h1').textContent(), title);
  assert.ok((await page.locator('.draft-notice').textContent()).includes('草稿预览'));
  await browser.close(); browser = undefined;
  process.kill(-server.pid, 'SIGTERM'); server = undefined;
  run(['run', 'build']);
  assert.ok(!existsSync(`dist/${path}/index.html`), 'Draft must have no production route');
  for (const index of ['search-index.json', 'rss.xml', 'sitemap.xml', 'archives/index.html', 'index.html']) assert.ok(!readFileSync(`dist/${index}`, 'utf8').includes(title), `Draft leaked into ${index}`);
  writeFileSync(file, original.replace('draft: true', 'draft: false'));
  run(['run', 'build']);
  assert.ok(existsSync(`dist/${path}/index.html`), 'Published post route missing');
  for (const index of ['search-index.json', 'rss.xml', 'archives/index.html', 'index.html']) assert.ok(readFileSync(`dist/${index}`, 'utf8').includes(title), `Published post missing from ${index}`);
  assert.ok(readFileSync('dist/sitemap.xml', 'utf8').includes(path));
  console.log('PASS: new post, overwrite protection, live draft preview, draft exclusion, and publish inclusion.');
} finally {
  if (browser) await browser.close();
  if (server) process.kill(-server.pid, 'SIGTERM');
  unlinkSync(file);
  run(['run', 'build']);
}
