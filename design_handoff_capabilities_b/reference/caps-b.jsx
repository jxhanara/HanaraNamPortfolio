/* ════════════════════════════════════════════════════════════
   CAPABILITIES B · Tabbed serif titles + detail rail
   Left column: 3 big italic capability titles stacked. Click one
   to set it active. Right column: detail copy for the active
   item. Stays in one viewport; mirrors About §04 Layout D's
   left-tabs/right-detail pattern.
   ──────────────────────────────────────────────────────────── */
function CapsB() {
  const { tweaks } = window.useTweaks();
  const [active, setActive] = React.useState(0);
  const cap = window.CAPS[active];
  const H = window.CAPS_HEAD;

  return (
    <window.BrandShell>
      <div className="wrap" style={{ paddingTop: 40, paddingBottom: 24 }}>
        <div className="capsB-head">
          <h2>
            {H.title.replace(H.italicWord, "")} <em>{H.italicWord} —</em>
          </h2>
          <p className="sub">{H.sub}</p>
        </div>

        <div className="capsB-stage">
          <div className="capsB-tabs">
            {window.CAPS.map((c, i) => (
              <button
                key={c.id}
                className={"capsB-tab" + (i === active ? " is-active" : "")}
                onClick={() => setActive(i)}
              >
                <span className="capsB-tab-num">
                  {tweaks.numberingOn ? c.num : "·"}
                </span>
                <span>
                  <span className="capsB-tab-title">{c.title}</span>
                  <span className="capsB-tab-sub">{c.oneLiner}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="capsB-detail" key={cap.id}>
            <span className="capsB-detail-eyebrow">
              {tweaks.numberingOn ? `${cap.num} · ` : ""}
              {cap.italicTitle}
            </span>
            <h3 className="capsB-detail-title capsB-fade-in">{cap.oneLiner}</h3>
            <div className="capsB-detail-body capsB-fade-in">
              {cap.paras.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </window.BrandShell>
  );
}

window.CapsB = CapsB;
