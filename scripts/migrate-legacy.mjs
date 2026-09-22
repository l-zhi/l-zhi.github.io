// One-time, reproducible import from the original Git tree. Never fetches remote content.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { load } from 'cheerio';
import Turndown from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
import GithubSlugger from 'github-slugger';
const slugger = new GithubSlugger();
const revision = '5a3cfdd98dfaef9afdafe88ce2fe44dc7214b932';
const files = execFileSync('git', ['ls-tree', '-r', '--name-only', '-z', revision]).toString().split('\0').filter(Boolean);
const read = path => execFileSync('git', ['show', `${revision}:${path}`], { maxBuffer: 32 * 1024 * 1024 });
const hash = data => createHash('sha256').update(data).digest('hex');
const save = (path, content) => { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content); };
if (existsSync('docs/migration-manifest.json')) throw new Error('Import already exists; refusing to overwrite migrated content.');
const td = new Turndown({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' });
td.use(gfm);
const escapeText = td.escape.bind(td);
td.escape = text => escapeText(text).replaceAll('<', '&lt;');
td.addRule('legacy-code', { filter: node => node.nodeName === 'FIGURE' && node.classList.contains('highlight'), replacement: (_, node) => {
  const lines = [...node.querySelectorAll('td.code .line')].map(line => line.textContent);
  const code = lines.length ? lines.join('\n') : node.querySelector('td.code pre')?.textContent || node.textContent;
  const language = node.getAttribute('class').split(/\s+/).find(c => c !== 'highlight') || 'text';
  const fence = '`'.repeat(Math.max(3, ...[...code.matchAll(/`+/g)].map(m => m[0].length + 1)));
  return `\n\n${fence}${language}\n${code}\n${fence}\n\n`;
}});
td.addRule('anchors', { filter: node => node.nodeName === 'A' && node.hasAttribute('id'), replacement: (_, node) => `\n\n<a id="${node.getAttribute('id').replaceAll('"', '&quot;')}"></a>\n\n` });
td.addRule('heading-ids', { filter: node => /^H[1-6]$/.test(node.nodeName), replacement: (content, node) => {
  const generatedId = slugger.slug(node.textContent.trim());
  return `\n\n${node.id && node.id !== generatedId ? `<a id="${node.id.replaceAll('"', '&quot;')}"></a>\n\n` : ''}${'#'.repeat(Number(node.nodeName[1]))} ${content}\n\n`;
} });
td.addRule('emphasis', { filter: ['strong', 'em', 'b', 'i'], replacement: (_, node) => node.outerHTML });
td.keep(['iframe', 'video', 'audio', 'object', 'embed', 'table']);
const manifest = { revision, posts: [], assets: [], listingRoutes: [], externalImages: [], missingLocalReferences: [] };
const postFiles = files.filter(f => /^20\d\d\/.*\/index\.html$/.test(f));
const listedRoutes = new Set();
for (const file of ['archives/index.html', 'archives/page/2/index.html']) {
  const $ = load(read(file).toString());
  $('.post-title-link').each((_, el) => listedRoutes.add(decodeURIComponent($(el).attr('href'))));
}
for (const file of postFiles) {
  slugger.reset();
  const $ = load(read(file).toString());
  const body = $('.post-body').first();
  let title = $('.post-title').first().text().trim();
  let tags = $('.post-tags a').map((_, el) => $(el).text().trim().replace(/^#\s*/, '')).get();
  const fixes = [];
  if (!title) {
    const metadata = body.find('p').first();
    title = metadata.text().match(/title:\s*(.*?)\s*date:/s)?.[1]?.trim() || file.split('/').at(-2);
    const tagHeading = body.find('h2').first();
    if (tagHeading.text().trim().startsWith('tags:')) {
      tags = [tagHeading.text().trim().replace(/^tags:\s*/, '')];
      // Keep the legacy anchor, but promote the broken frontmatter to real metadata.
      tagHeading.replaceWith(`<a id="${tagHeading.attr('id')}"></a>`);
      metadata.remove(); body.children('hr').first().remove();
      fixes.push('Recovered title/date/tags from accidentally rendered frontmatter.');
    }
  }
  body.find('a.headerlink').remove();
  body.find('img').each((_, img) => {
    const el = $(img); el.attr('loading', 'lazy'); el.attr('decoding', 'async');
    if (!el.attr('alt')) el.attr('alt', `${title}配图`);
  });
  const route = '/' + file.replace(/index\.html$/, '');
  const links = [];
  body.find('[href], [src]').each((_, el) => {
    for (const attr of ['href', 'src']) {
      const value = $(el).attr(attr); if (!value) continue;
      const url = new URL(value, `https://ai-build.cn${route}`);
      if (!['http:', 'https:'].includes(url.protocol)) continue;
      if (['ai-build.cn', 'l-zhi.com', 'www.l-zhi.com', 'l-zhi.github.io'].includes(url.hostname) && !url.port) {
        const path = decodeURIComponent(url.pathname).replace(/^\//, '');
        if (!path || files.includes(path) || files.includes(path.replace(/\/$/, '') + '/index.html')) {
          $(el).attr(attr, url.pathname + url.search + url.hash);
        } else manifest.missingLocalReferences.push({ source: file, url: value });
      }
      if (attr === 'src' && el.tagName === 'img' && !$(el).attr(attr).startsWith('/')) manifest.externalImages.push({ source: file, url: $(el).attr(attr) });
      links.push({ attribute: attr, value: $(el).attr(attr) });
    }
  });
  const date = $('time[datetime]').first().attr('datetime');
  const categories = $('.post-category a').map((_, el) => $(el).text().trim()).get();
  const description = body.find('p').filter((_, el) => $(el).text().trim().length > 30).first().text().replace(/\s+/g, ' ').trim().slice(0, 155);
  const contentFile = `src/content/blog/${file.replace(/\/index\.html$/, '')}.md`;
  const frontmatter = { title, date, description, permalink: route.slice(1, -1), tags, categories, draft: false, unlisted: !listedRoutes.has(route) };
  const markdown = td.turndown(body.html()).replace(/\n{3,}/g, '\n\n');
  save(contentFile, `---\n${Object.entries(frontmatter).map(([key, val]) => `${key}: ${JSON.stringify(val)}`).join('\n')}\n---\n\n${markdown}\n`);
  const code = body.find('figure.highlight').map((_, el) => $(el).find('td.code .line').map((_, line) => $(line).text()).get().join('\n')).get();
  const textBody = body.clone();
  textBody.find('td.gutter').remove();
  manifest.posts.push({ source: file, contentFile, route, title, date, fixes, bodyText: textBody.text().replace(/\s+/g, ''), code, images: body.find('img').map((_, el) => $(el).attr('src')).get(), anchors: body.find('[id]').map((_, el) => $(el).attr('id')).get(), links });
}
for (const file of files.filter(f => /^(img|images|demo|fancybox|vendors|css|js)\//.test(f) || f === 'CNAME')) {
  const data = read(file); save(`public/${file}`, data); manifest.assets.push({ path: file, sha256: hash(data) });
}
for (const file of files.filter(f => /^(archives|tags|categories|page)\/.*index\.html$/.test(f))) {
  const $ = load(read(file).toString());
  const routes = [...new Set($('a').map((_, el) => { const href = $(el).attr('href'); try { return decodeURIComponent(new URL(href, 'https://ai-build.cn').pathname); } catch { return ''; } }).get().filter(href => manifest.posts.some(p => p.route === href)))];
  manifest.listingRoutes.push({ route: file.replace(/\/index\.html$/, ''), posts: routes });
}
save('docs/migration-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Imported ${manifest.posts.length} posts, ${manifest.assets.length} assets, ${manifest.listingRoutes.length} listing routes.`);
console.log(`External images: ${manifest.externalImages.length}; existing missing local references: ${manifest.missingLocalReferences.length}`);
