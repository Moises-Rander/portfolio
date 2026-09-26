# Portfolio — Moises Rander

Static site (HTML + CSS + vanilla JS). No build step — works as-is on GitHub Pages.

## Structure

```
index.html                 Home: hero · selected work · about (bio + principles + toolbox) · contact
case-aniversario-40.html   Case 01 — Grupo Mateus 40th Anniversary (Mateus Mais)
css/style.css              Design system + layout (see below) — dark only
js/main.js                 Language toggle, gallery tabs, lightbox, scroll reveal
assets/img/case-40/screens/   51 gallery screens (17 app · 17 desktop · 17 responsive), device mockups from Figma
assets/img/case-40/diagrams/  Campaign mechanics diagram (exported from Figma)
assets/img/case-40/flow/      Phone screens used by the user-flow scroller
assets/cv/                 Résumé PDFs: moises-rander-cv-en.pdf · moises-rander-cv-pt.pdf
wireframes/                Original 65 PNG frames (source only — not referenced by the site)
"assets copy"/             Full-resolution Figma exports, 166 MB (source only — keep out of git)
```

## Design system

Ported from a shadcn/ui preset: **style Luma · base Zinc · theme Violet · radius Large · Noto Sans · Lucide**.
`css/style.css` is organised in four layers:

1. **Tokens** — the shadcn variables verbatim (`--background`, `--card`, `--primary`, `--muted-foreground`, `--border`, `--chart-*`, `--radius`…) in oklch, dark only (the light block from the export was dropped on purpose). A few portfolio-only extensions sit next to them (`--primary-text`, `--primary-soft`, `--success`, `--warning`, `--glow`, spacing scale `--space-*`, radius scale `--radius-xs … --radius-3xl`).
2. **Base** — reset, typography, `code`, language switching, `.icon`.
3. **Primitives** — the reusable components:

| Class | Variants / modifiers |
|---|---|
| `.btn` | `.btn-primary` `.btn-secondary` `.btn-outline` `.btn-ghost` `.btn-link` · sizes `.btn-sm` `.btn-lg` · `.btn-icon` · put `.icon-trail` on a trailing icon for the hover nudge |
| `.badge` | `.badge-primary` `.badge-soft` `.badge-outline` `.badge-success` `.badge-warning` · wrap groups in `.badge-row` |
| `.card` | `.card-header` (`.card-title`, `.card-description`) `.card-content` `.card-footer` · `.card-interactive` (hover lift) · `.card-inset` (muted tile inside a card) |
| `.input` / `.textarea` | pill input, rounded textarea |
| `.segmented` | tab / toggle track; `button.active` · `.segmented-sm` · `.segmented-primary` |
| `.avatar` `.kbd` `.separator` `.progress` `.dot-live` | small helpers |
| `.eyebrow` `.section-title` `.section-lead` `.mono` `.text-muted` `.text-primary` | typography helpers |

4. **Layout** — nav, hero, sections and page-specific composition, all built from the primitives above.

### Icons

Lucide, inlined as an SVG sprite at the top of each page's `<body>`. Use with:

```html
<svg class="icon"><use href="#i-arrow-right"/></svg>
```

To add an icon, copy the `<path>`s from [lucide.dev](https://lucide.dev) into a new `<symbol id="i-name" viewBox="0 0 24 24">` in the sprite of every page that uses it.

## Conventions

- **Bilingual content**: every text node exists twice, tagged `lang="en"` and `lang="pt"`. CSS hides the inactive one based on `<html lang>`. EN is the default; the choice is saved in `localStorage`.
- **Theme**: dark only — no toggle, no light tokens. If a light mode is ever wanted, re-export the `:root` block from the shadcn preset.
- **Résumé**: the download buttons pick `assets/cv/moises-rander-cv-en.pdf` or `-pt.pdf` by the active language. Keep both files updated together.
- **Adding a case**: duplicate `case-aniversario-40.html`, add a new `.case-card` block in `index.html#work`, drop optimized images in `assets/img/<case>/`.
- **Case diagrams**: images in `assets/img/case-40/diagrams/` come from Figma. Export at 2–3x the display size; they are Portuguese-only by choice (the language the product was designed in) and the surrounding copy carries the translation.
- **User flow**: the `.flow-track` scroller on the case page is a flex row with scroll snapping that stacks vertically below 760px. Its `scroll-padding-inline` must match `padding-inline`, otherwise the browser snaps away from the start on load. Edge fades are toggled by `can-left` / `can-right` in `js/main.js`.
- **Gallery screens**: they are device mockups on a transparent background, so `.shot .frame` carries no card, border or crop. The hover shadow uses `filter: drop-shadow` so it follows the device outline rather than a rectangle.
- **Optimizing images**: `cwebp -q 82 in.png -o out.webp` (add `-resize 1200 0` for desktop frames).

## Local preview

```
python3 -m http.server 8765
# open http://localhost:8765
```
