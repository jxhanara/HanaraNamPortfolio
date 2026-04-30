# Handoff: Leave a Mark

A playful, opt-in annotation layer for Hanara Nam's portfolio. A floating cute character lets visitors create a whimsical "visitor card" identity, then leave sticky notes, pen drawings, highlights, text labels, and comment pins anywhere on the site — persisting per-browser via localStorage.

---

## About the Design Files

The HTML/JSX/CSS files bundled in this folder are **design references** created as a high-fidelity interactive prototype. They demonstrate the intended look, motion, copy, and behavior in detail.

**They are not production code.** Your job is to **recreate this design inside Hanara's existing Next.js portfolio** (the codebase whose `app/`, `components/home/*`, `globals.css`, and `styles.module.css` were used as the source of truth for the surrounding portfolio styling). Use the patterns already established there — CSS modules, `next/font` Google Font setup, the existing CSS variables (`--color-bg`, `--space-x`, `--font-instrument-serif`, etc.), and the existing component/file conventions.

If you'd prefer different libraries (Framer Motion for animation, Konva or Fabric for the canvas), the PRD calls those out as fine choices — the prototype implements everything in vanilla React + CSS so the motion contracts are clear.

---

## Fidelity

**High-fidelity.** Colors, gradients, typography, spacing, animation timing, easing, and copy are all final and should be reproduced exactly. The prototype is the spec.

---

## Architecture overview

The feature is one self-contained system that mounts above the rest of the page (z-index 1000+). It has six discrete phases driven by a single `phase` state machine:

```
idle → drawingGlow → centering → cardIn → card → editing → exiting → idle
```

- **idle** — character bobs in bottom-right corner; nothing else visible
- **drawingGlow** — viewport edge glow draws (clip-path sweep ~1.6s)
- **centering** — character glides to mid-screen; page dims (~600ms)
- **cardIn / card** — visitor card flips in (first visit only)
- **editing** — toolbar visible, annotations editable, edge glow breathing
- **exiting** — character waves, glow fades, toast appears, return to idle

On return visits with an existing card in localStorage, `centering` flows directly to `editing`, skipping the card creation step.

---

## Screens / Views

### 1. Idle launcher (always visible when not editing)

- **Position**: `position: fixed; right: 28px; bottom: 28px; z-index: 1200`
- **Character**: 88×88px, `cutecharacter.png` sprite + small inline-SVG wand on the right
- **Bob animation**: `translateY(-6px)` over 3s ease-in-out, infinite
- **Shadow**: soft radial ellipse beneath, animates with bob (scaleX 1 → 0.85)
- **Hover**: character tilts -2deg + bigger bob; sparkle SVGs near wand fade in; tooltip appears at `right: calc(100% + 14px)` after 600ms with copy `Leave a mark ✦` (or `Welcome back, [Name] ✦` for returning visitors)
- **Returning state**: conic-gradient ring rotates around character (8s linear, blurred 8px, opacity 0.35) — uses the full palette (#43CFA0 → #7B61FF → #F78CA0 → #FFAA5A → loop)

### 2. Entry animation (3-stage choreography)

| Stage | Time | What happens |
|---|---|---|
| 1. Glow draws | 0–800ms | Edge glow uses `clip-path` keyframes to sweep from top-left around the viewport, then settles into a slow `glowBreath` 5s loop. Box-shadow inset uses the card's gradient hues. |
| 2. Character to center | 800–1400ms | Character `position: fixed` transitions `left/top` over 600ms with `cubic-bezier(.4, 0, .2, 1)`. Page dims to `rgba(0,0,0,.35)`. |
| 3. Wand tap + card | 1400–1700ms | Wand rotates `-25deg`, sparkles intensify. Card flips in (`scale(.7) rotateY(-15deg) → scale(1) rotateY(0)`, 0.7s, `cubic-bezier(.2, 1.1, .3, 1)` for a slight overshoot). |

### 3. Visitor card (first visit only)

A passport/membership-card style overlay, ~440px wide, centered.

- **Card body**: gradient background (one of 6 presets), `border-radius: 22px`, padding `26px 24px 22px`, `min-height: 250px`. Layered noise: SVG turbulence filter at 12% opacity + two radial-gradient highlights, `mix-blend-mode: overlay`.
- **Header row**: "Hanara's World" in Instrument Serif italic, ✦ on the right
- **Editable name (the big italic line ON the card)**: transparent `<input>` styled in Instrument Serif italic 44px, dashed bottom border in `currentColor` at 18% opacity, becomes solid on focus. Refresh button (↺) sits to the right — circular, white-translucent, rotates 180deg on hover. Clicking ↺ regenerates the placeholder via the whimsical-name generator.
- **Whimsical name generator**: random pick from `NAME_FIRST` × `NAME_LAST` arrays (Cedar Quill, Moss Fern, Ivory Lark, Juniper Brook, Marlow Finch, Linen Drift, Sage Rook, …). Final name is `name.trim() || placeholder`, max 24 chars.
- **Meta grid (3 columns)**: VISITOR / ISSUED ON / NO. — labels in `SF Mono` 10px tracked +.14em at 65% opacity; values in 13px regular. NO. is 4-digit random. ISSUED ON is `toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })` uppercased.
- **Signature**: hand-drawn cubic Bezier path in `currentColor`, 1.4px stroke, 70% opacity, with `SIGNATURE` mono label.
- **Swatch row**: 6 circular gradient swatches, 32×32px, gap 12px. Selected: 2px white outer ring + 5px translucent halo. On hover: `scale(1.1)`. Card background transitions over 0.6s when changed.
- **ENTER button**: full-width 52px pill, `#0d0d0f` background, white text, letter-spacing .14em. Hover lightens to `#18181c`, click shrinks to 0.98.
- **Footnote** (below button, centered, 12px, 45% white): `Your annotations are saved to this browser`

### 4. Edit mode

#### Persistent edge glow
Same overlay element from entry, switches to `mode-breathing`: `glowBreath 5s ease-in-out infinite` only (no draw keyframes). Inset `box-shadow` uses the card's `--glow-from` and `--glow-to` plus four corner radial-gradient accents at `mix-blend-mode: screen`, opacity 0.35.

#### Toolbar
- **Default position**: bottom-center (`(viewportWidth - 540)/2`, `viewportHeight - 100`). Persisted in `localStorage["leaveAMark.toolbarPos"]`.
- **Draggable**: pointer-down anywhere on the toolbar background sets a drag origin; constrained to `[8, viewportWidth - 360]` × `[8, viewportHeight - 80]`.
- **Tools** (left-to-right, all icons are unicode glyphs): Pointer ↖, Pen ✎, Highlight ▐, Sticky ♠, Text T, Comment 💬, divider, Done ✦, collapse ⌄.
- **Active tool**: linear-gradient pill using the card's gradient + drop shadow. Label slides out from `max-width: 0 → 80px` over 0.25s.
- **Collapsed state**: 56×56px button shaped like a 4-pointed twinkle star (SVG path `M32 4 C 33.5 22, 42 30.5, 60 32 C 42 33.5, 33.5 42, 32 60 C 30.5 42, 22 33.5, 4 32 C 22 30.5, 30.5 22, 32 4 Z`) filled with the card's gradient, `glowBreath` animation. Click to expand.
- **Done flow**: clicking ✦ Done turns the toolbar into an inline confirm row: `Done for now? [Save + exit] [Keep going]` — no modal.

#### Annotation tools
- **Pen**: full-page `<svg>` overlay sized to `document.documentElement.scrollHeight`. Stores strokes as `{kind, color, points: [{x, y}]}` (page coords, not viewport — `clientX + scrollX`). 2.5px stroke, 95% opacity, `gradient.from`.
- **Highlight**: same canvas, 18px stroke, 32% opacity, `gradient.to`.
- **Sticky note**: 200×~140px, gradient-tinted cream paper (`color-mix(in oklab, var(--from) 30%, #fff8d8)`), random ±1.8deg rotation per note, paper-tape strip at the top, Caveat handwriting font 18px italic, `border-radius: 4px 18px 8px 14px` for an organic feel. Drag to move, ✕ to delete on hover.
- **Text label**: floating Instrument Serif italic 28px, white with `text-shadow: 0 2px 14px rgba(0,0,0,.7)`. No background unless editing.
- **Comment pin**: 22×22px gradient teardrop (`border-radius: 50% 50% 50% 4px`) + bubble (220–280px, dark glass, white text). Author line shows visitor's name + "just now".

#### Card settings panel (edit-mode access)
Clicking the launcher character during edit mode opens a 320px panel pinned at `right: 24px; bottom: 130px`:
- Live preview card (mini)
- Name field with ↺ random
- 6 swatch row (full color picker)
- Save button (white pill, black text)

#### Placement hint
When sticky/text/comment is selected, a top-center pill reads `click anywhere to place [a sticky note / text / a comment] · esc to exit`. Disappears on placement (tool resets to pointer).

### 5. Exit sequence

1. ✦ Done → inline confirm row
2. Save + exit → toolbar fades; glow runs `mode-fading` (opacity 0 over 1.5s)
3. Character runs `wave` keyframes (1.4s) — combination of translateY and rotation
4. Toast bottom-left: `See you next time, [Name] ✦` — `toastIn 0.4s` then `toastOut 0.4s` after 2.6s. 8px gradient dot with glow.
5. Phase returns to `idle`; tool resets to `pointer`.

### 6. Surrounding portfolio (already exists in the codebase)

The prototype includes a re-mock of the homepage so the annotation layer has real content to land on. **In the real codebase you do not need to touch the homepage** — drop `<LeaveAMark />` once at the root layout (e.g. `app/layout.tsx`) so it's available on every page.

The one homepage change implemented in the prototype is the **floating nav**:
- Default: docked at top, `position: fixed; top: 18px; left: 50%; translateX(-50%)`
- Pointer-down threshold of 4px before drag activates (so clicks on grip don't trigger jitter)
- Once dragged, position persists in `localStorage["hanara.navPos"]`
- Double-click the nav (anywhere except links) to dock back
- This is optional — feel free to keep the existing sticky nav if Hanara prefers.

---

## Design tokens

### Card gradients (id, name, from, to, on-card text color)

```ts
const GRADIENTS = [
  { id: "aurora",   name: "Aurora",   from: "#43CFA0", to: "#7B61FF", text: "#0a1820" },
  { id: "dusk",     name: "Dusk",     from: "#F78CA0", to: "#6B3FA0", text: "#1a0a1a" },
  { id: "ember",    name: "Ember",    from: "#FFAA5A", to: "#E040A0", text: "#1a0a0a" },
  { id: "frost",    name: "Frost",    from: "#89C5EA", to: "#C4A8F5", text: "#0a1020" },
  { id: "moss",     name: "Moss",     from: "#7EC8A0", to: "#3A9E8A", text: "#0a1a14" },
  { id: "midnight", name: "Midnight", from: "#1A1A3E", to: "#4B3F8A", text: "#e8e6ff" },
];
const gradCSS = (g) => `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)`;
```

### Z-index layers

| Layer | z-index |
|---|---|
| Floating nav | 50 |
| Leave-a-mark root | 1000 |
| Edge glow | 1100 |
| Dim overlay | 1150 |
| Pen canvas | 1250 |
| Annotation items | 1280 |
| Idle launcher | 1200 |
| Moving character (entry) | 1300 |
| Visitor card | 1400 |
| Placement hint | 1450 |
| Card settings panel | 1480 |
| Toolbar | 1500 |
| Toast | 1500 |
| Dev reset (remove in prod) | 1600 |

### Easing & timings

- Character corner ↔ center: `cubic-bezier(.4, 0, .2, 1)` over 600ms
- Card flip-in: `cubic-bezier(.2, 1.1, .3, 1)` over 700ms (slight overshoot)
- Bob: 3s ease-in-out infinite, ±6px translateY
- Glow draw: 1.6s ease (clip-path sweep)
- Glow breath: 5s ease-in-out infinite (filter brightness 0.85 ↔ 1.15)
- Wand tip pulse: 2.4s ease-in-out infinite
- Pop-in (sticky/comment): 0.3s — scale 0.5 → 1.06 → 1
- Toast: 0.4s in + 0.4s out after 2.6s hold

### Typography

- DM Sans (existing) — UI body
- Instrument Serif italic (existing) — card big name, settings titles, world label, text labels
- Caveat (new dependency) — sticky note handwriting; load via `next/font/google`
- SF Mono / ui-monospace — small caps labels (VISITOR, ISSUED ON, NO., SIGNATURE), tracked +.14em–.18em

### Storage shape

```ts
// localStorage["leaveAMark.v1"]
type VisitorCard = {
  id: string;          // "v" + random
  name: string;        // max 24 chars
  color: GradientId;   // see GRADIENTS
  no: string;          // 4-digit
  createdAt: string;   // pre-uppercased "APR 30, 2026"
  annotations: {
    items: Annotation[];   // sticky | text | comment
    strokes: Stroke[];     // pen | highlight
  };
};

type Annotation = {
  id: string;
  kind: "sticky" | "text" | "comment";
  x: number;           // page-coord (clientX + scrollX)
  y: number;
  text: string;
  author: string;
  _fresh?: boolean;    // first-edit flag, strip on save
};

type Stroke = {
  kind: "pen" | "highlight";
  color: string;       // hex
  points: { x: number; y: number }[];
};

// Auxiliary keys
// localStorage["leaveAMark.toolbarPos"] = { x, y }
// localStorage["hanara.navPos"]         = { x, y } | null
```

### Auto-save

- Every annotation mutation triggers an effect that writes the full card back.
- Also triggered on phase change to `editing → exiting`.
- Optionally add a passive 30s interval as the PRD calls out — the prototype relies on the per-mutation effect.

---

## Assets

- `assets/cutecharacter.png` — 115×116 PNG sprite of the floating character (provided by Hanara, included in this folder). Drop into `public/images/` in the Next.js app and reference as `/images/cutecharacter.png`.
- All icons are unicode glyphs (no SVG icon set needed).
- The wand and signature are inline SVG drawn from primitives — see the prototype JSX for the exact paths.

---

## Implementation checklist

- [ ] Add `<LeaveAMark />` to `app/layout.tsx` (mount once, available everywhere)
- [ ] Move `cutecharacter.png` to `public/images/`
- [ ] Add Caveat to the existing `next/font/google` block in `app/layout.tsx`
- [ ] Convert the prototype's flat CSS file to a CSS module (`LeaveAMark.module.css`) or styled-components, matching the existing `styles.module.css` convention
- [ ] Split into components: `LeaveAMark` (controller), `Character`, `EdgeGlow`, `VisitorCard`, `Toolbar`, `PenCanvas`, `AnnotationItem`, `CardSettings`, `Toast`
- [ ] Replace the prototype's vanilla CSS animations with Framer Motion variants if the rest of the codebase uses it
- [ ] Consider Konva.js / Fabric.js for the pen canvas if you anticipate richer brush behavior
- [ ] SSR-safe localStorage reads (guard with `typeof window !== "undefined"` or wrap in `useEffect`)
- [ ] Remove the `forget me` dev button before shipping
- [ ] Mobile: per the PRD, annotation tools are read-only on mobile in v1 — gate the launcher behind a viewport check or hide the toolbar on small screens

---

## Files in this bundle

- `Leave a Mark.html` — prototype entry point
- `portfolio.jsx` — the surrounding (mocked) portfolio shell + draggable nav
- `leaveAMark.jsx` — the entire annotation system
- `styles.css` — all styles (flat, not modular — convert as needed)
- `cutecharacter.png` — character sprite
- `PRD.md` — original product spec from Hanara

Open `Leave a Mark.html` in a browser to step through the full flow before implementing.
