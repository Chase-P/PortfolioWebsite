# Chase Punia — Portfolio

Built with [Astro](https://astro.build), deployed to GitHub Pages.

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321/PortfolioWebsite/
```

## Edit content

All content lives in `src/data/`:

- `profile.ts`: contact info, stats, experience, awards
- `projects.ts` / `leadership.ts`: each entry gets an overview page, plus one sub-page per item in `pages` (built from content blocks: text, images, tables, code, formulas, flow diagrams)
- `skills.ts`: skills with logos (`public/img/logos`, from Simple Icons) and links to projects
- `coursework.ts`: courses, status and prerequisites for the course tree

Screenshots live in `public/img/shots`. The resume is `public/resume.pdf`.

## Deploy

1. On GitHub: **Settings → Pages → Source: GitHub Actions**
2. Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and publishes.

Live at `https://chase-p.github.io/PortfolioWebsite/`. For a custom domain, set `base: '/'` in `astro.config.mjs`.
