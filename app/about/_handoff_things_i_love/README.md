# Handoff — About page §04 "Things I love" (Layout D · Hybrid)

**Status:** Layout D is implemented in production (`app/about/page.tsx` + `app/about/about.module.css`). This folder remains as spec, prototype, and PRD.

## Overview
The current About page's "Things I love" section renders all 8 photos as a dense 12-column collage with an active-state ring + detail panel pushed below the grid. The result is cramped and forces the user to scroll to read the detail copy for whichever photo they tapped.

**Layout D** restructures the section into a two-column hero+rail layout:
- **Left column** — title + sublead at the top, the active photo's detail copy + nav anchored at the bottom.
- **Right column** — a large featured image of the active photo, with a 5-up thumbnail rail underneath showing the rest of the archive.

Goal: photos breathe, the active story is always visible *beside* the image (not below it), and the entire section fits in a single viewport on a 1440×900 desktop.

## About the design files
The files in `reference/` are **design references created in HTML** — a vanilla React + Babel prototype used to validate the layout, not production code to copy verbatim. Your task is to **port Layout D into the existing Next.js codebase** (`app/about/page.tsx` + `about.module.css`), reusing the same patterns already in place (next/image, CSS Modules, the existing brand tokens). Do not introduce a new styling library or rewrite unrelated sections.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and interaction behavior are decided. Match the spec.

## Files in this bundle
```
app/about/_handoff_things_i_love/
├── README.md                          ← you are here (start here)
├── PRD.md                             ← product requirements + acceptance criteria
├── IMPLEMENTATION.md                  ← step-by-step port into the Next.js codebase
├── reference/
│   ├── About Me - Loves layout exploration.html  ← interactive prototype (open in browser)
│   ├── styles.css                     ← prototype CSS (look for the LAYOUT D section)
│   ├── layout-d.jsx                   ← prototype React component for Layout D
│   ├── shared.jsx                     ← Tile / Detail / NavArrows / useActive hook
│   ├── data.jsx                       ← the 8 photo records (titles, meta, blurbs)
│   └── original/
│       ├── page.tsx                   ← the user's current About page (before)
│       └── about.module.css           ← the user's current CSS (before)
└── (open the .html locally to interact with the design)
```

## Read order
1. **PRD.md** — what we're building and why, with acceptance criteria.
2. **IMPLEMENTATION.md** — the concrete code changes to `page.tsx` and `about.module.css`.
3. **reference/About Me — Loves layout exploration.html** — open in a browser, click around Layout D's first artboard to feel the interaction.

## Scope
**In scope:**
- §04 "Things I love" section only (the `<section className={styles.loves}>` block in `page.tsx`).
- Rework of the `.collage`, `.lovesHead`, and `.archiveDetail` CSS class families in `about.module.css`.

**Out of scope:**
- §01 Intro, §02 Origin, §03 Lists, the hero, and the Now band — leave untouched.
- Mobile layout below 1000px — current responsive rules can stay; this PRD covers desktop ≥1000px.
- Image asset updates — the existing imports from `@/assets/aboutme/*` are correct, don't touch them.
