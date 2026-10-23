import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { categories } from "@/config/categories";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      category: z.enum(categories),
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      readMinutes: z.number().int().positive(),
      author: z.object({
        name: z.string(),
        role: z.string(),
      }),
      level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
      audience: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      cover: z.object({
        src: image(),
        alt: z.string(),
        creditName: z.string(),
        creditUrl: z.url(),
        showInPost: z.boolean().optional(),
      }),
      release: z
        .object({
          version: z.string(),
          type: z.enum(["major", "minor", "patch"]),
        })
        .optional(),
      trending: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
