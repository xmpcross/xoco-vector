# Changelog

All notable changes to Vector are documented here.

## 1.5.1 - 2026-10-21

- Updated Astro to 7.4.1 and other dependencies.
- Added `AGENTS.md` with guidance for AI coding assistants.
- Files check out with LF line endings on every platform.

## 1.5.0 - 2026-10-07

- Added active-section highlighting to the article table of contents.
- Added a Categories dropdown to the header navigation, alongside About, Archive, and Contact links.
- Added a collapsible Categories group to the mobile menu.
- Added a wide photo to the About page.
- Removed the "More in" category list from the article sidebar.
- Removed the ADR post type.
- Fixed missing bullets and numbers in article lists.
- Updated Astro to 7.3.6 and the MDX integration to 8.0.3.
- Updated Sharp, Vite, Prettier, `@astrojs/markdown-remark`, and `@types/node` to their latest compatible releases.
- Updated transitive dependencies (`http-cache-semantics`, `source-map-js`) to resolve reported advisories.

## 1.4.1 - 2026-09-16

- Updated Astro to 7.3.2 and the MDX integration to 8.0.1.
- Updated Sharp, Vite, `@astrojs/markdown-remark`, `@astrojs/sitemap`, `@astrojs/check`, and `@types/node` to their latest releases.
- Updated transitive build dependencies (`fast-uri`, `js-yaml`, `smol-toml`, `svgo`) to resolve all reported advisories; `npm audit` reports no vulnerabilities.

## 1.4.0 - 2026-08-13

- Replaced the header search popover with a centered, responsive command palette featuring ranked live results and keyboard shortcuts.
- Fixed query initialization on the dedicated search page and documented the built-in search architecture, practical scale, and optional Pagefind upgrade path.
- Simplified the search palette to just the input until the reader types, removing the latest-articles list and placeholder copy, and deferring the search index fetch to the first keystroke.
- Fixed the paginated archive at `/posts/` rendering as an empty page on mobile: the scroll-reveal observer used a ratio-based threshold that a section taller than the viewport can never satisfy, leaving the single-column post grid stuck at zero opacity.
- Updated transitive build dependencies (`fast-uri`, `js-yaml`, `nanoid`, `postcss`) to resolve all reported advisories; `npm audit` reports no vulnerabilities.

## 1.3.0 - 2026-07-23

- Rebalanced the color system around neutral gray surfaces, borders, and typography in both light and dark modes, reserving violet for restrained accents and interactive states.
- Widened post-page title headers so long headings wrap into fewer, better-balanced lines without changing the article reading width.
- Added configurable category archive layouts for featured stories, two-column image grids, image-led editorial lists, and release timelines.
- Refined category list cards with squarer responsive images, wider naturally wrapped titles, subtle thumbnail rounding, and cleaner divider-free spacing across archives and side rails.
- Simplified release-note pages by removing the table of contents, redundant content and related-section rules, and the "All posts" link from "More updates."
- Removed the internal horizontal separators between article details, tags, and sharing controls while retaining the sidebar's vertical rule.

## 1.2.0 - 2026-07-23

- Updated Astro, Sharp, and supporting build dependencies and resolved all reported dependency advisories.
- Added the documented article table of contents to the sticky article sidebar.
- Made newsletter and contact forms safely disabled until real provider endpoints are configured.
- Centralized date locale, release-category behavior, contact details, social defaults, and remaining publication-name metadata.
- Improved mobile-menu focus containment, current-page navigation semantics, search form controls, system color-scheme handling, and article sharing semantics.
- Corrected buyer-facing preview links and visual descriptions.

## 1.1.0 - 2026-07-17

- Self-hosted the Geist typeface (variable weight, plus Geist Mono for code) in place of the system-font stack, with a preload for the primary weight.
- Renamed unused color tokens.
- Reworked the sticky header to hide on scroll down and reappear on scroll up, with a subtle border (no shadow) once scrolled instead of a permanent divider line.
- Introduced a border-radius scale and applied it across various elements.
- Removed the decorative accent-colored borders.
- Added a `.reveal` scroll-in animation utility (fade and rise), built on a single shared `IntersectionObserver`. Content stays fully visible without JavaScript and is skipped entirely when the visitor prefers reduced motion.
- Reworked the accent palette to a violet hue derived from a single base color, with borders, muted text, and the secondary accent all rederived to match.
- Adjusted the light-mode background so cards stand out against the page.
- Redesigned the footer: a dark band in light mode, blended into the page in dark mode, with less colorful link and icon text.

## 1.0.0 - 2026-07-16

- Initial commercial release.
- Added Astro 7 technical publishing templates for home, posts, categories, tags, paginated archives, RSS, robots, sitemap, 404, about, contact, and privacy pages.
- Added a built-in Updates category with changelog-style release note posts, a version-chip timeline on the homepage, and sample releases.
- Added an editorial front page with a featured post, latest-posts list, most-read ranking, and topic cards.
- Added an article layout with a sticky right sidebar: table of contents, article details, tags, share actions, and more-in-category links.
- Added Markdown and MDX support with typed content collections, reusable callout and code-group components, centralized categories, SEO metadata, Open Graph, Twitter/X cards, and JSON-LD.
- Added light/dark color mode (light by default), accessible mobile navigation, newsletter configuration, ad slots, and responsive Astro images.
