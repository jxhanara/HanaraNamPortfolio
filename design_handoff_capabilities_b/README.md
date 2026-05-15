# Handoff — Home page "How I can help you" (Capabilities B · Tabbed serif + detail rail)

## Overview
The current `<CapabilitiesSection />` is a 3-even-column layout with paragraph stacks (`01. UX Design`, `02. Branding`, `03. Collaborate & Adapt`). The columns get wall-of-text-y on desktop, and on a 1440×900 viewport the section uses far more vertical space than the content earns.

**Capabilities B** restructures it into a left-tabs / right-detail-rail interaction:
- **Left column** — three big italic capability titles, stacked. Hover/click sets one active.
- **Right column** — detail copy for the active capability (one-liner + paragraphs).

Goal: the section becomes interactive, reads as one editorial unit instead of three side-by-side, and fits comfortably in a single viewport.

## About the design files
The files in `reference/` are **design references created in HTML** — a vanilla React + Babel prototype. Your task is to **port Capabilities B into the existing Next.js codebase** (`components/home/CapabilitiesSection.tsx` + `components/home/styles.module.css`), reusing the same patterns already in place (CSS Modules, the brand tokens in `globals.css`). Do not introduce a new styling library.

## Fidelity
**High-fidelity.** Final copy, layout, typography, and behavior are decided. Match the spec.

## Files in this bundle
```
design_handoff_capabilities_b/
├── README.md                              ← orientation (you are here)
├── PRD.md                                 ← problem, layout spec, acceptance criteria
├── IMPLEMENTATION.md                      ← exact code changes to make
├── reference/
│   ├── Portfolio — Home redesign.html     ← interactive prototype (open in a browser)
│   ├── home-styles.css                    ← prototype CSS (look for the CAPABILITIES B section)
│   ├── caps-b.jsx                         ← prototype React component
│   ├── home-shared.jsx                    ← shared bits used by the prototype
│   ├── home-data.jsx                      ← copy + capability data records
│   └── original/
│       ├── CapabilitiesSection.tsx        ← your current source file (before)
│       ├── globals.css                    ← your current globals
│       └── layout.tsx                     ← root layout (fonts) — no changes needed
```

## Read order
1. **PRD.md** — what's changing and why, plus acceptance criteria.
2. **IMPLEMENTATION.md** — the concrete diff to apply.
3. **reference/Portfolio — Home redesign.html** — open and click on the Capabilities B artboard. Tab through the three titles to feel the interaction.

## Scope
**In scope:**
- The `<section className={styles.about}>` block rendered by `CapabilitiesSection.tsx`.
- The `.about*` / `.columns` / `.column*` CSS in `components/home/styles.module.css`.

**Out of scope:**
- The hero, the project cards (`<ProjectCard />`), and the MediaStrip blocks — leave untouched.
- Mobile layout below 800px — current responsive rules can stay; this PRD covers desktop ≥800px.
- Copy in other sections.
