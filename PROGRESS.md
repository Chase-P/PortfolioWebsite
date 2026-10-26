# Daily progress log

## 2026-10-24 — SEO meta + skip link
- Added canonical URL, `og:url`/`og:site_name`/`og:locale`, Twitter card tags and light/dark `theme-color` in `Base.astro`.
- Added a keyboard "Skip to content" link and made `<main id="main">` focusable (styled in `global.css`).

### Next ideas
- Add an Open Graph preview image (needs a 1200x630 PNG; Chase's headshot/photo not yet added).
- Add `sitemap.xml` / `robots.txt` (`@astrojs/sitemap`).
- Audit image `alt` text and lazy-loading across EntryCard/Blocks.
- Check color contrast of `--faint` text in light and dark themes.
- Mobile pass on Nav and CourseTree.
- Fold in NOTES_FOR_CHASE.md once Chase fills it in.
