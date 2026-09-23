# Streaming Portfolio

A design portfolio presented as a streaming service. Case studies are "titles", project phases are "seasons", and each step of the work is a "chapter".

## Run it locally

Requires [Node.js](https://nodejs.org) 20 or newer.

```bash
git clone https://github.com/mileshillier/StreamingPortfolio.git
cd StreamingPortfolio
npm install
npm run dev      # http://localhost:5173
```

`npm run build` type-checks and builds the site into `dist/`. `npm run preview` serves that build locally.

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` builds the site and publishes it on every push to `main`.

One-time setup:
1. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push to `main`, or run the workflow from the **Actions** tab.

The site goes live at `https://mileshillier.github.io/StreamingPortfolio/`. The workflow builds with the repo name as the base path and publishes `404.html` as a copy of the app, so shared links such as `/title/northstar` open correctly.

## What's here

- **Home** (`/`): a featured hero case study, then rows for Continue Watching, the three categories (Product Design (UX/UI), Brand & Art Direction, Design Leadership), Top 10, Award-Winning Work, and New Releases.
- **Title detail** (`/title/:id`): opens as a modal over the current page, with key art, Play / My List / Like, metadata, outcomes, a chapter list with a season picker, More Like This, and About.
- **Case study player** (`/watch/:id`): the long-form case study, with a reading-progress scrubber and a "Next Episode" link.
- **Browse** (`/browse/:category`), **My List** (`/my-list`, saved in localStorage), and **Search** (`/search?q=`).

## Editing content

All content is placeholder copy and lives in `src/data/titles.ts`. Edit the `TITLES` entries to swap in real projects.
Imagery comes from `picsum.photos` via `imageUrl()`. Point that function at your own files (for example `/images/${seed}.jpg` in `public/`) to use real project art. If an image fails to load, a gradient in the title's accent color shows instead.

Stack: React 18, React Router 6, TypeScript, Vite, and plain CSS (`src/styles/global.css`).
