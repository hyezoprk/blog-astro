import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    categories: z.enum(['essays', 'reading', 'chips']),
    tags: z.union([z.string(), z.array(z.string())]).default('쪼가리'),
    description: z.union([z.string(), z.number()]).transform(v => String(v)).optional(),
    excerpt: z.union([z.string(), z.number()]).transform(v => String(v)).optional(),
    image: z.string().optional(),
    pinned: z.union([z.boolean(), z.string()]).transform(v => v === true || v === 'true').optional(),
    series: z.string().optional(),
  }),
});

export const collections = { posts };
