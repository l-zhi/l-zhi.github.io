import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1),
    date: z.coerce.date(),
    description: z.string().min(1),
    permalink: z.string().regex(/^[^/?#]+(?:\/[^/?#]+)*$/).refine(value => !value.split('/').some(part => ['.', '..'].includes(part)), 'Invalid path'),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    unlisted: z.boolean().default(false),
  }),
});
export const collections = { blog };
