import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { SITE } from './src/config.ts';

export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'always',
  markdown: { processor: satteri({ features: { smartPunctuation: false } }), shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, wrap: false } },
});
