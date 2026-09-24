# Case study images

One folder per case study, named after the client (e.g. `Meltwater`).

## Content

A case study can live entirely in its folder as `case-study.md`: a settings
block at the top (title, client, colours, results, cover and logo file names),
then the seasons and chapters written in Markdown. See
`Meltwater/case-study.md`, which explains the format at the top. Save the file
and the site updates. Add it to `TITLES` in `src/data/titles.ts` with
`caseStudy('<Client>')`.

## Images

Files are picked up automatically:

| File | Used for |
|---|---|
| `cover.jpg` | Main image: cards, headers, and the detail popup (16:9, ~1920×1080) |
| `ch1.jpg`, `ch2.jpg`, … | One per chapter, numbered in reading order across seasons (16:9, ~1600×900) |
| `logo.png` or `logo.svg` | Client logo, shown in place of the client name (dark logos are rendered white) |

`.jpg`, `.jpeg`, `.png`, and `.webp` all work. In `case-study.md` the image
file names are written out, so you can use any name there. Any image that is missing falls
back to placeholder art, which is outlined in red while `FLAG_PLACEHOLDERS` is on.
