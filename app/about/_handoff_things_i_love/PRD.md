# PRD — About §04 "Things I love" · Layout D (Hybrid)

## Problem
The current §04 layout packs 8 photos into a 12-column × 60px-row mosaic followed by an inline detail panel. Two pain points:

1. **Cramped imagery.** With 8 simultaneous tiles, the active photo never has visual hierarchy — every tile is the same weight, and tile heights are small (≈240px max).
2. **Detail copy lives below the grid.** When the user taps a photo, the detail panel updates *below* the collage, which on a 1440×900 viewport sits below the fold. Users tap, see the active ring, then have to scroll to read the story.

## Goal
Redesign §04 so:
- The active photo is the visual hero — clearly the largest element on screen.
- The detail copy for the active photo is **adjacent to** the image, not below it.
- All 8 photos remain reachable with one click (no hidden archive).
- The entire section fits in one viewport on a 1440×900 desktop without scrolling.

## Non-goals
- Changing the photo set (still the same 8 entries — see `data.jsx` for the canonical list).
- Changing voice/copy of titles, meta, or blurbs — keep them verbatim.
- Reworking mobile (<1000px). The existing responsive rules cover that.

## Layout spec (desktop, viewport ≥1000px)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  04 — Things I love, in no order ─────────────────────────────────────────  │
│                                                                             │
│  ┌──────────────────────────┐  ┌─────────────────────────────────────────┐  │
│  │                          │  │                                         │  │
│  │  Things I keep           │  │                                         │  │
│  │  coming back to.         │  │                                         │  │
│  │                          │  │            FEATURED IMAGE               │  │
│  │  A loose archive — …     │  │            (active photo)               │  │
│  │                          │  │                                         │  │
│  │                          │  │                                         │  │
│  │  ──────────────────      │  │                                         │  │
│  │  NOW VIEWING —    01/08  │  │                                         │  │
│  │                          │  │                                         │  │
│  │  Sunny                   │  │  caption · 2011                         │  │
│  │  2011 · FILM             │  └─────────────────────────────────────────┘  │
│  │                          │  ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐           │
│  │  The shared lunches,…    │  │ HK │ │GWM │ │FAM │ │SKT │ │GLF │           │
│  │                          │  └────┘ └────┘ └────┘ └────┘ └────┘           │
│  │  ←  →                    │   (thumbnail rail — 5 supporting photos)     │
│  └──────────────────────────┘                                                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Grid
- Outer: existing `.wrap` (max-width: var(--content-max), centered).
- Section stage: CSS Grid, `grid-template-columns: minmax(340px, 0.62fr) 1.4fr;` gap `48px`.
- Left column: flex column, `justify-content: space-between` so the title sticks to the top and the detail block sticks to the bottom.
- Right column: CSS Grid, `grid-template-rows: 1fr auto;` gap `14px` — the featured image takes all remaining vertical space; the thumb rail is a fixed-height row beneath.

### Heights
- Section min-height target: ~720px below the section label (so the whole section + section label + page padding ≈ 860px and fits in a 900px viewport with the nav bar).
- Featured image: fills the right column above the thumb rail (no fixed height — flex/grid driven).
- Thumb rail row: `height: 130px`. Each thumb is `aspect-ratio: 1/1` is **not** used here — thumbs stretch to fill the 130px row height with `grid-template-columns: repeat(5, 1fr)` so they're consistent.

### Active state
- The active photo is rendered as the big featured image on the right; it is **not** repeated in the thumb rail.
- Thumb rail shows the **5 photos that come after the active one** in the array (wrapping is fine — the prototype slices `photos.filter(i !== idx).slice(0, 5)`; equivalent ordering is acceptable as long as clicking any thumb makes it the new featured image).
- The 2 photos not currently in the rail or featured still need to be reachable. **Use the left/right arrow buttons** to cycle through all 8.

### Interaction
- **Click any thumbnail** → it becomes the featured image; left-column detail copy crossfades to the new entry.
- **Click prev/next arrows** → cycle to previous/next photo in the array (with wrap).
- **Keyboard:** the featured image and each thumb are keyboard-focusable buttons (`role="button"`, `tabIndex={0}`). Enter/Space activates; Left/Right arrow keys cycle (matches existing `CollageTile` behavior).
- **Transition:** when active changes, the featured `<img>` fades to `opacity: 0.35` for 180ms then back; detail copy fades+translates 4px (same `isSwapping` pattern already in the codebase).

### Typography & color
All tokens already exist in `about.module.css` — reuse them, do not introduce new values.

| Element | Token / value |
|---|---|
| Section label | DM Sans 500 11px, letter-spacing 0.18em, uppercase, `var(--about-muted)`, `—` accent in `var(--about-accent)` |
| Headline "Things I keep coming back to." | Instrument Serif 400, `clamp(48px, 5.4vw, 72px)`, line-height 0.95, letter-spacing -0.02em. `<em>coming back to.</em>` in `var(--about-accent)` italic. |
| Sublead | Instrument Serif italic 18px, `var(--about-muted)`, max-width 28ch |
| Detail eyebrow ("Now viewing —") | DM Sans 500 11px, 0.18em letter-spacing, uppercase, `var(--about-accent)` |
| Detail counter ("01 / 08") | Instrument Serif italic 22–28px; numerator `var(--about-ink)`, denominator + slash `var(--about-muted)` |
| Detail title | Instrument Serif italic 400, `clamp(34px, 4vw, 48px)`, line-height 1.02 |
| Detail meta | DM Sans 500 11px, 0.18em letter-spacing, uppercase, `var(--about-muted)` |
| Detail blurb | DM Sans 400 16px, line-height 1.55, color `#d2cec3`, max-width 42ch |
| Nav arrow buttons | 38×38 circle, 1px border `var(--about-line)`, hover → border + glyph `var(--about-accent)` |
| Featured image caption pill | DM Sans 500 10px uppercase, white text on `rgba(0,0,0,0.55)` w/ 6px blur, 1px `rgba(255,255,255,0.12)` border, 99px radius |
| Featured image radius | 8px |
| Thumb radius | 6px |
| Hairline rule above detail block | 1px solid `var(--about-line)` |

### Existing tokens (no changes)
```
--about-bg:    #0a0a0a
--about-ink:   #f3f1ec
--about-muted: #8a857c
--about-line:  #221f1c
--about-accent:#f3bdd1
--font-instrument-serif (serif display)
--font-dm-sans (sans body / labels)
```

## Acceptance criteria
- [ ] On a 1440×900 viewport with the nav bar present, the entire §04 section (label → headline → featured image → thumb rail → detail copy → nav) is visible without scrolling.
- [ ] The featured image is at least 540px tall.
- [ ] Clicking any thumbnail updates the featured image AND the detail copy within ~250ms.
- [ ] The detail copy uses the same 8 records (title, meta, blurb, captionL, captionR, link?) currently in `ARCHIVE` in `page.tsx` — verbatim.
- [ ] Thor's IG link still renders as an external link with `target="_blank" rel="noreferrer"` when Thor is the active photo.
- [ ] Keyboard: Tab reaches the prev/next buttons and every thumb; Enter/Space activates; ←/→ on a focused thumb cycles.
- [ ] No new color values, no new font families introduced.
- [ ] Mobile (<1000px) still works — left column stacks above right column, thumb rail wraps to a 3+2 grid, featured image gets an aspect-ratio constraint instead of filling the row.

## Out of scope
- Lightbox / fullscreen view of any photo (could be a v2).
- Drag-to-reorder thumbnails.
- Auto-rotation / slideshow timer.
