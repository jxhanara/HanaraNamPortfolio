/* Shared bits used by all three layout variants */
const { useState } = React;

function SectionLabel({ num, children }) {
  return (
    <div className="section-label">
      <span className="num">{num} —</span> {children}
    </div>
  );
}

function Detail({ photo, idx, total, isSwapping }) {
  return (
    <div className={"detail" + (isSwapping ? " is-swapping" : "")}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span className="eyebrow">Now viewing —</span>
        <span className="counter">
          <b>{String(idx + 1).padStart(2, "0")}</b>
          <i>/ {String(total).padStart(2, "0")}</i>
        </span>
      </div>
      <h3 className="d-title">{photo.title}</h3>
      <p className="d-meta">{photo.meta}</p>
      <p className="d-blurb">{photo.blurb}</p>
      {photo.link ? (
        <a className="d-link" href={photo.link.href}>
          {photo.link.label}
        </a>
      ) : null}
    </div>
  );
}

function Tile({ photo, isActive, onClick, showCaption = true }) {
  return (
    <figure
      className={"tile" + (isActive ? " is-active" : "")}
      onClick={onClick}
      role="button"
      aria-pressed={isActive}
      aria-label={`View ${photo.title}`}
    >
      <img src={photo.src} alt={photo.title} loading="lazy" />
      {showCaption ? (
        <figcaption className="tile-cap">
          <span>{photo.captionL}</span>
          <span>{photo.captionR}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}

function NavArrows({ onPrev, onNext }) {
  return (
    <div className="nav-row">
      <button className="nav-btn" onClick={onPrev} aria-label="Previous">←</button>
      <button className="nav-btn" onClick={onNext} aria-label="Next">→</button>
    </div>
  );
}

/* Hook: active index + swap fade */
function useActive(total) {
  const [idx, setIdx] = useState(0);
  const [swap, setSwap] = useState(false);
  function go(next) {
    const wrapped = (next + total) % total;
    if (wrapped === idx) return;
    setSwap(true);
    setTimeout(() => {
      setIdx(wrapped);
      setSwap(false);
    }, 180);
  }
  return { idx, swap, go };
}

window.SectionLabel = SectionLabel;
window.Detail = Detail;
window.Tile = Tile;
window.NavArrows = NavArrows;
window.useActive = useActive;
