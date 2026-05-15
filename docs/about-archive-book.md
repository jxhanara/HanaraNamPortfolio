# PRD — Archive Book (Section 04)

**Owner:** Hanara · **Status:** Ready for implementation · **Replaces:** existing `PolaroidBookSpread` + `archiveDetail` block in `app/about/page.tsx`

---

## 1. Overview

The current "04 — An archive" section presents 8 polaroids on a single static spread with a single margin note below. We're replacing it with **an actual flippable book** — six page-spreads the visitor turns through, themed by chapter, with the photo's story revealed in a margin note below as they click each polaroid.

The goal: turn a static gallery into a memorable, "stayed-on-the-page" moment for recruiters and hiring managers — without losing the existing visual language (warm paper, pink accent, scrapbook tone).

---

## 2. Why this design

| Problem with current archive | Fix in book version |
|---|---|
| 8 polaroids competing on one spread → eye doesn't know where to land | One photo per page, page-turn pacing forces sequential attention |
| Right-page index flip is a hidden interaction; most visitors miss it | Page corners are the universal "turn page" affordance — discoverable in 1 sec |
| Margin note feels disconnected from the photos above | Click-to-highlight pulls the active polaroid to center, dims the rest, and animates the note in |
| No narrative shape — feels like a Pinterest board | Chapter spreads ("Places that reset me," "The people who made me," etc.) give the section a beginning, middle, end |
| No way to "close" the section | Cover spread on the way in + "to be continued" on the way out frame the archive as an artifact |

---

## 3. Files included

```
components/about/
  ArchiveBook.tsx             ← client component for section 04
  ArchiveBook.module.css      ← scoped styles (uses --about-* from .aboutRoot)

docs/
  about-archive-book.md       ← this doc
```

---

## 4. Information architecture

### 4.1 Spreads (in order)

| # | Kind | Left page | Right page |
|---|---|---|---|
| 0 | `cover` | Dedication ("For halmoni…") + signature | Title plate — *"Things I keep coming back to."* |
| 1 | `content` | **Hong Kong, in neon** | **Gwanghwamun, at night** |
| 2 | `content` | **Family pic, since 2008** | **The friends who filled every chapter** |
| 3 | `content` | **Sketchbook, since age 9** | **Sunny (2011 film)** |
| 4 | `content` | **Golf with the fam** | **Thor, the boss** |
| 5 | `end` | "To be continued." + handwritten note | Quiet back endpaper (blank with subtle glyph) |

Each content spread has a **chapter title** on the left page (italic, with handwritten subtitle).

### 4.2 Per-polaroid data (`ArchiveItem`)

| Field | Notes |
|---|---|
| `id` | Stable identifier (e.g. `"hongkong"`) — used for the margin-note counter and selection state |
| `title` | Margin note headline (large italic serif) |
| `meta` | All-caps eyebrow under the title (e.g. `"Hong Kong · Fall '24"`) |
| `blurb` | The story — 1–3 sentences, the longer version of what's on the polaroid caption |
| `quote` | A handwritten pull-quote in Caveat, accent color |
| `captionL` / `captionR` | The two-line caption printed on the polaroid itself (left = title-side, right = date/meta) |
| `alt` | Image alt text |
| `imgSrc` | `StaticImageData` from `next/image` import |
| `linkLabel` / `link` | Optional external link (used by **Thor → IG**) |

### 4.3 Spread data (`Spread`)

| Field | Notes |
|---|---|
| `kind` | `"cover" \| "content" \| "end"` |
| `chapter` | `{ num, title, sub }` for content spreads only |
| `pageNoL` / `pageNoR` | Printed page numbers (null = no number on that page) |
| `stampL` / `stampR` | Monospace corner stamps (e.g. `"01 · Travel"`) |
| `leftItem` / `rightItem` | `ItemId` references (content spreads only) |
| `leftFlourish` / `rightFlourish` | Optional handwritten scribble: `{ text, bottom, left?/right?, rotate }` |

---

## 5. User interactions

### 5.1 Turning pages

1. **Corner-click** — hover the bottom-left or bottom-right corner of the visible spread; a paper-curl peeks out. Click to flip.
2. **Arrow keys** — `←` / `→` while focus is anywhere on the page.
3. **Page dots** — small dot strip below the book; click any dot to jump to that spread (animates the flip even on jumps).
4. **"Back to cover" button** — hard-reset to spread 0.

Flips are disabled while a flip is in flight; `Escape` clears the active polaroid.

### 5.2 Selecting a polaroid

1. Click any polaroid on a content spread.
2. That polaroid lifts to the page center (`translate(-50%,-56%) scale(1.08)`), gains a 2px pink halo, and saturates slightly.
3. Other polaroids on the same spread dim to `opacity: 0.42, saturate: 0.7`.
4. **Margin note** (below the book) animates: 180ms fade-out → swap content → 320ms fade-in. Shows title, meta, blurb, pull-quote, and link if present.
5. The counter (e.g. `04 / 08`) updates to reflect position within `ORDERED_ITEM_IDS`.

### 5.3 Auto-open behavior

When a page-turn lands on a content spread, the **left polaroid auto-selects** by default (tweakable: see §7). Returning to cover/end clears the active polaroid.

---

## 6. Visual spec

### 6.1 Book chrome
- Aspect ratio: `16 / 10` on desktop, `9 / 12` on mobile (auto-stacks pages vertically).
- Leather cover: brown gradient (`--cover-1: #5b2e22` → `--cover-2: #371810`) with grain pattern, dashed stitching inset, and an ambient drop shadow.
- Center binding with stitched seam pattern.
- Spine shadow gradient across the center seam for depth.

### 6.2 Paper
- Warm cream gradient (`--paper-warm: #faf6ec` → `--paper-mid: #f2ecdd` → `--paper-edge: #e4ddc9`).
- Radial dot grain overlay (multiply blend, 70% opacity) for paper texture.
- Inner corner darkening on both pages.
- Inset shadow at the spine edge of each page for depth.

### 6.3 Polaroid card
- White paper with `0 8px 18px` + `0 22px 46px -16px` shadow layers.
- Image well: aspect `1 / 1`, inset shadow vignette, subtle dot grain overlay.
- Caption: two-line, Caveat serif left + JetBrains Mono right (date), 10px padding.
- Top tape strip (translucent pink washi).
- Centered with `min(64%, 280px)` width; rotates ±2–3° per side.
- **Active state:** outline pink, lifted shadow, sharpened photo.
- **Inactive (when sibling is active):** `opacity: 0.42; filter: saturate(0.7)`.

### 6.4 Page accents
- Chapter title (left page, content spreads only): italic serif `clamp(24px, 2.8vw, 38px)` + handwritten subtitle `clamp(16px, 1.7vw, 20px)` rotated −1.2°.
- Corner stamps (both pages): JetBrains Mono 10px, dashed-bordered, slightly rotated.
- Page numbers: italic Instrument Serif "— 3 —" treatment.
- Scribble flourishes: Caveat, bottom margin, with `↑` arrow pointing back to the photo.

### 6.5 Margin note (annotation rail)
3-column grid below the book:

| Col 1 | Col 2 | Col 3 |
|---|---|---|
| `Margin note —` eyebrow, counter, hint copy | Title + meta eyebrow | Blurb + pull-quote + optional link |

Fade-and-rise transition between active items (180ms out, 320ms in).

### 6.6 Color tokens (reused from `about.module.css`)
- `--about-bg`, `--about-ink`, `--about-muted`, `--about-line`, `--about-accent`
- New paper tokens introduced (scoped to `.archiveSection`): `--paper-warm`, `--paper-mid`, `--paper-edge`, `--paper-deep`, `--paper-ink`, `--paper-faint`, `--cover-1`, `--cover-2`.

---

## 7. Behavior spec — flip animation

- 3D rotation around the spine edge (`transform-origin: left center` for right→left flips, `right center` for left→right).
- Duration: `850ms`, easing `cubic-bezier(0.5, 0.05, 0.3, 0.97)`.
- Two `backface-visibility: hidden` faces per flip — front = source page, back = destination page.
- Soft shadow gradient on the flipping face to suggest curl.
- During flip: base layer renders mixed (`source.left` + `target.right` for forward) so the destination is "already there" once the flip finishes.
- `onTransitionEnd` (`transform` only) commits the spread index change.

---

## 8. Responsive

| Breakpoint | Change |
|---|---|
| `>= 901px` | Horizontal book, left + right pages side by side, page-corner nav. |
| `<= 900px` | Pages stack vertically, spine becomes horizontal divider. Polaroid scribbles preserved. Tweaks panel collapses. Page-corner nav hidden in favor of dots + arrow buttons. |

---

## 9. Accessibility

- Each polaroid is a real `<button>` with `aria-pressed`, `aria-label`, focus-visible 2px pink outline.
- Margin note is wrapped in `aria-live="polite"` so screen readers announce story changes.
- Keyboard nav: ←/→ flip pages, Enter/Space activate focused polaroid, Esc clears selection.
- Page dots and corner buttons all have explicit `aria-label`s.

---

## 10. Integration steps (for Cursor)

> **Paste this into Cursor's chat with the three handoff files attached:**

```
You're updating my About page (Next.js 14 app router, TS + CSS modules).
Goal: replace the existing "04 — An archive" polaroid section with a new
flippable book component.

Three files attached:
  - ArchiveBook.tsx
  - ArchiveBook.module.css
  - PRD-archive-book.md (reference only; do not import)

Tasks:
1. Create app/about/_components/ArchiveBook.tsx (copy attached file).
2. Create app/about/_components/ArchiveBook.module.css (copy attached file).
3. In app/about/page.tsx:
   a. Remove these symbols (no longer used):
        PolaroidCard, PolaroidBookSpread, PolaroidSlot, POLAROID_SLOT_MAP,
        ARCHIVE constant (move its data into ArchiveBook.tsx if not already),
        any related useState (activeIdx, isSwapping) and selectArchive helper
        — IF they aren't used elsewhere on the page.
   b. Remove this JSX block entirely (the polaroidArchiveStack and inner
      PolaroidBookSpread + archiveDetail div):
        <div className={styles.polaroidArchiveStack}>...</div>
   c. Replace it with:
        <ArchiveBook />
   d. Keep the section wrapper, section label, and lovesHead heading —
      ArchiveBook renders below the existing heading.
4. Verify the photo imports inside ArchiveBook.tsx match my asset paths
   (assets/aboutme/*). Adjust the import paths only if my project uses
   a different alias than @/assets.
5. Run the dev server, navigate to /about, and confirm:
   - Cover spread shows on first paint
   - Page corners flip with animation
   - Clicking any polaroid lifts it and updates the margin note below
   - ← / → keyboard nav works
   - Thor's polaroid shows the IG link in its margin note
6. Do NOT modify about.module.css — the new module is self-contained and
   inherits --about-* tokens from .aboutRoot.

After integration, run typecheck and lint. Report any errors.
```

---

## 11. Acceptance criteria

- [ ] `/about` loads with the cover spread visible (no console errors, no layout shift).
- [ ] Six page dots render below the book; clicking each one flips to that spread.
- [ ] Each content spread shows two polaroids (left + right page) with real photos.
- [ ] Clicking a polaroid: highlights it + updates the margin note in <500ms.
- [ ] Thor's margin note shows the "Thor on IG ↗" link as an `<a target="_blank">`.
- [ ] Resizing the window below 900px stacks the pages vertically; flip animation still works.
- [ ] Keyboard: `←` / `→` change spreads; `Esc` clears selection.
- [ ] No regressions in sections 01 / 02 / 03 / Hero / Now band.
- [ ] Typecheck + lint pass.

---

## 12. Out of scope / future

- Swapping placeholder photos with new ones — just drop a new import into the `imgSrc` field.
- Adding more spreads — append to `SPREADS`, reference any new `ITEMS` entries.
- Sharing a deep link to a specific polaroid (e.g. `?archive=thor`) — easy to add by reading `searchParams` and seeding `activeItemId` + `spreadIdx` from `ITEM_LOCATION`.
- Print/PDF export of the book.
