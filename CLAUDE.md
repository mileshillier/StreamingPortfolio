# Streaming Portfolio

Miles Hillier's design portfolio, presented as a Netflix-style streaming service.
Live at https://mileshillier.github.io/StreamingPortfolio/.

React 18 + React Router 6 + TypeScript + Vite 5, plain CSS in `src/styles/global.css`.

## How Miles works

- Miles is new to git and the terminal. Give plain-language, step-by-step
  instructions, **one step at a time**, and wait for him to say a step is done
  before moving on.
- He works locally in `~/StreamingPortfolio` with the dev server running and
  the browser open, so he sees every change as you make it.
- **Never commit or push until Miles says he's done.** Then:
  1. `npm run build` (typecheck + build) must pass.
  2. Commit with a clear message.
  3. `git push origin main`. Pushing to `main` deploys the live site
     automatically (`.github/workflows/deploy.yml` → GitHub Pages, usually 1–2
     minutes).
- If `main` has moved on GitHub, `git pull` before pushing.

## Commands

- `npm run dev`: dev server at http://localhost:5173/ with live reload.
  Miles usually runs it in his own Terminal window; if it isn't running, start
  it in the background and tell him the URL.
- `npm run build`: typecheck and production build. Run before every push.
- Don't upgrade dependencies (React Router, Vite, etc.) unless Miles asks and
  it's been tested. An untested major-version upgrade once crept in locally.

## Content rules

- **Never invent metrics, clients, outcomes, or quotes.** Ask Miles. If he
  doesn't know, leave it out or mark it as a `[bracketed note]`.
- **Never fabricate testimonials**, not even with generic titles.
- Be precise about what happened: designed vs. launched, projected vs. actual,
  "in testing" vs. in production. Interviewers will ask.
- When filling a case study, interview Miles one question at a time, and show
  him the exact wording you added after each answer.
- Miles's old case studies live at https://www.mileshillier.com/work/…, with
  images on framerusercontent.com.

## Case studies

Each real case study is one folder: `src/assets/case-studies/<Client>/`.
The folder name must match the `client` field (case-insensitive, spaces kept),
e.g. `Imagine Learning`. See `src/assets/case-studies/README.md` and any
existing `case-study.md` for the format: YAML settings at the top, then
seasons (`#`) and chapters (`##`) in Markdown.

- Images: `cover.jpg` (cards), optional `banner.jpg` (page headers), `logo.png`,
  and `ch1.jpg`, `ch2.jpg`, … in reading order. Resize to web sizes
  (1920px cover, 1600px chapters, JPEG around quality 82) and don't keep huge
  originals in the folder.
- Optional settings: `banner`, `coverHasTitle: true` (cover art already shows
  the title, so cards don't repeat it), `logoInColor: true` (keep the logo's
  colours instead of rendering it white).
- Register it in `src/data/titles.ts` with `caseStudy('<Client>')`, usually
  replacing one of the remaining placeholder `define({...})` titles. Update any
  references to the removed id (`TOP_10_IDS` in `titles.ts`, `LATEST_WORK` in
  `src/pages/HomePage.tsx`).
- Anything in `[square brackets]` shows red while `FLAG_PLACEHOLDERS` is on
  in `src/config.ts`.

Live case studies: Common Ground (Meltwater), Four Into One (Hexure),
Report Card (Imagine Learning). Everything else in `titles.ts` is placeholder.

## Other files

- `src/data/resume.ts`: the résumé page (`/resume`). The download is
  `public/resume.pdf`, which still has the old Hexure wording and needs
  replacing.
- `src/config.ts`: social links, `FLAG_PLACEHOLDERS`, `SHOW_SOUND_CONTROLS`.
- Brand colour `#02CBF9`. Logo `src/assets/logo.svg`, photo `src/assets/profile.png`.

## Open items

- More case studies: Progressive Leasing (universal loan application,
  $35–45M GMV, 67% faster completion), Rentler (82% less drop-off),
  BurbleNeuro (rebrand, which would fill the Brand row), Wooly, and
  "Claimed Properties, Fraud, & Frustration" (2018, on the old site).
- Footer: the "Read.cv" and "Press Kit" links are dead, and the legal line still
  says placeholder content (`src/components/Footer.tsx`).
- Replace `public/resume.pdf` with an up-to-date version.
