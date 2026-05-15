/* ════════════════════════════════════════════════════════════
   LAYOUT D — Hybrid (B's text placement + A's photo visibility)
   ─────────────────────────────────────────────────────────────
   Left column (≈36%):
     · top:    section label + headline + sublead
     · bottom: detail copy + nav (anchored bottom-left, B-style)
   Right column (≈64%):
     · large featured image (A-style hero) that fills the height
     · thumbnail rail (5 supporting photos) tucked under the hero
   ──────────────────────────────────────────────────────────── */
function LayoutD() {
  const photos = window.PHOTOS;
  const { idx, swap, go } = window.useActive(photos.length);
  const active = photos[idx];

  // supporting photos: everything that isn't active, capped at 5
  const supporting = photos.filter((_, i) => i !== idx).slice(0, 5);

  return (
    <section className="about-section">
      <div className="wrap">
        <window.SectionLabel num="04">Things I love, in no order</window.SectionLabel>

        <div className="D-stage">
          {/* LEFT column — title top, detail bottom-left */}
          <div className="D-left">
            <div className="D-left-top">
              <h2>
                Things I keep <em>coming back to.</em>
              </h2>
              <p className="lead">
                A loose archive — films I rewatch, places that shaped me, the
                dog that lets me work from home.
              </p>
            </div>

            <div className="D-left-bottom">
              <window.Detail
                photo={active}
                idx={idx}
                total={photos.length}
                isSwapping={swap}
              />
              <div style={{ marginTop: 14 }}>
                <window.NavArrows
                  onPrev={() => go(idx - 1)}
                  onNext={() => go(idx + 1)}
                />
              </div>
            </div>
          </div>

          {/* RIGHT column — featured hero + thumb rail */}
          <div className="D-right">
            <div className={"D-featured" + (swap ? " is-swapping" : "")}>
              <img src={active.src} alt={active.title} key={active.id} />
              <span className="ft-cap">
                {active.captionL} &nbsp;·&nbsp; {active.captionR}
              </span>
            </div>

            <div className="D-thumbs">
              {supporting.map((p) => {
                const i = photos.indexOf(p);
                return (
                  <window.Tile
                    key={p.id}
                    photo={p}
                    isActive={false}
                    onClick={() => go(i)}
                    showCaption={false}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.LayoutD = LayoutD;
