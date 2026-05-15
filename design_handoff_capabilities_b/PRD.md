# PRD — Home §"How I can help you" · Capabilities B (Tabbed serif + detail rail)

## Problem
The current capabilities block is three even text columns with three paragraphs each. Three pain points:

1. **Wall of text.** Each column's three paragraphs run ~150–170 words. Side-by-side they read as a take-home essay, not a portfolio prompt.
2. **No editorial rhythm.** All three columns have equal weight, so the eye has no entry point. There's no clear order in which to read them.
3. **Generic header copy.** "Combining creativity with strategic thinking to deliver exceptional results" is corporate-template phrasing — out of step with the personal voice on the rest of the site.

## Goal
Redesign the section so:
- The reader sees one capability at a time, in their own pace.
- Each capability has a sharp **one-liner** as its hook; the longer body is available on demand.
- The section fits in one viewport on a 1440×900 desktop.
- Header copy matches the more personal voice used on the About page.

## Non-goals
- Changing the three capability buckets (UX Design / Branding / Collaborate & Adapt — keep them).
- Mobile redesign below 800px.
- Adding new capability buckets.

## New copy

### Section header
- **Eyebrow** (small caps, pink accent): `What I do`
- **Heading**: `How I can help —` (sans, bold; with the word `help` set in Instrument Serif italic in the pink accent color)
- **Subtitle**: `Three lenses I keep returning to, in the order they tend to matter.`

### Capabilities

| # | Title | Italic eyebrow | One-liner | Body |
|---|---|---|---|---|
| 01 | **UX Design** | the craft | Decisions that earn their place. | (3 paragraphs — see `home-data.jsx` `CAPS[0].paras`) |
| 02 | **Branding** | the voice | Identities that feel intentional and human. | (3 paragraphs — see `home-data.jsx` `CAPS[1].paras`) |
| 03 | **Collaborate & Adapt** | the way | Cross-functional by default, generous on purpose. | (3 paragraphs — see `home-data.jsx` `CAPS[2].paras`) |

Body copy is rewritten to match the About-page voice — shorter sentences, more first-person, less corporate. The full strings are in `reference/home-data.jsx`. They can be copy-pasted into `CapabilitiesSection.tsx` constants verbatim.

## Layout spec (desktop ≥1000px)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ── How I can help —                Three lenses I keep returning to, in   │
│                                     the order they tend to matter.          │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│                                                                             │
│  ┌───────────────────────────┐  ┌──────────────────────────────────────┐   │
│  │ 01    UX Design            │  │ 01 · the craft                       │   │
│  │       Decisions that earn  │  │                                      │   │
│  │       their place.         │  │  Decisions that earn their place.    │   │
│  │  ────────────────────────  │  │                                      │   │
│  │ 02    Branding             │  │  I approach UX with a strong focus   │   │
│  │       Identities that…     │  │  on purpose — every decision should  │   │
│  │  ────────────────────────  │  │  serve a clear user need…            │   │
│  │ 03    Collaborate & Adapt  │  │                                      │   │
│  │       Cross-functional…    │  │  I work closely with engineers and   │   │
│  │  ────────────────────────  │  │  product partners across Figma…      │   │
│  └───────────────────────────┘  └──────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Grid
- Outer: `<section>` with `max-width: var(--content-max)`, `padding: 0 var(--space-x)` (existing tokens).
- Stage grid: `grid-template-columns: 1fr 1.1fr;` `gap: 80px;` `padding-top: 36px;` `border-top: 1px solid rgba(255,255,255,0.08);`

### Left column — tabs
- Each tab is a `<button>` with grid `grid-template-columns: 48px 1fr; gap: 20px;`
- Rows separated by `1px solid rgba(255,255,255,0.08)`
- Default state: title in `var(--color-muted)` regular weight
- Hover: text becomes ink (`#f3f1ec`), padding-left animates from `0 → 10px` (180–240ms ease)
- Active: title becomes italic + pink accent (`#f3bdd1`); number turns pink

### Right column — detail
- `position: sticky; top: 24px;` so the detail rail stays in view if the section is taller than the viewport.
- Eyebrow (small caps, pink) → italic detail title (one-liner) → paragraphs.
- On active change: title + body crossfade in (`fadeUp` ~320ms — see prototype CSS).

### Typography

| Element | Token / value |
|---|---|
| Section eyebrow `What I do` | DM Sans 500 11px, letter-spacing 0.18em, uppercase, pink (`#f3bdd1`) |
| Section heading `How I can help —` | DM Sans 700, `clamp(48px, 5.6vw, 80px)`, line-height 0.96, letter-spacing -0.02em. The word `help` is set in Instrument Serif italic 400 in pink. The `—` is plain dash in the same italic. |
| Section subtitle | Instrument Serif italic 18px, `var(--color-muted)`, max-width 28ch, right-aligned next to the heading |
| Tab number | Instrument Serif italic 22px, muted (`#6e7480`); pink when active |
| Tab title | Instrument Serif 400, `clamp(40px, 4.6vw, 64px)`, line-height 1, letter-spacing -0.02em |
| Tab sub (one-liner under the title) | DM Sans 13px, color `var(--color-muted)` |
| Detail eyebrow | DM Sans 500 11px, letter-spacing 0.18em, uppercase, pink |
| Detail title (one-liner) | Instrument Serif italic, `clamp(36px, 4vw, 52px)`, line-height 1.04 |
| Detail paragraphs | DM Sans 16px, line-height 1.6, color `#e8e5dd`, max-width 48ch |

### Tokens — all already exist
```
--color-bg:     #000000
--color-text:   #ffffff (used as ink #f3f1ec via class)
--color-muted:  #99a1ae
--content-max:  1400px
--space-x:      clamp(24px, 6vw, 80px)
--font-instrument-serif (italic display)
--font-dm-sans (sans body / labels)
```
**Accent pink** (`#f3bdd1`) isn't in `globals.css` yet — see IMPLEMENTATION.md for adding it.

### Interaction
- Click a tab → set it active. Detail crossfades.
- Keyboard: Tab focuses each `<button>`. Enter/Space activates. ↑/↓ on a focused tab moves focus to the prev/next tab (optional but recommended).
- `aria`: tab pattern not required — buttons are fine. The detail rail should be `aria-live="polite"` so screen readers announce changes.
- First tab is active on mount.

## Acceptance criteria
- [ ] On a 1440×900 viewport the entire section (heading row → tabs/detail) is visible without scrolling.
- [ ] Clicking each tab swaps the right-rail detail; transition is a soft fade-up under 400ms.
- [ ] Hovering a tab moves its content right by ~10px and lightens its text color.
- [ ] The active tab's title is italic + pink, the number is pink.
- [ ] The section heading reads "How I can help —" with `help` in pink italic serif.
- [ ] Tab order: 01 UX Design → 02 Branding → 03 Collaborate & Adapt.
- [ ] All three bodies use the new copy (from `home-data.jsx`), not the original strings.
- [ ] Mobile (<800px): tabs collapse to full-width rows; the detail rail moves under the tabs (no sticky).
- [ ] No new font families. No new accent color besides the pink already used on the rest of the site.

## Out of scope
- Adding a 4th capability.
- Auto-cycling through tabs (a `setInterval` slideshow). Decision: explicit user action only.
- Inline icons next to each title.
