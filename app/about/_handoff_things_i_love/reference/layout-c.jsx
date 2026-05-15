/* ════════════════════════════════════════════════════════════
   LAYOUT C — Filmstrip Carousel + Side Detail
   Prev/active/next photos as a 3-card carousel (peeks on the
   sides), side detail rail on the right, full 8-tile filmstrip
   underneath with a progress bar. Most "interactive" feel.
   ──────────────────────────────────────────────────────────── */
function LayoutC() {
  const photos = window.PHOTOS;
  const { idx, swap, go } = window.useActive(photos.length);
  const active = photos[idx];
  const prev = photos[(idx - 1 + photos.length) % photos.length];
  const next = photos[(idx + 1) % photos.length];

  const progressWidth = 100 / photos.length;
  const progressLeft = progressWidth * idx;

  return (
    <section className="about-section">
      <div className="wrap">
        <window.SectionLabel num="04">Things I love, in no order</window.SectionLabel>

        <div className="C-head">
          <h2>
            Things I keep <em>coming back to.</em>
          </h2>
          <p className="sub">
            A loose archive — films I rewatch, places that shaped me, the dog
            that lets me work from home.
          </p>
        </div>

        <div className="C-stage">
          {/* carousel */}
          <div className="C-carousel">
            <div className="C-peek">
              <window.Tile
                photo={prev}
                isActive={false}
                onClick={() => go(idx - 1)}
                showCaption={false}
              />
            </div>
            <div className={"C-active" + (swap ? " is-swapping" : "")}>
              <window.Tile
                photo={active}
                isActive={true}
                onClick={() => {}}
              />
            </div>
            <div className="C-peek">
              <window.Tile
                photo={next}
                isActive={false}
                onClick={() => go(idx + 1)}
                showCaption={false}
              />
            </div>
          </div>

          {/* side detail */}
          <div className="C-right">
            <div className="C-detail">
              <window.Detail
                photo={active}
                idx={idx}
                total={photos.length}
                isSwapping={swap}
              />
              <div style={{ marginTop: 16 }}>
                <window.NavArrows
                  onPrev={() => go(idx - 1)}
                  onNext={() => go(idx + 1)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* filmstrip */}
        <div style={{ marginTop: 22 }}>
          <div className="C-strip-meta">
            <span>The archive</span>
            <span>
              <b>{String(idx + 1).padStart(2, "0")}</b> / {String(photos.length).padStart(2, "0")}
            </span>
          </div>
          <div className="C-progress" style={{ marginTop: 10, marginBottom: 4 }}>
            <span
              className="C-progress-fill"
              style={{ left: progressLeft + "%", width: progressWidth + "%" }}
            />
          </div>
          <div className="C-strip">
            {photos.map((p, i) => (
              <window.Tile
                key={p.id}
                photo={p}
                isActive={i === idx}
                onClick={() => go(i)}
                showCaption={false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.LayoutC = LayoutC;
