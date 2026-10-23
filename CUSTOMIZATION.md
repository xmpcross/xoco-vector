# Customization Guide

Use this guide when adapting Vector for a real blog.

## Site Settings

Edit [src/config/site.ts](./src/config/site.ts) first. It controls the site name, default metadata, canonical domain, language and date locale, contact details, social links, newsletter form settings, and navigation labels.

Update `siteConfig.siteUrl` before building for production. Canonical URLs, social image URLs, RSS, robots, sitemap, and JSON-LD all depend on it.

## Categories

Categories live in one place: [src/config/categories.ts](./src/config/categories.ts). Add, remove, or rename categories there, then update demo posts so every `category` frontmatter value still matches the allowed list.

The `categoryLayouts` map in the same file controls how each category archive presents its posts. Every category must use one of four layouts:

- `featured` shows the newest post as a large lead story, followed by a two-column card grid.
- `grid` uses the standard two-column image-card grid.
- `list` displays one image-led editorial post per row.
- `timeline` uses the changelog treatment intended for release posts.

Change a category’s value in the map to switch its layout; no route or component duplication is required. `releaseCategory` identifies the category used for changelog behavior elsewhere in the theme, while release posts themselves are detected through their `release` frontmatter.

The header's Categories dropdown and the footer's Sections list are generated from that same category list, so they update automatically.

The rest of the header menu is `mainNavigation` in [src/config/site.ts](./src/config/site.ts). Each item is either a link (`{ label, href }`) or a dropdown (`{ label, children }`, where `children` is a list of links). Desktop dropdowns open on hover or click and work from the keyboard (Enter, arrow keys, Escape). In the mobile menu they become collapsible groups.

## Newsletter

The newsletter form is intentionally provider-neutral. Configure it in `siteConfig.newsletter`:

```ts
newsletter: {
  enabled: true,
  action: "https://example.com/newsletter",
  method: "post",
  emailFieldName: "email",
}
```

The form submits only when `enabled` is `true` and `action` is non-empty. Otherwise the theme renders a clearly disabled preview. For production, connect it to your email provider or replace [src/components/NewsletterSignup.astro](./src/components/NewsletterSignup.astro) with provider-specific markup.

## Contact Form

The contact form follows the same safe-default pattern. Configure `siteConfig.contact` with `enabled: true`, a form endpoint in `action`, and the appropriate method. Until then, every control is disabled and no visitor data can be submitted. Contact email, office lines, and response time also live in `siteConfig`.

The default email, office, and social links are presentation-friendly examples. Replace them with real publication details before production; contact and newsletter form submission remain disabled until real endpoints are explicitly enabled.

## Ads

Ad placeholders use [src/components/AdSlot.astro](./src/components/AdSlot.astro). Replace the placeholder content with your ad provider, sponsorship copy, or static house ads. Keep labels visible and avoid layout shifts from late-loading third-party scripts.

## Images

Posts keep images next to each Markdown file. Each cover needs useful alt text and a credit URL. Astro optimizes theme-controlled images during build, but source images should still be reasonably sized before shipping a production site.

## Icons

Social and share icons are hosted locally in [src/icons/bootstrap](./src/icons/bootstrap) and rendered through [src/components/LocalIcon.astro](./src/components/LocalIcon.astro). To add a new social network, add its SVG to that folder, register it in `LocalIcon.astro`, then map the label in the component that renders the link.

The bundled SVGs come from Bootstrap Icons and include their MIT license notice in the icon folder.

## Pages

Core static pages live in [src/pages](./src/pages):

- `about.astro`
- `contact.astro`
- `privacy.astro`

Replace the starter copy with publication-specific masthead, advertising, privacy, and legal information.

The About page photo is [src/assets/images/about.jpg](./src/assets/images/about.jpg); replace the file and update the alt text and credit in `about.astro`.

## Search

Vector includes static, client-side search with no database or hosted search service. The search button in [src/components/SiteHeader.astro](./src/components/SiteHeader.astro) opens a command palette, while [src/pages/search.astro](./src/pages/search.astro) provides the full `/search/?q=...` results page.

At build time, [src/pages/search-index.json.ts](./src/pages/search-index.json.ts) generates `/search-index.json` from every published post. The index contains the post title, excerpt, category, author, tags, date, and URL; it does not contain the full article body. Opening the command palette loads this index on demand, ranks title matches ahead of supporting metadata matches, and displays up to seven results. The full search page reads the `q` URL parameter and renders all matching posts.

Search can be opened from the header or with `Ctrl + K` on Windows and Linux, `Command + K` on macOS, or `/` while focus is outside a form control. Use the arrow keys to move through command-palette results and `Escape` to close it.

This approach is a good fit for publications with a few hundred posts and should remain comfortable around 1,000 posts. Filtering that amount of metadata in the browser is inexpensive, and the command palette limits the number of rendered results. For a large archive, consider limiting or paginating the full search page because a broad query can otherwise render many result cards at once.

For several thousand pages, full-body search, multilingual search, or richer filtering, consider replacing the built-in index with [Pagefind](https://pagefind.app/). Pagefind indexes the generated `dist` HTML after `astro build`, splits its static index into chunks, and does not require a search server. It is intentionally not included as a default dependency; adopting it requires adding Pagefind to the build and deployment pipeline and connecting its API to the existing search interface.

Because Vector's built-in index is generated statically, newly published or edited posts become searchable after the next site build.

## MDX and Content Components

Posts can be written as `.md` or `.mdx`. Use `.mdx` when a post needs more than prose — the loader in [src/content.config.ts](./src/content.config.ts) picks up both extensions automatically, and everything else about a post (frontmatter, folder layout, cover image) stays the same.

Two components are available in every post without an import, wired through the `components` prop passed to `<Content />` in [src/pages/post/\[slug\].astro](./src/pages/post/[slug].astro):

- `<Callout type="note" | "tip" | "warning" | "danger" title="Optional label">` — an admonition box for asides, tips, and warnings. See [src/components/mdx/Callout.astro](./src/components/mdx/Callout.astro).
- `<CodeGroup>` with `<CodeGroupItem label="npm">` children — tabbed code samples for showing the same step across variants (package managers, languages, and so on). See [src/components/mdx/CodeGroup.astro](./src/components/mdx/CodeGroup.astro) and [CodeGroupItem.astro](./src/components/mdx/CodeGroupItem.astro). Fenced code blocks inside `<CodeGroupItem>` need a blank line before and after, since MDX only parses Markdown inside JSX when it is separated by blank lines.

See [src/content/posts/writing-richer-tutorials-with-mdx-components](./src/content/posts/writing-richer-tutorials-with-mdx-components/index.mdx) for a live example of both.

To add your own component, build it as a `.astro` file in `src/components/mdx`, import it in `[slug].astro`, and add it to the `mdxComponents` object there.

## Theme Tokens

Global colors, typography, borders, focus styles, dark mode, and motion rules live in [src/styles/global.css](./src/styles/global.css). Prefer editing tokens near the top of that file before changing individual components.

## Fonts

Vector self-hosts [Geist](https://vercel.com/font) (variable weight, OFL-licensed) from `public/fonts/geist`. `--font-sans` and `--font-display` use it for UI and headings; `--font-mono` uses Geist Mono for code. To swap typefaces, replace the `@font-face` rules and font tokens at the top of [src/styles/global.css](./src/styles/global.css) and drop your own font files in `public/fonts`.

## Scroll Reveal

Add the `reveal` class to any section to have it fade and rise into view as it scrolls into the viewport. Elements are fully visible without JavaScript or when the visitor has `prefers-reduced-motion` set; the reveal only activates progressively via a small IntersectionObserver script in [src/layouts/BaseLayout.astro](./src/layouts/BaseLayout.astro). Avoid adding it to hero or above-the-fold content, since it delays first paint of content visitors already see on load.
