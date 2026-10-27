# Daily progress log

## 2026-10-27 — Nav accessibility + lazy-loaded images
- Nav: mobile menu button now has `aria-controls`, its label flips between "Open menu"/"Close menu", Escape closes it (and returns focus to the button), and tapping a link closes it. Nav landmark is labelled; current page link gets `aria-current="page"`.
- Added `loading="lazy"` to below-the-fold images (project blocks/galleries, experience list thumbnails, skills cards). Hero/above-the-fold images left eager.

### Next ideas
- Add an Open Graph preview image (1200x630) once a headshot/photo exists.
- Add `sitemap.xml` / `robots.txt` (`@astrojs/sitemap`).
- Check color contrast of `--faint` text in light and dark themes.
- Mobile pass on CourseTree.
- Add explicit width/height to images to avoid layout shift.
- Fold in NOTES_FOR_CHASE.md once Chase fills it in.
- Note: PR #1 (SEO + skip link) also creates PROGRESS.md; merge the two logs when resolving.
