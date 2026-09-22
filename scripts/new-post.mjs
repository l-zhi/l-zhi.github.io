import { mkdirSync, writeFileSync } from 'node:fs';
const [slug, ...titleParts] = process.argv.slice(2);
if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !titleParts.length) {
  console.error('Usage: npm run new:post -- my-post 文章标题');
  process.exit(1);
}
const now = new Date();
const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
const file = `src/content/blog/${day}-${slug}.md`;
mkdirSync('src/content/blog', { recursive: true });
const metadata = { title: titleParts.join(' '), date: now.toISOString(), description: '请填写文章摘要。', permalink: `${day.replaceAll('-', '/')}/${slug}`, tags: [], categories: [], draft: true };
writeFileSync(file, `---\n${Object.entries(metadata).map(([key, val]) => `${key}: ${JSON.stringify(val)}`).join('\n')}\n---\n\n在这里开始写作。\n`, { flag: 'wx' });
console.log(`Created ${file}\nPreview with npm run dev; set draft: false to publish on the next deployment.`);
