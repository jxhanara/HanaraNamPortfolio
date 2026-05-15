# Implementation Guide — Layout D in the Next.js codebase

> Handoff folder: `app/about/_handoff_things_i_love/` (design reference only).

This is the concrete port of the prototype into `app/about/page.tsx` + `about.module.css`. The §04 block is the only thing that changes; §01/02/03 stay as-is.

## Files touched
- `app/about/page.tsx` — replace the `<section className={styles.loves}>` block.
- `app/about/about.module.css` — remove the `.collage`/`.c1…c9`/`.archiveDetail` blocks; add the `.lovesStage` / `.lovesLeft` / `.lovesFeatured` / `.lovesThumbs` blocks.

## Step 1 — Replace the §04 JSX in `page.tsx`

Find this block (currently near the bottom of the file):

```tsx
{/* 04 LOVES / COLLAGE */}
<section className={`${styles.section} ${styles.loves}`}>
  <div className={styles.wrap}>
    <div className={styles.sectionLabel}>
      <span className={styles.num}>04 —</span> Things I love, in no order
    </div>
    <div className={styles.lovesHead}> … </div>
    <div className={`${styles.collage} ${styles.collageDimmed}`} id="collage">
      {ARCHIVE.map((item, idx) => ( <CollageTile … /> ))}
    </div>
    <div className={`${styles.archiveDetail} …`}> … </div>
  </div>
</section>
```

Replace it with:

```tsx
{/* 04 LOVES / FEATURED + RAIL */}
<section className={`${styles.section} ${styles.loves}`}>
  <div className={styles.wrap}>
    <div className={styles.sectionLabel}>
      <span className={styles.num}>04 —</span> Things I love, in no order
    </div>

    <div className={styles.lovesStage}>
      {/* LEFT — title top, detail bottom */}
      <div className={styles.lovesLeft}>
        <div className={styles.lovesLeftTop}>
          <h2 className={styles.lovesHeadline}>
            Things I keep <em>coming back to.</em>
          </h2>
          <p className={styles.lovesLead}>
            A loose archive — films I rewatch, places that shaped me, the dog
            that lets me work from home.
          </p>
        </div>

        <div
          className={`${styles.lovesDetail} ${isSwapping ? styles.lovesDetailSwapping : ""}`}
          aria-live="polite"
        >
          <div className={styles.lovesDetailHead}>
            <span className={styles.dEyebrow}>Now viewing —</span>
            <span className={styles.dCounter}>
              <b>{String(activeIdx + 1).padStart(2, "0")}</b>{" "}
              <i>/ {String(ARCHIVE.length).padStart(2, "0")}</i>
            </span>
          </div>
          <h3 className={styles.dTitle}>{active.title}</h3>
          <p className={styles.dMeta}>{active.meta}</p>
          <p className={styles.dBlurb}>{active.blurb}</p>
          {active.linkLabel && active.link ? (
            <a
              className={styles.dLink}
              href={active.link}
              {...(active.linkExternal
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {active.linkLabel}
            </a>
          ) : null}

          <div className={styles.lovesNav}>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => selectArchive(activeIdx - 1)}
              aria-label="Previous photo"
            >
              ←
            </button>
            <button
              type="button"
              className={styles.navBtn}
              onClick={() => selectArchive(activeIdx + 1)}
              aria-label="Next photo"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT — featured hero + 5-up thumb rail */}
      <div className={styles.lovesRight}>
        <figure
          className={`${styles.lovesFeatured} ${isSwapping ? styles.lovesFeaturedSwapping : ""}`}
          aria-label={active.alt}
        >
          {active.imgSrc ? (
            <Image
              src={active.imgSrc}
              alt={active.alt}
              fill
              sizes="(max-width: 1000px) 100vw, 60vw"
              style={{ objectFit: "cover" }}
              priority={activeIdx === 0}
            />
          ) : (
            <div className={styles.imgPlaceholder}>{active.title}</div>
          )}
          <figcaption className={styles.lovesFeaturedCap}>
            {active.captionLeft} &nbsp;·&nbsp; {active.captionRight}
          </figcaption>
        </figure>

        <div className={styles.lovesThumbs}>
          {ARCHIVE.filter((_, i) => i !== activeIdx)
            .slice(0, 5)
            .map((item) => {
              const realIdx = ARCHIVE.findIndex((p) => p.id === item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  className={styles.lovesThumb}
                  onClick={() => selectArchive(realIdx)}
                  aria-label={`View ${item.title}`}
                >
                  {item.imgSrc ? (
                    <Image
                      src={item.imgSrc}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 1000px) 50vw, 12vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : null}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  </div>
</section>
```

### Notes on the JSX
- **Remove** the `CollageTile` helper component — Layout D doesn't use it. The `GRID_CLASS_MAP` constant and the `gridClass` property on each `ARCHIVE` item can also be deleted.
- **Keep** the `ARCHIVE` data array, the `useState`/`isSwapping`/`selectArchive` logic — unchanged.
- **Keep** the `active.linkLabel/link/linkExternal` Thor IG fallback.
- The thumb rail's `.slice(0, 5)` mirrors the prototype. If you'd rather show a fixed window (e.g. the 5 photos at indices `[activeIdx+1 … activeIdx+5]` mod 8), feel free — both satisfy the AC.

## Step 2 — CSS changes in `about.module.css`

### Delete
Remove these blocks (they were specific to the old collage):
- `.collage` and `.collageDimmed`
- `.c1`, `.c3`, `.c4`, `.c5`, `.c6`, `.c7`, `.c8`, `.c9` (all positional grid classes)
- `.collage figure`, `.collage figure::before`, `.collage figure:hover`, `.collage figure.isActive`, `.collage figcaption`, `.collage figcaption span`, etc.
- `.archiveDetail`, `.archiveDetailSwapping`, `.dKey`, `.dKeyTop`, `.dHint`, `.dBlurbCol`
- The `.lovesHead` grid (replaced by `.lovesLeftTop` rules below)
- The responsive `@media (max-width: 1000px)` block for `.c1`–`.c9` and `.collage`

### Keep
- `.dEyebrow`, `.dCounter`, `.dTitle`, `.dMeta`, `.dBlurb`, `.dLink` — reuse these as-is (the JSX above references them). If a value differs from the PRD spec (e.g. `.dTitle` font-size), update it in place.

### Add
Paste the following into the `/* ───── 04 loves ───── */` region of `about.module.css`:

```css
/* ───────── 04 loves · featured + rail ───────── */
.lovesStage {
  margin-top: 32px;
  display: grid;
  grid-template-columns: minmax(340px, 0.62fr) 1.4fr;
  gap: clamp(32px, 4vw, 64px);
  min-height: 720px;
  align-items: stretch;
}

.lovesLeft {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 8px;
  min-width: 0;
}

.lovesHeadline {
  font-family: var(--font-instrument-serif), serif;
  font-weight: 400;
  font-size: clamp(48px, 5.4vw, 72px);
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin: 0;
  text-wrap: balance;
}

.lovesHeadline em {
  font-style: italic;
  color: var(--about-accent);
}

.lovesLead {
  font-family: var(--font-instrument-serif), serif;
  font-style: italic;
  font-size: 18px;
  color: var(--about-muted);
  margin: 16px 0 0;
  max-width: 28ch;
}

.lovesDetail {
  border-top: 1px solid var(--about-line);
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: opacity 0.25s, transform 0.25s;
}

.lovesDetailHead {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.lovesDetailSwapping .dTitle,
.lovesDetailSwapping .dMeta,
.lovesDetailSwapping .dBlurb {
  opacity: 0;
  transform: translateY(4px);
}

.lovesNav {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.navBtn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid var(--about-line);
  background: transparent;
  color: var(--about-ink);
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.navBtn:hover {
  border-color: var(--about-accent);
  color: var(--about-accent);
}

.lovesRight {
  display: grid;
  grid-template-rows: 1fr 130px;
  gap: 14px;
  min-height: 0;
}

.lovesFeatured {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #161513;
  min-height: 0;
  margin: 0;
}

.lovesFeatured :global(img) {
  transition: opacity 0.4s;
}

.lovesFeaturedSwapping :global(img) {
  opacity: 0.35;
}

.lovesFeaturedCap {
  position: absolute;
  left: 18px;
  bottom: 16px;
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  font-weight: 500;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  padding: 6px 10px;
  border-radius: 99px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  z-index: 2;
}

.lovesThumbs {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  min-height: 0;
}

.lovesThumb {
  position: relative;
  border: 0;
  padding: 0;
  margin: 0;
  height: 100%;
  border-radius: 6px;
  overflow: hidden;
  background: #161513;
  cursor: pointer;
  opacity: 0.72;
  filter: saturate(0.92);
  transition: transform 0.35s cubic-bezier(0.2, 0.7, 0.2, 1),
    filter 0.35s, opacity 0.35s;
  outline: 1px solid transparent;
  outline-offset: -1px;
}

.lovesThumb:hover {
  transform: translateY(-3px);
  opacity: 1;
  filter: saturate(1);
}

.lovesThumb:focus-visible {
  outline: 2px solid var(--about-accent);
  outline-offset: 2px;
}
```

### Update the mobile rules
Replace the old `@media (max-width: 1000px)` collage rules with:

```css
@media (max-width: 1000px) {
  .lovesStage {
    grid-template-columns: 1fr;
    min-height: 0;
    gap: 32px;
  }

  .lovesRight {
    grid-template-rows: none;
    gap: 12px;
  }

  .lovesFeatured {
    aspect-ratio: 4 / 5;
  }

  .lovesThumbs {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 100px;
  }

  /* show only 3 thumbs on small screens — rest reachable via arrows */
  .lovesThumb:nth-child(n + 4) {
    display: none;
  }
}
```

## Step 3 — Verify

Once you've made the changes, check:

1. `npm run dev`, open `/about`, scroll to §04.
2. On a 1440-wide window, the featured image is large (≈600px wide, ≈540px tall), the headline sits top-left, the detail copy sits bottom-left, and the rail is 5 thumbs wide directly under the hero.
3. Click each thumb → the hero swaps with a soft fade and the title/blurb on the left also fades+slides.
4. Click ← / → → cycles through all 8 photos (wraps at the ends).
5. Thor's IG link renders when Thor is active; opens in a new tab.
6. Tab through with the keyboard — focus visibly lands on each thumb and on the arrow buttons.
7. Resize to <1000px — left column stacks above right; thumb rail collapses to a 3-up grid; the hero gets a 4:5 aspect ratio.

## Open questions / edge cases
- **Thumb rail composition:** `slice(0, 5)` means the same 5 photos always trail the same active photo; if you want a "next 5 in order" feel instead, swap to `[...ARCHIVE.slice(idx+1), ...ARCHIVE.slice(0, idx)].slice(0, 5)`. Either passes AC; pick what feels more intentional.
- **Priority loading:** the prototype set `priority` on the first photo only. If you want Vercel's LCP to be the §04 hero, leave that as-is; if §01 portrait is the LCP target, remove the priority here.
- **Reduced motion:** if the user has `prefers-reduced-motion: reduce`, consider dropping the `transition` on `.lovesFeatured img` and `.lovesDetail` so the swap is instant. Not blocking.
