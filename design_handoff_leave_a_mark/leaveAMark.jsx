/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ---------- Gradients ----------
const GRADIENTS = [
  { id: "aurora",   name: "Aurora",   from: "#43CFA0", to: "#7B61FF", text: "#0a1820" },
  { id: "dusk",     name: "Dusk",     from: "#F78CA0", to: "#6B3FA0", text: "#1a0a1a" },
  { id: "ember",    name: "Ember",    from: "#FFAA5A", to: "#E040A0", text: "#1a0a0a" },
  { id: "frost",    name: "Frost",    from: "#89C5EA", to: "#C4A8F5", text: "#0a1020" },
  { id: "moss",     name: "Moss",     from: "#7EC8A0", to: "#3A9E8A", text: "#0a1a14" },
  { id: "midnight", name: "Midnight", from: "#1A1A3E", to: "#4B3F8A", text: "#e8e6ff" },
];
const gradById = (id) => GRADIENTS.find((g) => g.id === id) || GRADIENTS[0];
const gradCSS = (g) => `linear-gradient(135deg, ${g.from} 0%, ${g.to} 100%)`;

// ---------- Whimsical names ----------
const NAME_FIRST = ["Cedar","Moss","Ivory","Juniper","Marlow","Linen","Sage","Hollis","Wren","Pippin","Indigo","Fennel","Briar","Otis","Plum","Solstice","Birch","Clove","Thistle","Ember","Hazel","Quill","Rumi","Tide"];
const NAME_LAST  = ["Quill","Fern","Lark","Brook","Finch","Drift","Rook","Pine","Vale","Mote","Hush","Glow","Tern","Thorne","Cove","Wisp","Heath","Bell","Lune","Sparrow"];
const randomName = () =>
  NAME_FIRST[Math.floor(Math.random() * NAME_FIRST.length)] + " " +
  NAME_LAST[Math.floor(Math.random() * NAME_LAST.length)];
const randomNo = () => String(Math.floor(1000 + Math.random() * 9000));
const todayLabel = () => {
  const d = new Date();
  return d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase();
};

// ---------- Storage ----------
const STORAGE_KEY = "leaveAMark.v1";
const loadCard = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; }
};
const saveCard = (c) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(c)); } catch {}
};

// ---------- Character SVG (cute character with wand) ----------
function Character({ pose, gradient }) {
  // pose: 'idle' | 'hover' | 'active' | 'wave' | 'tap'
  const wandGlow = pose === "active" || pose === "tap" || pose === "hover";
  return (
    <div className={`character pose-${pose}`}>
      <div className="charBob">
        <div className="charShadow" />
        <img className="charSprite" src="assets/cutecharacter.png" alt="" draggable={false} />
        {/* tiny wand on the right */}
        <svg className="charWand" viewBox="0 0 60 80" aria-hidden>
          <defs>
            <linearGradient id="wandGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor={gradient.from} />
              <stop offset="1" stopColor={gradient.to} />
            </linearGradient>
          </defs>
          <line x1="18" y1="60" x2="42" y2="14" stroke="#d6dceb" strokeWidth="3" strokeLinecap="round" />
          <circle cx="42" cy="14" r="6" fill="url(#wandGrad)" className="wandTip" />
          {wandGlow && <circle cx="42" cy="14" r="11" fill="url(#wandGrad)" className="wandHalo" />}
          {/* sparkles */}
          <g className="sparkles">
            <path d="M50 6 L52 11 L57 13 L52 15 L50 20 L48 15 L43 13 L48 11 Z" fill="#fff8c2" />
            <path d="M30 4 L31 7 L34 8 L31 9 L30 12 L29 9 L26 8 L29 7 Z" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// ---------- Floating launcher (bottom-right) ----------
function CharacterLauncher({ onLaunch, hasCard, visitorName, gradient }) {
  const [hover, setHover] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const tipTimer = useRef();
  useEffect(() => {
    if (hover) {
      tipTimer.current = setTimeout(() => setShowTip(true), 600);
    } else {
      clearTimeout(tipTimer.current);
      setShowTip(false);
    }
    return () => clearTimeout(tipTimer.current);
  }, [hover]);

  const tip = hasCard ? `Welcome back, ${visitorName} ✦` : "Leave a mark ✦";

  return (
    <button
      className={`launcher ${hasCard ? "returning" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onLaunch}
      aria-label={tip}
    >
      {hasCard && <span className="launcherRing" aria-hidden />}
      <Character pose={hover ? "hover" : "idle"} gradient={gradient} />
      <span className={`launcherTip ${showTip ? "show" : ""}`}>{tip}</span>
    </button>
  );
}

// ---------- Edge glow overlay ----------
function EdgeGlow({ gradient, mode }) {
  // mode: 'off' | 'drawing' | 'breathing'
  const style = {
    "--glow-from": gradient.from,
    "--glow-to": gradient.to,
  };
  return <div className={`edgeGlow mode-${mode}`} style={style} aria-hidden />;
}

// ---------- Visitor Card ----------
function VisitorCard({ initial, onConfirm, onCancel }) {
  const [name, setName] = useState(initial?.name || "");
  const [placeholder, setPlaceholder] = useState(randomName());
  const [gradId, setGradId] = useState(initial?.color || "aurora");
  const [no] = useState(initial?.no || randomNo());
  const [date] = useState(initial?.createdAt ? initial.createdAt : todayLabel());
  const [appear, setAppear] = useState(false);
  const grad = gradById(gradId);

  useEffect(() => {
    const t = setTimeout(() => setAppear(true), 30);
    return () => clearTimeout(t);
  }, []);

  const finalName = (name.trim() || placeholder).slice(0, 24);

  return (
    <div className={`cardStage ${appear ? "in" : ""}`}>
      <div className="cardDim" onClick={onCancel} />
      <div className="cardWrap">
        <div className="card" style={{ background: gradCSS(grad), color: grad.text }}>
          <div className="cardNoise" aria-hidden />
          <div className="cardHeader">
            <span className="cardWorld" style={{ fontFamily: "var(--font-serif)" }}>
              Hanara&apos;s World
            </span>
            <span className="cardStar" aria-hidden>✦</span>
          </div>
          <div className="cardNameWrap">
            <input
              className="cardNameInline"
              style={{ color: grad.text }}
              value={name}
              placeholder={placeholder}
              onChange={(e) => setName(e.target.value)}
              maxLength={24}
              autoFocus
              aria-label="Your name"
            />
            <button
              type="button"
              className="cardRefreshInline"
              onClick={() => setPlaceholder(randomName())}
              aria-label="Suggest another name"
              title="Suggest another"
              style={{ color: grad.text }}
            >↺</button>
          </div>
          <div className="cardMeta">
            <div className="cardMetaCol">
              <span className="cardMetaLabel">VISITOR</span>
              <span className="cardMetaValue">{finalName}</span>
            </div>
            <div className="cardMetaCol">
              <span className="cardMetaLabel">ISSUED ON</span>
              <span className="cardMetaValue">{date}</span>
            </div>
            <div className="cardMetaCol">
              <span className="cardMetaLabel">NO.</span>
              <span className="cardMetaValue">{no}</span>
            </div>
          </div>
          <div className="cardSig">
            <svg viewBox="0 0 200 30" width="100%" height="28">
              <path d="M2 22 C 18 8, 30 28, 50 18 S 90 6, 110 22 S 150 26, 178 12"
                fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".7" />
            </svg>
            <span className="cardSigLabel">SIGNATURE</span>
          </div>
        </div>

        <div className="swatchRow" role="radiogroup" aria-label="Card color">
          {GRADIENTS.map((g) => (
            <button
              key={g.id}
              role="radio"
              aria-checked={gradId === g.id}
              aria-label={g.name}
              className={`swatch ${gradId === g.id ? "selected" : ""}`}
              style={{ background: gradCSS(g) }}
              onClick={() => setGradId(g.id)}
              title={g.name}
            />
          ))}
        </div>

        <button
          className="enterBtn"
          onClick={() => onConfirm({ name: finalName, color: gradId, no, createdAt: date })}
        >
          ENTER <span aria-hidden>→</span>
        </button>
        <p className="cardFootnote">Your annotations are saved to this browser</p>
      </div>
    </div>
  );
}

// ---------- Toolbar ----------
const TOOLS = [
  { id: "pointer",   icon: "↖",  label: "Pointer" },
  { id: "pen",       icon: "✎",  label: "Pen" },
  { id: "highlight", icon: "▐",  label: "Highlight" },
  { id: "sticky",    icon: "♠",  label: "Sticky" },
  { id: "text",      icon: "T",  label: "Text" },
  { id: "comment",   icon: "💬", label: "Comment" },
];

function Toolbar({ tool, setTool, onDone, gradient, position, setPosition }) {
  const [collapsed, setCollapsed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const ref = useRef();
  const drag = useRef(null);

  const onPointerDown = (e) => {
    if (e.target.closest("button, input")) return;
    const r = ref.current.getBoundingClientRect();
    drag.current = { dx: e.clientX - r.left, dy: e.clientY - r.top };
    ref.current.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const x = e.clientX - drag.current.dx;
    const y = e.clientY - drag.current.dy;
    setPosition({
      x: Math.max(8, Math.min(window.innerWidth - 360, x)),
      y: Math.max(8, Math.min(window.innerHeight - 80, y)),
    });
  };
  const onPointerUp = () => { drag.current = null; };

  const style = {
    left: position.x,
    top: position.y,
    "--tool-from": gradient.from,
    "--tool-to": gradient.to,
  };

  return (
    <div
      className={`toolbar ${collapsed ? "collapsed" : ""} ${confirming ? "confirming" : ""}`}
      ref={ref}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {collapsed ? (
        <button className="toolPill collapsedPill" onClick={() => setCollapsed(false)} aria-label="Expand toolbar"
          style={{ "--tool-from": gradient.from, "--tool-to": gradient.to }}>
          <svg viewBox="0 0 64 64" width="38" height="38" aria-hidden>
            <defs>
              <linearGradient id={`star-${gradient.from.replace('#','')}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor={gradient.from} />
                <stop offset="1" stopColor={gradient.to} />
              </linearGradient>
            </defs>
            <path
              d="M32 4 C 33.5 22, 42 30.5, 60 32 C 42 33.5, 33.5 42, 32 60 C 30.5 42, 22 33.5, 4 32 C 22 30.5, 30.5 22, 32 4 Z"
              fill={`url(#star-${gradient.from.replace('#','')})`}
            />
          </svg>
        </button>
      ) : confirming ? (
        <div className="confirmRow">
          <span className="confirmText">Done for now?</span>
          <button className="confirmYes" onClick={onDone}>Save + exit</button>
          <button className="confirmNo" onClick={() => setConfirming(false)}>Keep going</button>
        </div>
      ) : (
        <>
          <button className="dragHandle" aria-label="Drag toolbar" tabIndex={-1}>
            <span /><span /><span />
          </button>
          {TOOLS.map((t) => (
            <button
              key={t.id}
              className={`toolBtn ${tool === t.id ? "active" : ""}`}
              onClick={() => setTool(t.id)}
              aria-pressed={tool === t.id}
              title={t.label}
            >
              <span className="toolIcon">{t.icon}</span>
              <span className="toolLabel">{t.label}</span>
            </button>
          ))}
          <span className="toolDivider" />
          <button className="toolBtn doneBtn" onClick={() => setConfirming(true)} title="Done">
            <span className="toolIcon">✦</span>
            <span className="toolLabel">Done</span>
          </button>
          <button className="collapseBtn" onClick={() => setCollapsed(true)} aria-label="Collapse toolbar">⌄</button>
        </>
      )}
    </div>
  );
}

// ---------- Pen / Highlight canvas ----------
function PenCanvas({ tool, gradient, strokes, setStrokes }) {
  const ref = useRef();
  const drawing = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const onResize = () => {
      setSize({ w: window.innerWidth, h: document.documentElement.scrollHeight });
    };
    onResize();
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    return () => { window.removeEventListener("resize", onResize); ro.disconnect(); };
  }, []);

  const active = tool === "pen" || tool === "highlight";

  const onDown = (e) => {
    if (!active) return;
    e.preventDefault();
    const x = e.clientX + window.scrollX;
    const y = e.clientY + window.scrollY;
    drawing.current = {
      kind: tool,
      color: tool === "pen" ? gradient.from : gradient.to,
      points: [{ x, y }],
    };
    ref.current.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!drawing.current) return;
    const x = e.clientX + window.scrollX;
    const y = e.clientY + window.scrollY;
    drawing.current.points.push({ x, y });
    // force rerender
    setStrokes((s) => [...s.slice(0, s.length - (s._tmp ? 1 : 0)), { ...drawing.current, _tmp: true }]);
  };
  const onUp = () => {
    if (!drawing.current) return;
    const stroke = drawing.current;
    drawing.current = null;
    setStrokes((s) => {
      const cleaned = s.filter((x) => !x._tmp);
      return [...cleaned, stroke];
    });
  };

  const pathFromPoints = (pts) => {
    if (!pts.length) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) d += ` L ${pts[i].x} ${pts[i].y}`;
    return d;
  };

  return (
    <svg
      ref={ref}
      className={`penCanvas ${active ? "active" : ""} cursor-${tool}`}
      width={size.w}
      height={size.h}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      {strokes.map((s, i) => (
        <path
          key={i}
          d={pathFromPoints(s.points)}
          stroke={s.color}
          strokeWidth={s.kind === "highlight" ? 18 : 2.5}
          strokeOpacity={s.kind === "highlight" ? 0.32 : 0.95}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ))}
    </svg>
  );
}

// ---------- Sticky / Text / Comment items ----------
function AnnotationItem({ item, onChange, onDelete, gradient }) {
  const [editing, setEditing] = useState(item.text === "" && item._fresh);
  const textRef = useRef();
  const drag = useRef(null);
  const ref = useRef();

  useEffect(() => {
    if (editing) textRef.current?.focus();
  }, [editing]);

  const onPointerDown = (e) => {
    if (e.target.tagName === "TEXTAREA" || e.target.closest("button")) return;
    const r = ref.current.getBoundingClientRect();
    drag.current = {
      dx: e.clientX + window.scrollX - item.x,
      dy: e.clientY + window.scrollY - item.y,
    };
    ref.current.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    onChange({ ...item, x: e.clientX + window.scrollX - drag.current.dx, y: e.clientY + window.scrollY - drag.current.dy });
  };
  const onPointerUp = () => { drag.current = null; };

  const common = {
    ref,
    style: { left: item.x, top: item.y },
    onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp,
  };

  if (item.kind === "sticky") {
    return (
      <div className="sticky" {...common} style={{ ...common.style, "--from": gradient.from, "--to": gradient.to }}>
        <button className="annDelete" onClick={() => onDelete(item.id)} aria-label="Delete">×</button>
        {editing ? (
          <textarea
            ref={textRef}
            className="stickyText"
            value={item.text}
            onChange={(e) => onChange({ ...item, text: e.target.value })}
            onBlur={() => setEditing(false)}
            placeholder="leave a thought…"
          />
        ) : (
          <div className="stickyText" onDoubleClick={() => setEditing(true)}>
            {item.text || <span style={{ opacity: .5 }}>leave a thought…</span>}
          </div>
        )}
        <div className="stickyTape" aria-hidden />
      </div>
    );
  }
  if (item.kind === "text") {
    return (
      <div className="textLabel" {...common}>
        <button className="annDelete annDeleteSm" onClick={() => onDelete(item.id)} aria-label="Delete">×</button>
        {editing ? (
          <textarea
            ref={textRef}
            className="textLabelInput"
            value={item.text}
            onChange={(e) => onChange({ ...item, text: e.target.value })}
            onBlur={() => setEditing(false)}
            placeholder="type…"
          />
        ) : (
          <div className="textLabelText" onDoubleClick={() => setEditing(true)}>
            {item.text || <span style={{ opacity: .5 }}>type…</span>}
          </div>
        )}
      </div>
    );
  }
  if (item.kind === "comment") {
    return (
      <div className="comment" {...common} style={{ ...common.style, "--from": gradient.from, "--to": gradient.to }}>
        <span className="commentPin" aria-hidden />
        <div className="commentBubble">
          <button className="annDelete annDeleteSm" onClick={() => onDelete(item.id)} aria-label="Delete">×</button>
          <div className="commentAuthor">{item.author} <span>·</span> just now</div>
          {editing ? (
            <textarea
              ref={textRef}
              className="commentInput"
              value={item.text}
              onChange={(e) => onChange({ ...item, text: e.target.value })}
              onBlur={() => setEditing(false)}
              placeholder="add a comment…"
            />
          ) : (
            <div className="commentText" onDoubleClick={() => setEditing(true)}>
              {item.text || <span style={{ opacity: .5 }}>add a comment…</span>}
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
}

// ---------- Toast ----------
function Toast({ text, gradient }) {
  return (
    <div className="toast" style={{ "--from": gradient.from, "--to": gradient.to }}>
      <span className="toastDot" />
      <span>{text}</span>
    </div>
  );
}

// ---------- Card Settings (in-edit-mode) ----------
function CardSettings({ card, onClose, onUpdate }) {
  const [name, setName] = useState(card?.name || "");
  const [gradId, setGradId] = useState(card?.color || "aurora");
  const grad = gradById(gradId);

  const save = () => {
    const finalName = (name.trim() || card?.name || "Anon").slice(0, 24);
    onUpdate({ ...card, name: finalName, color: gradId });
    onClose();
  };

  return (
    <div className="settingsPanel" onPointerDown={(e) => e.stopPropagation()}>
      <button className="settingsClose" onClick={onClose} aria-label="Close">×</button>
      <p className="settingsTitle">Your card</p>
      <div className="settingsCardPreview" style={{ background: gradCSS(grad), color: grad.text }}>
        <span className="settingsPreviewLabel" style={{ fontFamily: "var(--font-serif)" }}>Hanara&apos;s World</span>
        <span className="settingsPreviewName" style={{ fontFamily: "var(--font-serif)" }}>
          {(name.trim() || card?.name || "—").slice(0, 24)}
        </span>
      </div>
      <label className="settingsField">
        <span className="settingsLabel">Name</span>
        <div className="settingsRow">
          <input
            className="settingsInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={card?.name}
            maxLength={24}
          />
          <button
            type="button"
            className="settingsRefresh"
            onClick={() => setName(randomName())}
            aria-label="Random name"
            title="Random"
          >↺</button>
        </div>
      </label>
      <div className="settingsField">
        <span className="settingsLabel">Card color</span>
        <div className="swatchRow">
          {GRADIENTS.map((g) => (
            <button
              key={g.id}
              className={`swatch ${gradId === g.id ? "selected" : ""}`}
              style={{ background: gradCSS(g) }}
              onClick={() => setGradId(g.id)}
              aria-label={g.name}
              title={g.name}
            />
          ))}
        </div>
      </div>
      <button className="settingsSave" onClick={save}>Save</button>
    </div>
  );
}

window.CardSettings = CardSettings;

// ---------- Main "Leave a Mark" controller ----------

function LeaveAMark() {
  // phases: 'idle' | 'drawingGlow' | 'centering' | 'cardIn' | 'card' | 'editing' | 'exiting'
  const [phase, setPhase] = useState("idle");
  const [card, setCard] = useState(() => loadCard());
  const [characterPos, setCharacterPos] = useState("corner"); // 'corner' | 'center'
  const [characterPose, setCharacterPose] = useState("idle"); // see Character
  const [tool, setTool] = useState("pointer");
  const [items, setItems] = useState(card?.annotations?.items || []);
  const [strokes, setStrokes] = useState(card?.annotations?.strokes || []);
  const [toolbarPos, setToolbarPos] = useState(() => {
    try { return JSON.parse(localStorage.getItem("leaveAMark.toolbarPos")) || null; } catch { return null; }
  });
  const [toast, setToast] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  const gradient = useMemo(() => gradById(card?.color || "aurora"), [card?.color]);

  // toolbar default pos = bottom center
  useEffect(() => {
    if (!toolbarPos) {
      const w = 540; const h = 64;
      setToolbarPos({ x: Math.max(12, (window.innerWidth - w) / 2), y: window.innerHeight - h - 36 });
    }
  }, []);
  useEffect(() => {
    if (toolbarPos) localStorage.setItem("leaveAMark.toolbarPos", JSON.stringify(toolbarPos));
  }, [toolbarPos]);

  // persist on changes
  useEffect(() => {
    if (!card) return;
    const updated = { ...card, annotations: { items, strokes } };
    saveCard(updated);
  }, [items, strokes, card]);

  // entry sequence
  const launch = useCallback(() => {
    if (phase !== "idle") return;
    setPhase("drawingGlow");
    setCharacterPose("active");
    // stage 2: center
    setTimeout(() => {
      setPhase("centering");
      setCharacterPos("center");
    }, 800);
    // stage 3: tap, then card or edit mode
    setTimeout(() => {
      setCharacterPose("tap");
    }, 1300);
    setTimeout(() => {
      if (card) {
        setPhase("editing");
        setCharacterPos("corner");
        setCharacterPose("active");
      } else {
        setPhase("cardIn");
      }
    }, 1700);
  }, [phase, card]);

  // exit sequence
  const finishExit = useCallback(() => {
    setPhase("exiting");
    setCharacterPose("wave");
    setTimeout(() => {
      setPhase("idle");
      setCharacterPose("idle");
      setTool("pointer");
      setToast({ text: `See you next time, ${card?.name || "friend"} ✦` });
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  }, [card]);

  // ESC to exit / cancel card
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (phase === "editing") finishExit();
        else if (phase === "card") {
          setPhase("idle");
          setCharacterPos("corner");
          setCharacterPose("idle");
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, finishExit]);

  // place sticky/text/comment on click
  useEffect(() => {
    if (phase !== "editing") return;
    if (!["sticky", "text", "comment"].includes(tool)) return;
    const onDown = (e) => {
      if (e.target.closest(".toolbar, .launcher, .penCanvas, .annotation, .sticky, .textLabel, .comment, a, button")) return;
      const x = e.clientX + window.scrollX;
      const y = e.clientY + window.scrollY;
      const id = "a" + Math.random().toString(36).slice(2, 9);
      const newItem = { id, kind: tool, x, y, text: "", _fresh: true, author: card?.name || "you" };
      setItems((it) => [...it, newItem]);
      setTool("pointer");
    };
    window.addEventListener("pointerdown", onDown, true);
    return () => window.removeEventListener("pointerdown", onDown, true);
  }, [tool, phase, card]);

  // confirm card
  const confirmCard = (data) => {
    const newCard = { id: "v" + Math.random().toString(36).slice(2, 9), ...data, annotations: { items: [], strokes: [] } };
    saveCard(newCard);
    setCard(newCard);
    setItems([]); setStrokes([]);
    setPhase("editing");
    setCharacterPos("corner");
    setCharacterPose("active");
  };

  const cancelCard = () => {
    setPhase("idle");
    setCharacterPos("corner");
    setCharacterPose("idle");
  };

  // edge glow mode
  const edgeMode = phase === "idle" ? "off"
    : phase === "drawingGlow" || phase === "centering" || phase === "cardIn" || phase === "card" ? "drawing"
    : phase === "editing" ? "breathing"
    : "fading";

  // dim overlay (during card flow)
  const showDim = phase === "centering" || phase === "cardIn" || phase === "card";

  return (
    <div className="leaveAMark">
      <EdgeGlow gradient={gradient} mode={edgeMode} />
      {showDim && <div className="dimOverlay" />}

      {/* moving character */}
      <div
        className={`charStage pos-${characterPos} phase-${phase}`}
        aria-hidden={phase !== "idle"}
      >
        {(phase === "drawingGlow" || phase === "centering" || phase === "cardIn" || phase === "card" || phase === "exiting") && (
          <Character pose={characterPose} gradient={gradient} />
        )}
      </div>

      {/* idle launcher in corner (hidden during entry/card phases) */}
      {(phase === "idle" || phase === "editing") && (
        <div className={`launcherStage ${phase === "editing" ? "active" : ""}`}>
          {phase === "idle" ? (
            <CharacterLauncher
              onLaunch={launch}
              hasCard={!!card}
              visitorName={card?.name}
              gradient={gradient}
            />
          ) : (
            <button className="launcher idleInEdit" onClick={() => setShowSettings((s) => !s)} aria-label="Card settings">
              <Character pose="active" gradient={gradient} />
            </button>
          )}
          {phase === "editing" && showSettings && (
            <window.CardSettings
              card={card}
              onClose={() => setShowSettings(false)}
              onUpdate={(c) => { setCard(c); saveCard(c); }}
            />
          )}
        </div>
      )}

      {/* card */}
      {(phase === "cardIn" || phase === "card") && (
        <VisitorCard
          initial={null}
          onConfirm={confirmCard}
          onCancel={cancelCard}
        />
      )}

      {/* edit mode UI */}
      {phase === "editing" && (
        <>
          <PenCanvas tool={tool} gradient={gradient} strokes={strokes} setStrokes={setStrokes} />
          {toolbarPos && (
            <Toolbar
              tool={tool}
              setTool={setTool}
              onDone={finishExit}
              gradient={gradient}
              position={toolbarPos}
              setPosition={setToolbarPos}
            />
          )}
          <div className="annotationLayer">
            {items.map((it) => (
              <AnnotationItem
                key={it.id}
                item={it}
                gradient={gradient}
                onChange={(next) =>
                  setItems((arr) => arr.map((x) => (x.id === next.id ? { ...next, _fresh: false } : x)))
                }
                onDelete={(id) => setItems((arr) => arr.filter((x) => x.id !== id))}
              />
            ))}
          </div>
          {/* placement preview cursor */}
          {["sticky", "text", "comment"].includes(tool) && (
            <div className="placeHint">
              <span style={{ background: gradCSS(gradient) }} />
              click anywhere to place {tool === "comment" ? "a comment" : tool === "text" ? "text" : "a sticky note"} · esc to exit
            </div>
          )}
        </>
      )}

      {toast && <Toast text={toast.text} gradient={gradient} />}

      {/* dev reset */}
      <button
        className="resetBtn"
        title="Forget visitor card (dev)"
        onClick={() => {
          localStorage.removeItem(STORAGE_KEY);
          setCard(null);
          setItems([]); setStrokes([]);
          setPhase("idle");
          setCharacterPos("corner");
          setCharacterPose("idle");
        }}
      >
        forget me
      </button>
    </div>
  );
}

window.LeaveAMark = LeaveAMark;
