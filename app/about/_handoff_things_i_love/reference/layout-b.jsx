/* ════════════════════════════════════════════════════════════
   LAYOUT B — Magazine Spread
   Title + detail copy live in a column on the LEFT;
   an asymmetric 5-photo mosaic (1 hero + 4 supporting) lives
   on the RIGHT with a "+3 more" pill in the corner.
   Feels editorial; lots of breathing room.
   ──────────────────────────────────────────────────────────── */
function LayoutB() {
  const photos = window.PHOTOS;
  const { idx, swap, go } = window.useActive(photos.length);
  const active = photos[idx];

  // re-order so the active photo is always in the hero slot (#1)
  const order = [idx, ...photos.map((_, i) => i).filter((i) => i !== idx)];
  const display = order.map((i) => photos[i]);
  const hidden = display.length - 5;

  return (
    <section className="about-section">
      <div className="wrap">
        <window.SectionLabel num="04">Things I love, in no order</window.SectionLabel>

        <div className="B-stage">
          {/* LEFT — title + detail */}
          <div className="B-left">
            <div>
              <h2>
                Things I keep <em>coming back to.</em>
              </h2>
              <p className="lead" style={{ marginTop: 16 }}>
                A loose archive — films I rewatch, places that shaped me, the
                dog that lets me work from home.
              </p>
            </div>

            <div className="B-detail">
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

          {/* RIGHT — mosaic */}
          <div className="B-mosaic-wrap">
            <div className="B-mosaic">
              {display.map((p) => (
                <window.Tile
                  key={p.id}
                  photo={p}
                  isActive={p.id === active.id}
                  onClick={() => go(photos.indexOf(p))}
                />
              ))}
            </div>
            {hidden > 0 ? (
              <span className="B-more">+{hidden} more in the archive</span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

window.LayoutB = LayoutB;
