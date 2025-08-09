import { defineCollection, z } from 'astro:content';

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    author: z.string(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  'articles': articlesCollection,
};
