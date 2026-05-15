/* ════════════════════════════════════════════════════════════
   Shared components + tweaks store for home redesign
   ──────────────────────────────────────────────────────────── */

const { useState, useEffect, useContext, createContext, useCallback } = React;

/* ── Tweaks store ──────────────────────────────────────────── */
/* A simple shared object on window + a React context that
   re-renders all consumers when any tweak changes. */

const DEFAULT_TWEAKS = {
  accentOn: true,        // pink accent
  kikiOn: true,          // show Kiki Lottie placeholder
  numberingOn: true,     // section numbering 01./02./03.
  heroCopyIdx: 0,        // which HERO_COPY entry
};

const TweaksCtx = createContext({
  tweaks: DEFAULT_TWEAKS,
  setTweak: () => {},
});

function TweaksProvider({ children }) {
  const [tweaks, setTweaks] = useState(DEFAULT_TWEAKS);
  const setTweak = useCallback((keyOrObj, value) => {
    setTweaks((prev) => {
      if (typeof keyOrObj === "string") return { ...prev, [keyOrObj]: value };
      return { ...prev, ...keyOrObj };
    });
  }, []);
  return (
    <TweaksCtx.Provider value={{ tweaks, setTweak }}>
      {children}
    </TweaksCtx.Provider>
  );
}

function useTweaks() {
  return useContext(TweaksCtx);
}

/* ── Brand-token wrapper ───────────────────────────────────── */
/* Every artboard sits inside a <BrandShell> which:
   - applies the dark portfolio bg
   - swaps the accent var based on Tweaks
   - sets font vars to match the real site (Instrument Serif + DM Sans) */
function BrandShell({ children, padX = 80 }) {
  const { tweaks } = useTweaks();
  const accent = tweaks.accentOn ? "#f3bdd1" : "#f3f1ec";
  return (
    <div
      className="brand-shell"
      style={{
        "--accent": accent,
        "--accent-muted": tweaks.accentOn ? "rgba(243,189,209,0.18)" : "rgba(243,241,236,0.12)",
        paddingLeft: padX,
        paddingRight: padX,
      }}
    >
      {children}
    </div>
  );
}

/* ── Mini fake nav (visual context only) ───────────────────── */
function FakeNav() {
  return (
    <nav className="fake-nav" aria-hidden>
      <span className="fn-mark">Hanara Nam</span>
      <span className="fn-links">
        <a>Work</a>
        <a>About</a>
        <a>Resume</a>
        <a className="fn-cta">Get in touch</a>
      </span>
    </nav>
  );
}

/* ── Kiki Lottie stand-in ──────────────────────────────────── */
/* The real site uses HeroLottie (an animated Kiki on a broom).
   For the design prototype we draw a soft silhouette suggestion in
   SVG so the layouts read correctly. The handoff doc keeps Lottie. */
function KikiPlaceholder({ size = 220, hueShift = 0 }) {
  return (
    <svg
      viewBox="0 0 240 180"
      width={size}
      height={(size * 180) / 240}
      role="img"
      aria-label="Kiki on a broom (Lottie placeholder)"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="broom" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#7a5b2a" />
          <stop offset="60%" stopColor="#caa05a" />
          <stop offset="100%" stopColor="#e6c989" />
        </linearGradient>
      </defs>
      {/* broom handle */}
      <rect x="40" y="110" width="120" height="5" rx="2" fill="url(#broom)" />
      {/* broom bristles */}
      <g stroke="url(#broom)" strokeWidth="2.4" strokeLinecap="round">
        <line x1="160" y1="112" x2="220" y2="92" />
        <line x1="160" y1="112" x2="222" y2="104" />
        <line x1="160" y1="112" x2="224" y2="116" />
        <line x1="160" y1="112" x2="222" y2="128" />
        <line x1="160" y1="112" x2="220" y2="140" />
      </g>
      {/* witch body — purple dress */}
      <path
        d="M70 110 L130 110 L138 75 Q120 50 95 60 Q80 70 70 110 Z"
        fill="#4a3a5e"
      />
      {/* witch arm holding broom */}
      <path
        d="M118 88 Q140 96 158 110 L158 116 Q140 104 118 96 Z"
        fill="#4a3a5e"
      />
      {/* witch head + red bow */}
      <circle cx="100" cy="58" r="13" fill="#e8c2a8" />
      <path d="M95 47 L100 50 L105 47 L103 41 L97 41 Z" fill="#d24a4a" />
      {/* hair tuft */}
      <path d="M88 56 Q90 48 100 47 Q108 50 110 58 Q104 54 96 56 Z" fill="#3a2820" />
      {/* yellow satchel */}
      <ellipse cx="142" cy="100" rx="14" ry="11" fill="#e0a040" />
      <path d="M134 95 Q142 88 150 95" stroke="#a87520" strokeWidth="1.5" fill="none" />
      {/* black cat — tiny */}
      <ellipse cx="58" cy="100" rx="8" ry="6" fill="#1a1311" />
      <polygon points="52,96 54,90 57,95" fill="#1a1311" />
      <polygon points="64,96 62,90 59,95" fill="#1a1311" />
      <circle cx="55" cy="99" r="0.9" fill="#f3bdd1" />
      <circle cx="61" cy="99" r="0.9" fill="#f3bdd1" />
    </svg>
  );
}

function Kiki({ size }) {
  const { tweaks } = useTweaks();
  if (!tweaks.kikiOn) return null;
  return <KikiPlaceholder size={size} />;
}

/* ── Status dot (pulsing) ──────────────────────────────────── */
function StatusDot({ color = "#89c5ea" }) {
  return <span className="status-dot" style={{ background: color }} />;
}

/* ── Hero copy helpers ─────────────────────────────────────── */
/* Renders the lead paragraph; per-layout CSS (.heroA/.heroB/.heroC
   .hero-lead) controls the size — do NOT set fontSize inline or it
   will override the clamp() values. */
function HeroLead({ copy }) {
  return (
    <p className="hero-lead">
      {copy.leadParts.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <em
            key={i}
            className={part.accent ? "hero-lead-accent" : ""}
            style={{ fontStyle: part.italic ? "italic" : "normal" }}
          >
            {part.text}
          </em>
        )
      )}
    </p>
  );
}

/* ── Page section section-label (numbered) — used by Caps when
   numbering tweak is on; on Home overall sections we keep untagged. */
function NumIndex({ num }) {
  const { tweaks } = useTweaks();
  if (!tweaks.numberingOn) return null;
  return <span className="num-idx">{num}.</span>;
}

window.TweaksProvider = TweaksProvider;
window.TweaksCtx = TweaksCtx;
window.useTweaks = useTweaks;
window.BrandShell = BrandShell;
window.FakeNav = FakeNav;
window.Kiki = Kiki;
window.KikiPlaceholder = KikiPlaceholder;
window.StatusDot = StatusDot;
window.HeroLead = HeroLead;
window.NumIndex = NumIndex;
