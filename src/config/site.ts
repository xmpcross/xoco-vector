import { categories, categorySlug } from "./categories";

export const siteConfig = {
  name: "Vector",
  tagline: "Practical notes for builders shipping software",
  title: "Vector - A technical publishing and changelog Astro theme",
  description:
    "An Astro theme for technical articles, engineering tutorials, product updates, and changelog-style release notes.",
  siteUrl: "https://vector.xocoweb.workers.dev",
  authorName: "Andrei Alba",
  email: "hello@example.com",
  language: "en",
  dateLocale: "en-US",
  locale: "en_US",
  socialImage: "/og-image.png",
  adLabel: "Vector x Partner Note",
  newsletter: {
    enabled: false,
    action: "",
    method: "post",
    emailFieldName: "email",
    eyebrow: "Newsletter",
    title: "Build notes, straight to your inbox.",
    description:
      "One email every couple of weeks with new posts, release notes, and practical tools worth trying. No spam, unsubscribe anytime.",
  },
  contact: {
    enabled: false,
    action: "",
    method: "post",
    office: ["123 Release Lane", "Austin, TX 78701"],
    responseTime: "Usually within two business days.",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "TikTok", href: "https://www.tiktok.com" },
    { label: "YouTube", href: "https://www.youtube.com" },
    { label: "RSS", href: "/rss.xml" },
  ],
};

export interface NavLink {
  label: string;
  href: string;
}

export type NavItem = NavLink | { label: string; children: NavLink[] };

export const navigation: NavLink[] = categories.map((category) => ({
  label: category,
  href: `/category/${categorySlug(category)}/`,
}));

export const mainNavigation: NavItem[] = [
  { label: "Categories", children: navigation },
  { label: "About", href: "/about/" },
  { label: "Archive", href: "/posts/" },
  { label: "Contact", href: "/contact/" },
];
