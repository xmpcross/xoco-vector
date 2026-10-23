export const categories = [
  "Engineering",
  "AI",
  "Cloud",
  "Security",
  "Design Systems",
  "Guides",
  "Updates",
] as const;

export type Category = (typeof categories)[number];

export const releaseCategory: Category = "Updates";

/**
 * Controls how each category page presents its posts:
 * - "featured": a large lead story followed by a two-column card grid
 * - "grid": the existing two-column image-card grid
 * - "list": one image-led editorial story per row
 * - "timeline": the changelog treatment used by release posts
 */
export type CategoryLayout = "featured" | "grid" | "list" | "timeline";

export const categoryLayouts: Record<Category, CategoryLayout> = {
  Engineering: "featured",
  AI: "list",
  Cloud: "list",
  Security: "list",
  "Design Systems": "grid",
  Guides: "grid",
  Updates: "timeline",
};

export const categorySlug = (category: Category) =>
  category.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-");

export const categoryMeta: Record<Category, { description: string }> = {
  Engineering: {
    description:
      "Runtime notes, reliability tradeoffs, developer workflows, and the craft of shipping better software.",
  },
  AI: {
    description:
      "Practical coverage of AI product quality, evaluations, model behavior, and applied automation.",
  },
  Cloud: {
    description:
      "Infrastructure patterns for teams that care about cost, deploy speed, resilience, and operations.",
  },
  Security: {
    description:
      "Authentication, privacy, incident response, and security decisions explained for product teams.",
  },
  "Design Systems": {
    description:
      "Tokens, components, interface standards, and the systems work that keeps products coherent.",
  },
  Guides: {
    description:
      "Short, reusable playbooks for teams improving engineering habits and product delivery.",
  },
  Updates: {
    description:
      "Release notes, changelog entries, migration notes, and product improvements from the team.",
  },
};
