import type { CollectionEntry } from "astro:content";
import { categories, categorySlug, type Category } from "@/config/categories";
import { siteConfig } from "@/config/site";

export type Post = CollectionEntry<"posts">;
export { categories, categorySlug, type Category };

export const categoryFromSlug = (slug: string): Category | undefined =>
  categories.find((category) => categorySlug(category) === slug);

export const tagSlug = (tag: string) =>
  tag
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const authorSlug = (author: string) =>
  author
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const postSlug = (post: Post) => post.id.replace(/\/index$/, "");

export const postHref = (post: Post) => `/post/${postSlug(post)}/`;

export const byNewest = (a: Post, b: Post) => b.data.date.getTime() - a.data.date.getTime();

export const visiblePosts = (posts: Post[]) =>
  posts.filter((post) => !post.data.draft).sort(byNewest);

export const excludePosts = (posts: Post[], excluded: Post[]) => {
  const excludedIds = new Set(excluded.map((post) => post.id));
  return posts.filter((post) => !excludedIds.has(post.id));
};

export const getByCategory = (posts: Post[], category: Category, limit?: number) => {
  const list = visiblePosts(posts).filter((post) => post.data.category === category);
  return typeof limit === "number" ? list.slice(0, limit) : list;
};

export const getTrending = (posts: Post[], limit = 5) => {
  const visible = visiblePosts(posts);
  const trending = visible.filter((post) => post.data.trending);
  return [...trending, ...visible.filter((post) => !post.data.trending)].slice(0, limit);
};

export const getRelated = (posts: Post[], current: Post, limit = 3) =>
  visiblePosts(posts)
    .filter((post) => post.id !== current.id)
    .sort((a, b) => {
      const categoryScore =
        Number(b.data.category === current.data.category) -
        Number(a.data.category === current.data.category);
      return categoryScore || byNewest(a, b);
    })
    .slice(0, limit);

export const getAllTags = (posts: Post[]) =>
  Array.from(new Set(visiblePosts(posts).flatMap((post) => post.data.tags))).sort((a, b) =>
    a.localeCompare(b),
  );

export const getAllAuthors = (posts: Post[]) =>
  Array.from(
    visiblePosts(posts)
      .reduce((authorMap, post) => {
        const slug = authorSlug(post.data.author.name);
        const current = authorMap.get(slug);
        authorMap.set(slug, {
          name: post.data.author.name,
          role: post.data.author.role,
          posts: [...(current?.posts ?? []), post],
        });
        return authorMap;
      }, new Map<string, { name: string; role: string; posts: Post[] }>())
      .entries(),
  )
    .map(([slug, author]) => ({ slug, ...author }))
    .sort((a, b) => a.name.localeCompare(b.name));

export const formatDate = (date: Date, style: "short" | "long" = "short") =>
  new Intl.DateTimeFormat(siteConfig.dateLocale, {
    month: style === "short" ? "short" : "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
