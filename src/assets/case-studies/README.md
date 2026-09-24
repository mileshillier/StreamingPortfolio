# Case study images

One folder per case study, named after the client exactly as it appears in
`src/data/titles.ts` (e.g. `Meltwater`). Files are picked up automatically:

| File | Used for |
|---|---|
| `cover.jpg` | Main image: cards, headers, and the detail popup (16:9, ~1920×1080) |
| `ch1.jpg`, `ch2.jpg`, … | One per chapter, numbered in reading order across seasons (16:9, ~1600×900) |
| `logo.png` or `logo.svg` | Client logo, shown in place of the client name (dark logos are rendered white) |

`.jpg`, `.jpeg`, `.png`, and `.webp` all work. Any image that is missing falls
back to placeholder art, which is outlined in red while `FLAG_PLACEHOLDERS` is on.
