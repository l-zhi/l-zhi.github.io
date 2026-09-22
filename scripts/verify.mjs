import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { load } from 'cheerio';
import assert from 'node:assert/strict';
const manifest = JSON.parse(readFileSync('docs/migration-manifest.json', 'utf8'));
const migrationAudit = process.argv.includes('--migration');
const hash = data => createHash('sha256').update(data).digest('hex');
const normalize = text => text.replace(/\s+/g, '');
const allFiles = dir => readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? allFiles(join(dir, entry.name)) : [join(dir, entry.name)]);
const errors = [];
const check = (label, fn) => { try { fn(); } catch (error) { errors.push(`${label}: ${error.message}`); } };
for (const asset of manifest.assets) check(asset.path, () => {
  const original = readFileSync(`public/${asset.path}`);
  if (migrationAudit) assert.equal(hash(original), asset.sha256, 'Public asset changed from migration baseline');
  assert.equal(hash(readFileSync(`dist/${asset.path}`)), hash(original), 'Built asset differs from public source');
});
for (const post of manifest.posts) check(post.route, () => {
  assert.ok(existsSync(post.contentFile), 'Markdown source missing');
  assert.ok(existsSync(`dist${post.route}index.html`), 'Legacy article route missing');
  if (!migrationAudit) return;
  const $ = load(readFileSync(`dist${post.route}index.html`, 'utf8'));
  assert.equal($('h1').first().text(), post.title, 'Title differs');
  const prose = $('.prose');
  const actual = normalize(prose.text());
  assert.ok(actual === post.bodyText, 'Article text differs from migration baseline');
  assert.deepEqual(prose.find('img').map((_, el) => $(el).attr('src')).get(), post.images, 'Image references changed');
  for (const code of post.code) assert.ok(prose.find('pre').toArray().some(el => $(el).text().trimEnd() === code.trimEnd()), 'Code block missing or altered');
  for (const anchor of post.anchors) assert.ok(prose.find('[id]').toArray().some(el => $(el).attr('id') === anchor), `Legacy anchor missing: ${anchor}`);
});
for (const listing of manifest.listingRoutes) check(listing.route, () => assert.ok(existsSync(`dist/${listing.route}/index.html`), 'Legacy listing route missing'));
const knownMissing = new Set(manifest.missingLocalReferences.map(ref => `${'/' + ref.source.replace(/index\.html$/, '')}|${ref.url}`));
let checkedLinks = 0;
for (const file of allFiles('dist').filter(f => f.endsWith('.html') && !/^dist\/(demo|vendors|fancybox)\//.test(f))) {
  check(file, () => {
    const $ = load(readFileSync(file, 'utf8'));
    assert.equal($('html').attr('lang'), 'zh-CN');
    assert.ok($('title').text().trim());
    assert.ok($('meta[name="description"]').attr('content'));
    assert.ok($('link[rel="canonical"]').attr('href'));
    assert.equal($('astro-island').length, 0, 'Unexpected framework hydration');
    const ids = $('[id]').map((_, el) => $(el).attr('id')).get();
    assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
    const source = '/' + file.replace(/^dist\//, '').replace(/index\.html$/, '');
    $('[href], [src]').each((_, el) => {
      for (const attr of ['href', 'src']) {
        const value = $(el).attr(attr); if (!value) continue;
        const url = new URL(value, `https://ai-build.cn${source}`);
        if (url.origin !== 'https://ai-build.cn') continue;
        if (knownMissing.has(`${source}|${value}`)) continue;
        const target = 'dist' + decodeURIComponent(url.pathname);
        const targetFile = existsSync(target) && !url.pathname.endsWith('/') ? target : join(target, 'index.html');
        assert.ok(existsSync(targetFile), `Broken ${attr}: ${value}`);
        if (url.hash && targetFile.endsWith('.html') && !targetFile.startsWith('dist/demo/')) {
          const targetDoc = load(readFileSync(targetFile, 'utf8'));
          const anchor = decodeURIComponent(url.hash.slice(1));
          // Retired comment widgets have no static equivalent.
          if (anchor !== 'comments') assert.ok(targetDoc('[id], [name]').toArray().some(node => targetDoc(node).attr('id') === anchor || targetDoc(node).attr('name') === anchor), `Missing fragment: ${value}`);
        }
        checkedLinks++;
      }
    });
  });
}
const index = JSON.parse(readFileSync('dist/search-index.json', 'utf8'));
const rss = load(readFileSync('dist/rss.xml', 'utf8'), { xmlMode: true });
check('Feeds', () => { assert.equal(rss('item').length, index.length); assert.ok(existsSync('dist/sitemap.xml')); assert.ok(existsSync('dist/robots.txt')); assert.ok(existsSync('dist/404.html')); });
check('Domain', () => assert.equal(readFileSync('dist/CNAME', 'utf8').trim(), 'ai-build.cn'));
check('Static output', () => assert.ok(!existsSync('dist/server'), 'Unexpected server output'));
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`PASS: ${manifest.posts.length} article URLs${migrationAudit ? ' (original text, code, images, anchors)' : ''}, ${manifest.assets.length} byte-identical assets, ${manifest.listingRoutes.length} legacy listing URLs, ${checkedLinks} internal references, RSS/search/sitemap and static output.`);
console.log(`Known legacy limitations: ${manifest.externalImages.length} external image references, ${manifest.missingLocalReferences.length} missing local references (see docs/migration-manifest.json).`);
