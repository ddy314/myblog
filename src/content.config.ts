import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    category: z.string(),
    tags: z.array(z.string()),
    coverFrom: z.string(),
    coverTo: z.string(),
  }),
});

export const collections = {
  posts,
};
