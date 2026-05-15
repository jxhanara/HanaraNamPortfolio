# Implementation Guide — Capabilities B in the Next.js codebase

This is the concrete port of the prototype into `components/home/CapabilitiesSection.tsx` + `components/home/styles.module.css`. Hero, project cards, and footer are untouched.

## Files touched
- `components/home/CapabilitiesSection.tsx` — replace entire file.
- `components/home/styles.module.css` — replace the existing `.about*` / `.columns` / `.column*` block with the new classes below.
- `app/globals.css` — add the `--color-accent-pink` token if it isn't there already.

## Step 1 — Add the accent token

In `app/globals.css`, inside the `:root { … }` block, add:

```css
:root {
  /* …existing tokens… */
  --color-accent-pink: #f3bdd1;
  --color-ink: #f3f1ec;
}
```

(`#f3f1ec` is the "warm white" already used on the About page; aliasing it here keeps colors consistent.)

## Step 2 — Replace `CapabilitiesSection.tsx`

Replace the entire file with:

```tsx
"use client";

import { useState } from "react";
import styles from "./styles.module.css";

type Capability = {
  id: string;
  num: string;
  title: string;
  eyebrow: string;
  oneLiner: string;
  paras: string[];
};

const CAPS: Capability[] = [
  {
    id: "ux",
    num: "01",
    title: "UX Design",
    eyebrow: "the craft",
    oneLiner: "Decisions that earn their place.",
    paras: [
      "I approach UX with a strong focus on purpose — every decision should serve a clear user need, not a slide.",
      "I work closely with engineers and product partners across Figma, website builders, or hand-rolled CSS — whatever the problem actually needs.",
      "I care about clarity, usability, and building experiences that hold up under real-world constraints.",
    ],
  },
  {
    id: "brand",
    num: "02",
    title: "Branding",
    eyebrow: "the voice",
    oneLiner: "Identities that feel intentional and human.",
    paras: [
      "I help brands shape visual identities that feel intentional — like someone behind it actually decided.",
      "I blend strategy and craft: type, color, motion, copy — every visual choice in service of the brand’s values and audience.",
      "I focus on cohesive systems that tell a clear story and can grow over time without falling apart.",
    ],
  },
  {
    id: "collab",
    num: "03",
    title: "Collaborate & Adapt",
    eyebrow: "the way",
    oneLiner: "Cross-functional by default, generous on purpose.",
    paras: [
      "I thrive in cross-functional environments and adapt quickly to what a team needs in the moment.",
      "Multiple hats or one deep problem — my goal is to bridge user needs and business goals through clear, honest communication.",
      "I value empathy, trust, and collaboration. I bring a positive, solutions-oriented mindset to every team I join.",
    ],
  },
];

export function CapabilitiesSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CAPS[activeIdx];

  return (
    <section className={styles.about} aria-labelledby="capabilities-heading">
      <div className={styles.aboutInner}>
        <header className={styles.aboutHeader}>
          <div>
            <p className={styles.aboutEyebrow}>What I do</p>
            <h2 id="capabilities-heading" className={styles.aboutTitle}>
              How I can <em>help</em> —
            </h2>
          </div>
          <p className={styles.aboutSubtitle}>
            Three lenses I keep returning to, in the order they tend to matter.
          </p>
        </header>

        <div className={styles.capsStage}>
          {/* Tabs */}
          <div className={styles.capsTabs} role="tablist">
            {CAPS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={i === activeIdx}
                className={`${styles.capsTab} ${i === activeIdx ? styles.isActive : ""}`}
                onClick={() => setActiveIdx(i)}
              >
                <span className={styles.capsTabNum}>{c.num}</span>
                <span className={styles.capsTabBody}>
                  <span className={styles.capsTabTitle}>{c.title}</span>
                  <span className={styles.capsTabSub}>{c.oneLiner}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Detail rail */}
          <div
            className={styles.capsDetail}
            aria-live="polite"
            key={active.id} /* re-mount triggers the fadeUp animation */
          >
            <span className={styles.capsDetailEyebrow}>
              {active.num} · {active.eyebrow}
            </span>
            <h3 className={styles.capsDetailTitle}>{active.oneLiner}</h3>
            <div className={styles.capsDetailBody}>
              {active.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### Notes
- The `"use client"` directive is required because of `useState`. If the file is already a client component, leave it.
- `key={active.id}` on the detail rail forces React to re-mount on tab change so the CSS `@keyframes fadeUp` animation re-fires.
- Keep the imports tree-shake-friendly — don't pull in framer-motion just for the fade.

## Step 3 — CSS in `components/home/styles.module.css`

### Delete
Remove the existing capability-section rules. They're easy to spot — anything with these class names:

- `.about`, `.aboutInner`, `.aboutHeader`, `.aboutTitle`, `.aboutSubtitle`
- `.columns`, `.column`, `.columnHeader`, `.columnIndex`, `.columnTitle`, `.columnBody`

…and their associated `@media` rules. **Keep** `.about` itself if it's used by another part of the page; otherwise nuke.

### Add
Paste this block. All values reuse the existing `--font-instrument-serif` / `--font-dm-sans` font variables and the new `--color-accent-pink`. No new design tokens needed beyond what step 1 added.

```css
/* ───────── Capabilities — "How I can help" ───────── */
.about {
  padding: var(--space-section) var(--space-x);
  background: var(--color-bg);
  color: var(--color-ink, #f3f1ec);
}

.aboutInner {
  max-width: var(--content-max);
  margin: 0 auto;
}

.aboutHeader {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 40px;
  padding-bottom: 36px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.aboutEyebrow {
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent-pink);
  margin: 0 0 14px;
}

.aboutTitle {
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  font-weight: 700;
  font-size: clamp(48px, 5.6vw, 80px);
  line-height: 0.96;
  letter-spacing: -0.02em;
  margin: 0;
}

.aboutTitle em {
  font-family: var(--font-instrument-serif), serif;
  font-style: italic;
  font-weight: 400;
  color: var(--color-accent-pink);
}

.aboutSubtitle {
  font-family: var(--font-instrument-serif), serif;
  font-style: italic;
  font-size: 18px;
  color: var(--color-muted);
  margin: 0;
  max-width: 28ch;
  text-align: right;
}

.capsStage {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 80px;
  padding-top: 36px;
  align-items: start;
}

/* ── Tabs ── */
.capsTabs {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.capsTab {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 20px;
  align-items: baseline;
  padding: 18px 0;
  border: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: transparent;
  width: 100%;
  text-align: left;
  cursor: pointer;
  color: var(--color-muted);
  font-family: inherit;
  transition: color 0.3s ease, padding-left 0.3s ease;
}

.capsTab:hover {
  padding-left: 10px;
  color: var(--color-ink, #f3f1ec);
}

.capsTab.isActive {
  color: var(--color-ink, #f3f1ec);
}

.capsTabNum {
  font-family: var(--font-instrument-serif), serif;
  font-style: italic;
  font-size: 22px;
  color: rgba(255, 255, 255, 0.42);
  transition: color 0.3s ease;
}

.capsTab.isActive .capsTabNum {
  color: var(--color-accent-pink);
}

.capsTabBody {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.capsTabTitle {
  font-family: var(--font-instrument-serif), serif;
  font-weight: 400;
  font-size: clamp(40px, 4.6vw, 64px);
  line-height: 1;
  letter-spacing: -0.02em;
  transition: font-style 0.3s ease, color 0.3s ease;
}

.capsTab.isActive .capsTabTitle {
  font-style: italic;
  color: var(--color-accent-pink);
}

.capsTabSub {
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  font-size: 13px;
  color: var(--color-muted);
  letter-spacing: 0.01em;
}

/* ── Detail rail ── */
.capsDetail {
  position: sticky;
  top: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  animation: capsFadeUp 0.32s ease;
}

.capsDetailEyebrow {
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent-pink);
}

.capsDetailTitle {
  font-family: var(--font-instrument-serif), serif;
  font-style: italic;
  font-weight: 400;
  font-size: clamp(36px, 4vw, 52px);
  line-height: 1.04;
  margin: 0;
  color: var(--color-ink, #f3f1ec);
}

.capsDetailBody p {
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #e8e5dd;
  margin: 0 0 16px;
  max-width: 48ch;
}

.capsDetailBody p:last-child {
  margin-bottom: 0;
}

@keyframes capsFadeUp {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ── Responsive ── */
@media (max-width: 800px) {
  .aboutHeader {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .aboutSubtitle {
    text-align: left;
  }

  .capsStage {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .capsDetail {
    position: static;
  }

  .capsTab {
    grid-template-columns: 36px 1fr;
    padding: 14px 0;
  }
}
```

## Step 4 — Verify

1. `npm run dev`, open `/`, scroll to the capabilities section.
2. On a 1440-wide window, the section fits in one viewport. Heading on top with a hairline rule underneath, tabs left, detail right.
3. Click each tab in order — detail copy crossfades, tab title turns italic + pink, number turns pink.
4. Hover over a tab — text shifts ~10px right, color brightens.
5. Tab through with the keyboard — every tab is focusable, Enter/Space activates it. (Arrow-key navigation between tabs is a nice-to-have if you want to wire it up.)
6. Resize to <800px — tabs and detail stack into one column, no sticky positioning.

## Open questions / edge cases
- **Reduced motion:** if `prefers-reduced-motion: reduce`, consider dropping the `capsFadeUp` animation and the `transition`s on `.capsTab`. Not blocking.
- **Auto-activate on hover:** the current design only activates on click. If you prefer hover-to-activate (no click required), bind `onMouseEnter` to `setActiveIdx(i)` — but be aware that fast cursor movement through the list can feel jumpy.
- **First-paint flicker:** because `useState` defaults to `0` (UX Design), there's no flicker. If you ever wire this up to a URL hash (`#branding`), make sure to read the hash on mount before first render.
