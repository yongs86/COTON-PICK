import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum(['stories', 'guides', 'places']),
    category: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
      const parsed = new Date(`${value}T00:00:00Z`);
      return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0,10) === value;
    }, '실제 존재하는 날짜를 입력하세요.'),
    tags: z.array(z.string()),
    image: z.enum(['andu-01', 'andu-02', 'andu-03']),
    imageAlt: z.string(),
    sample: z.boolean().default(true),
    draft: z.boolean().default(false),
    location: z.string().optional(),
    checkedAt: z.string().optional(),
  }),
});
export const collections = { posts };
