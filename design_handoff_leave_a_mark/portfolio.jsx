/* global React */
const { useState, useEffect, useRef } = React;

// ---------- Hero ----------
function Hero() {
  return (
    <section className="hero">
      <div className="heroInner">
        <div className="heroTop">
          <p className="heroGreeting">Hey there ¨̮ I'm Hanara —</p>
          <div className="heroVisual" aria-hidden>
            <svg viewBox="0 0 360 230" width="100%" height="100%">
              <defs>
                <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#89c5ea" stopOpacity=".25" />
                  <stop offset="1" stopColor="#c4a8f5" stopOpacity=".15" />
                </linearGradient>
              </defs>
              <rect x="40" y="30" width="280" height="170" rx="20" fill="url(#hg)" />
              <text x="180" y="120" textAnchor="middle" fill="#aeb3bc"
                style={{ font: "italic 14px var(--font-serif)" }}>
                hero animation
              </text>
            </svg>
          </div>
        </div>
        <p className="heroLead">
          I design thoughtful interfaces for complex systems, working
          cross-functionally with engineers, researchers, and product teams to
          support real human decision-making.
        </p>
        <div className="heroMetaRow">
          <span className="heroStatusDot" aria-hidden />
          <p className="heroMeta">
            Currently pursuing a Master&apos;s in Human-Computer Interaction at{" "}
            <a href="#cmu">Carnegie Mellon University</a>.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- Project ----------
function ProjectThumb({ label }) {
  return (
    <div className="thumbWrap" data-thumb={label}>
      <div className="thumbInner">
        <span className="thumbLabel">{label} preview</span>
      </div>
    </div>
  );
}

function ProjectCard({ title, desc, date, label, idAttr }) {
  return (
    <div className="projectBlock" id={idAttr}>
      <div className="projectStack">
        <div className="projectHead">
          <div>
            <h2 className="projectTitle">{title}</h2>
            <div className="projectDesc">{desc}</div>
          </div>
          <p className="projectDate">{date}</p>
        </div>
        <ProjectThumb label={label} />
      </div>
    </div>
  );
}

// ---------- Capabilities ----------
const CAPS = [
  {
    n: "01.",
    h: "UX Design",
    p: [
      "I approach UX design with a strong focus on purpose. Every decision should serve a clear user need.",
      "I work closely with engineers and product partners to design seamless experiences across desktop and mobile.",
      "I care deeply about clarity, usability, and building experiences that work within real-world constraints.",
    ],
  },
  {
    n: "02.",
    h: "Branding",
    p: [
      "I enjoy helping brands shape visual identities that feel intentional and human.",
      "My approach blends strategy and creativity, from typography and color to making sure every visual decision supports the brand.",
      "I focus on creating cohesive systems that tell a clear story and can scale over time.",
    ],
  },
  {
    n: "03.",
    h: "Collaborate & Adapt",
    p: [
      "I thrive in cross-functional environments and adapt quickly to what a team needs.",
      "Whether wearing multiple hats or focusing deeply on one problem, I bridge user needs and business goals through clear communication.",
      "I value empathy, trust, and collaboration, with a positive, solutions-oriented mindset.",
    ],
  },
];

function Capabilities() {
  return (
    <section className="about">
      <div className="aboutInner">
        <div className="aboutHeader">
          <h2 className="aboutTitle">How I can help you</h2>
          <p className="aboutSubtitle">
            Combining creativity with strategic thinking to deliver exceptional results
          </p>
        </div>
        <div className="columns">
          {CAPS.map((c) => (
            <article className="column" key={c.n}>
              <div className="columnHeader">
                <p className="columnIndex">{c.n}</p>
                <h3 className="columnTitle">{c.h}</h3>
              </div>
              <div className="columnBody">
                {c.p.map((t, i) => <p key={i}>{t}</p>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Footer / Nav ----------
function SiteNav() {
  const NAV_KEY = "hanara.navPos";
  const ref = React.useRef();
  const drag = React.useRef(null);
  // null = docked at top default. Object {x,y} = user has moved it.
  const [pos, setPos] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(NAV_KEY)); } catch { return null; }
  });

  React.useEffect(() => {
    if (pos) localStorage.setItem(NAV_KEY, JSON.stringify(pos));
    else localStorage.removeItem(NAV_KEY);
  }, [pos]);

  const onPointerDown = (e) => {
    if (e.target.closest("a")) return;
    const r = ref.current.getBoundingClientRect();
    drag.current = { dx: e.clientX - r.left, dy: e.clientY - r.top, moved: false, startX: e.clientX, startY: e.clientY };
    ref.current.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dxAbs = Math.abs(e.clientX - drag.current.startX);
    const dyAbs = Math.abs(e.clientY - drag.current.startY);
    if (!drag.current.moved && dxAbs < 4 && dyAbs < 4) return;
    drag.current.moved = true;
    ref.current.classList.add("dragging");
    const x = e.clientX - drag.current.dx;
    const y = e.clientY - drag.current.dy;
    const w = ref.current?.offsetWidth || 520;
    setPos({
      x: Math.max(8, Math.min(window.innerWidth - w - 8, x)),
      y: Math.max(8, Math.min(window.innerHeight - 80, y)),
    });
  };
  const onPointerUp = () => {
    drag.current = null;
    ref.current?.classList.remove("dragging");
  };

  const onResetDoubleClick = (e) => {
    if (e.target.closest("a")) return;
    setPos(null);
  };

  const floating = !!pos;
  const style = floating ? { left: pos.x, top: pos.y } : undefined;

  return (
    <header
      className={`navFloat ${floating ? "floating" : "docked"}`}
      ref={ref}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDoubleClick={onResetDoubleClick}
      title={floating ? "Double-click to dock back" : "Drag to float"}
    >
      <div className="navFloatInner">
        <span className="navDragGrip" aria-hidden>
          <span /><span /><span /><span /><span /><span />
        </span>
        <a href="#" className="navLogoLink" aria-label="Hanara Nam home">
          <span className="navLogoMark">
            <span className="navLogoMarkInner">hn</span>
          </span>
        </a>
        <nav className="navFloatLinks" aria-label="Primary">
          <a className="navLink" href="#">Home</a>
          <a className="navLink" href="#">About</a>
          <a className="navLink" href="#portfolios">Work</a>
          <a className="navLink" href="#">Resume</a>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="footer">
      <p className="footerTitle">Let&apos;s work together : )</p>
      <p className="footerLine">
        I&apos;m always open to discussing new projects and opportunities
      </p>
      <div className="pills">
        <a className="pill pillLight" href="#"><span>Email me</span></a>
        <a className="pill pillDark" href="#"><span>LinkedIn</span></a>
        <a className="pill pillDark" href="#"><span>Resume</span></a>
      </div>
    </footer>
  );
}

// ---------- Portfolio shell ----------
function Portfolio() {
  return (
    <div className="page">
      <SiteNav />
      <main className="main">
        <Hero />
        <div id="portfolios" className="portfolios">
          <ProjectCard
            idAttr="trippy"
            title="TRIPPY"
            desc="An intelligent travel planning app I designed as the sole Product Designer at Trippy, a startup focused on AI-powered itinerary planning and local discovery."
            date="2024 - 2025"
            label="Trippy"
          />
          <ProjectCard
            title="Bumble Flow"
            desc="Redesigning dating from passive matching to active coordination — helping users turn matches into real plans through shared intent and availability."
            date="2026"
            label="Bumble Flow"
          />
          <ProjectCard
            title="UI for AI"
            desc="coming soon..."
            date="2025 - 2026"
            label="UI for AI"
          />
        </div>
        <Capabilities />
      </main>
      <SiteFooter />
    </div>
  );
}

window.Portfolio = Portfolio;
