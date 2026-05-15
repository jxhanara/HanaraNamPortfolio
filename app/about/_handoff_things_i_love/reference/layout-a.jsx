/* ════════════════════════════════════════════════════════════
   LAYOUT A — Featured Hero + Thumb Rail
   Big active image on the left (≈60% width), copy + 7 thumbs
   stacked on the right. Detail sits inline next to the image
   so nothing has to scroll.
   ──────────────────────────────────────────────────────────── */
function LayoutA() {
  const photos = window.PHOTOS;
  const { idx, swap, go } = window.useActive(photos.length);
  const active = photos[idx];

  return (
    <section className="about-section">
      <div className="wrap">
        <window.SectionLabel num="04">Things I love, in no order</window.SectionLabel>

        <div className="A-head">
          <h2>
            Things I keep <em>coming back to.</em>
          </h2>
          <p className="sub">
            A loose archive — films I rewatch, places that shaped me, the dog
            that lets me work from home.
          </p>
        </div>

        <div className="A-stage">
          <div className={"A-featured" + (swap ? " is-swapping" : "")}>
            <img src={active.src} alt={active.title} key={active.id} />
            <span className="ft-cap">
              {active.captionL} &nbsp;·&nbsp; {active.captionR}
            </span>
          </div>

          <div className="A-right">
            <div className="A-detail">
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

            <div>
              <div className="A-thumb-label">
                <span>The archive</span>
                <span>
                  {String(idx + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
                </span>
              </div>
              <div className="A-thumbs" style={{ marginTop: 14 }}>
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
        </div>
      </div>
    </section>
  );
}

window.LayoutA = LayoutA;
