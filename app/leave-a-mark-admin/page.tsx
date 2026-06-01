"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { gradById } from "@/components/leaveAMark/constants";
import styles from "./admin.module.css";

// ─── Row shapes (mirror the Supabase tables) ──────────────────────────────────

type VisitorRow = {
  id: string;
  name: string | null;
  color: string | null;
  no: string | null;
  contact_info: string | null;
  last_seen_at: string | null;
  created_at?: string | null;
};

type AnnotationRow = {
  id: string;
  visitor_id: string;
  page_path: string;
  kind: string;
  x: number;
  y: number;
  text: string;
  session_id: string | null;
  status: string | null;
};

type ThreadRow = {
  annotation_id: string;
  from_role: "visitor" | "ai";
  text: string;
  created_at: string;
};

type QuestionRow = {
  id?: number;
  visitor_id: string | null;
  visitor_name: string | null;
  page_path: string | null;
  question: string;
  answer: string;
  matched: boolean;
  kind: string | null;
  created_at?: string | null;
};

function fmtTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function gradCssFor(color: string | null | undefined): string {
  const g = gradById(color ?? undefined);
  return `linear-gradient(135deg, ${g.from}, ${g.to})`;
}

function friendlyPageTitle(path: string): string {
  if (path === "/" || path === "") return "Home";
  return path
    .replace(/^\//, "")
    .split("/")
    .pop()!
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function LeaveAMarkAdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [codeInput, setCodeInput] = useState("");
  const [gateErr, setGateErr] = useState(false);

  const [tab, setTab] = useState<"visitors" | "questions">("visitors");
  const [visitors, setVisitors] = useState<VisitorRow[]>([]);
  const [annotations, setAnnotations] = useState<AnnotationRow[]>([]);
  const [threads, setThreads] = useState<ThreadRow[]>([]);
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [selectedVisitor, setSelectedVisitor] = useState<string | null>(null);
  const [activeAnno, setActiveAnno] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setLoadErr(null);
    try {
      const res = await fetch("/api/lam/data", { cache: "no-store" });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Failed to load data.");
      setVisitors((json.visitors as VisitorRow[]) ?? []);
      setAnnotations((json.annotations as AnnotationRow[]) ?? []);
      setThreads((json.threads as ThreadRow[]) ?? []);
      setQuestions((json.questions as QuestionRow[]) ?? []);
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : "Failed to load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  // On mount: if the session cookie is already valid, the data route returns 200.
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/lam/data", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          setVisitors((json.visitors as VisitorRow[]) ?? []);
          setAnnotations((json.annotations as AnnotationRow[]) ?? []);
          setThreads((json.threads as ThreadRow[]) ?? []);
          setQuestions((json.questions as QuestionRow[]) ?? []);
          setAuthed(true);
        }
      } catch {
        /* show gate */
      } finally {
        setCheckingAuth(false);
      }
    })();
  }, []);

  const submitCode = useCallback(async () => {
    setGateErr(false);
    try {
      const res = await fetch("/api/lam/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeInput }),
      });
      if (res.ok) {
        setAuthed(true);
        void loadAll();
      } else {
        setGateErr(true);
      }
    } catch {
      setGateErr(true);
    }
  }, [codeInput, loadAll]);

  const threadsByAnno = useMemo(() => {
    const m = new Map<string, ThreadRow[]>();
    for (const t of threads) {
      const arr = m.get(t.annotation_id) ?? [];
      arr.push(t);
      m.set(t.annotation_id, arr);
    }
    return m;
  }, [threads]);

  // Hide placeholder spots the visitor clicked but never left anything at
  // (covers rows logged before empty-filtering was added).
  const annosByVisitor = useMemo(() => {
    const m = new Map<string, AnnotationRow[]>();
    for (const a of annotations) {
      const hasText = (a.text ?? "").trim().length > 0;
      const hasThread = (threadsByAnno.get(a.id) ?? []).some((t) => (t.text ?? "").trim().length > 0);
      if (!hasText && !hasThread) continue;
      const arr = m.get(a.visitor_id) ?? [];
      arr.push(a);
      m.set(a.visitor_id, arr);
    }
    return m;
  }, [annotations, threadsByAnno]);

  const selected = selectedVisitor ?? visitors[0]?.id ?? null;

  // ─── Gate ────────────────────────────────────────────────────────────────
  if (checkingAuth) {
    return (
      <main className={styles.wrap}>
        <p className={styles.empty}>Loading…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className={styles.wrap}>
        <div className={styles.gate}>
          <p className={styles.eyebrow}>Leave a Mark · Admin</p>
          <h1 className={styles.h1}>Restricted</h1>
          <p className={styles.gateSub}>Enter the passcode to continue.</p>
          <input
            className={styles.gateInput}
            type="password"
            value={codeInput}
            placeholder="passcode"
            onChange={(e) => setCodeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") void submitCode();
            }}
          />
          <button className={styles.gateBtn} onClick={() => void submitCode()}>
            Enter
          </button>
          {gateErr ? <p className={styles.gateErr}>Incorrect passcode.</p> : null}
        </div>
      </main>
    );
  }

  return (
    <main className={styles.wrap}>
      <div className={styles.titleRow}>
        <div>
          <p className={styles.eyebrow}>Leave a Mark · Admin</p>
          <h1 className={styles.h1}>Who left a mark</h1>
        </div>
        <button className={styles.refreshBtn} onClick={() => void loadAll()} disabled={loading}>
          {loading ? "Loading…" : "Refresh"}
        </button>
      </div>

      {loadErr ? <div className={styles.banner}>Couldn&apos;t load data: {loadErr}</div> : null}

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === "visitors" ? styles.tabActive : ""}`}
          onClick={() => setTab("visitors")}
        >
          Visitors &amp; comments
        </button>
        <button
          className={`${styles.tab} ${tab === "questions" ? styles.tabActive : ""}`}
          onClick={() => setTab("questions")}
        >
          Questions ({questions.filter((q) => !q.matched && q.kind === "question").length} gaps)
        </button>
      </div>

      {tab === "visitors" ? (
        <div className={styles.layout}>
          <ul className={styles.visitorList}>
            {visitors.length === 0 ? <li className={styles.empty}>No visitors yet.</li> : null}
            {visitors.map((v) => {
              const count = annosByVisitor.get(v.id)?.length ?? 0;
              return (
                <li key={v.id}>
                  <button
                    className={`${styles.visitorBtn} ${selected === v.id ? styles.visitorBtnActive : ""}`}
                    onClick={() => {
                      setSelectedVisitor(v.id);
                      setActiveAnno(null);
                    }}
                  >
                    <span className={styles.dot} style={{ background: gradCssFor(v.color) }} />
                    <span className={styles.visitorMeta}>
                      <span className={styles.visitorName}>{v.name ?? "Anonymous"}</span>
                      <span className={styles.visitorSubline}>
                        {count} comment{count === 1 ? "" : "s"} · {fmtTime(v.last_seen_at)}
                        {v.contact_info ? ` · ${v.contact_info}` : ""}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className={styles.detail}>
            <VisitorDetail
              visitorId={selected}
              annos={selected ? annosByVisitor.get(selected) ?? [] : []}
              threadsByAnno={threadsByAnno}
              activeAnno={activeAnno}
              setActiveAnno={setActiveAnno}
            />
          </div>
        </div>
      ) : (
        <QuestionsView questions={questions} />
      )}
    </main>
  );
}

// ─── Visitor detail: per-page minimap + comment threads ───────────────────────

function VisitorDetail({
  visitorId,
  annos,
  threadsByAnno,
  activeAnno,
  setActiveAnno,
}: {
  visitorId: string | null;
  annos: AnnotationRow[];
  threadsByAnno: Map<string, ThreadRow[]>;
  activeAnno: string | null;
  setActiveAnno: (id: string | null) => void;
}) {
  if (!visitorId) return <p className={styles.empty}>Select a visitor.</p>;
  if (annos.length === 0) return <p className={styles.empty}>This visitor left no comments.</p>;

  const byPage = new Map<string, AnnotationRow[]>();
  for (const a of annos) {
    const arr = byPage.get(a.page_path) ?? [];
    arr.push(a);
    byPage.set(a.page_path, arr);
  }

  return (
    <>
      {Array.from(byPage.entries()).map(([page, items]) => (
        <PageSection
          key={page}
          page={page}
          items={items}
          visitorId={visitorId}
          threadsByAnno={threadsByAnno}
          activeAnno={activeAnno}
          setActiveAnno={setActiveAnno}
        />
      ))}
    </>
  );
}

// ─── A single, collapsible page card ──────────────────────────────────────────

function PageSection({
  page,
  items,
  visitorId,
  threadsByAnno,
  activeAnno,
  setActiveAnno,
}: {
  page: string;
  items: AnnotationRow[];
  visitorId: string;
  threadsByAnno: Map<string, ThreadRow[]>;
  activeAnno: string | null;
  setActiveAnno: (id: string | null) => void;
}) {
  const [open, setOpen] = useState(true);

  // A nominal page width to scale x against; y is the absolute document offset.
  const ASSUMED_W = 1440;
  const replayHref = `${page}?lamReplay=${encodeURIComponent(visitorId)}`;
  const ordered = [...items].sort((a, b) => a.y - b.y);
  const maxY = Math.max(...ordered.map((i) => i.y), 1) + 240;
  const mapH = Math.min(640, Math.max(220, (240 / ASSUMED_W) * maxY + 220));
  const indexOf = new Map(ordered.map((it, i) => [it.id, i + 1]));
  const resolvedCount = ordered.filter((i) => i.status === "resolved").length;

  return (
    <section className={styles.pageCard}>
      <div className={styles.pageCardHeader}>
        <button
          type="button"
          className={styles.pageToggle}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Chevron open={open} />
          <span className={styles.pageTitleWrap}>
            <span className={styles.pageTitleText}>{friendlyPageTitle(page)}</span>
          </span>
          <span className={styles.pageCount}>
            {ordered.length} comment{ordered.length === 1 ? "" : "s"}
            {resolvedCount > 0 ? ` · ${resolvedCount} resolved` : ""}
          </span>
        </button>
        <a className={styles.openLink} href={replayHref} target="_blank" rel="noreferrer">
          view on page in context ↗
        </a>
      </div>

      {open ? (
        <div className={styles.pageBody}>
          <div className={styles.pageGrid}>
            <div className={styles.minimap} style={{ height: mapH }}>
              {ordered.map((it) => {
                const left = Math.max(4, Math.min(96, (it.x / ASSUMED_W) * 100));
                const top = Math.max(2, Math.min(98, (it.y / maxY) * 100));
                const resolved = it.status === "resolved";
                return (
                  <button
                    key={it.id}
                    className={`${styles.mapDot} ${resolved ? styles.mapDotResolved : ""}`}
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      background: "linear-gradient(135deg, #7B61FF, #43CFA0)",
                    }}
                    title={it.text}
                    onClick={() => setActiveAnno(it.id)}
                  >
                    {indexOf.get(it.id)}
                  </button>
                );
              })}
            </div>

            <div className={styles.comments}>
              {ordered.map((it) => {
                const msgs = threadsByAnno.get(it.id) ?? [];
                const resolved = it.status === "resolved";
                const idx = indexOf.get(it.id);
                return (
                  <div
                    key={it.id}
                    className={`${styles.comment} ${activeAnno === it.id ? styles.commentActive : ""}`}
                  >
                    <div className={styles.commentTop}>
                      <span
                        className={styles.idxBadge}
                        style={
                          { background: "linear-gradient(135deg, #7B61FF, #43CFA0)" } as CSSProperties
                        }
                      >
                        {idx}
                      </span>
                      <span
                        className={`${styles.statusPill} ${resolved ? styles.statusResolved : styles.statusOpen}`}
                      >
                        {resolved ? "resolved" : "open"}
                      </span>
                      <span className={styles.coords}>
                        {it.kind} · x{Math.round(it.x)} y{Math.round(it.y)}
                      </span>
                    </div>
                    <p className={styles.bubble}>{it.text || <em>(empty)</em>}</p>

                    {msgs.length > 0 ? (
                      <div className={styles.thread}>
                        {msgs.map((m, i) => (
                          <div
                            key={i}
                            className={`${styles.msg} ${m.from_role === "ai" ? styles.msgAi : styles.msgVisitor}`}
                          >
                            <div className={styles.msgRole}>
                              {m.from_role === "ai" ? "Hanara's AI" : "Visitor"}
                            </div>
                            {m.text}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

// ─── Questions view: gaps to fill in the library ──────────────────────────────

function QuestionsView({ questions }: { questions: QuestionRow[] }) {
  const [onlyGaps, setOnlyGaps] = useState(false);
  const shown = onlyGaps ? questions.filter((q) => !q.matched && q.kind === "question") : questions;

  return (
    <div>
      <label className={styles.qCheckbox}>
        <input type="checkbox" checked={onlyGaps} onChange={(e) => setOnlyGaps(e.target.checked)} />
        Show only unanswered questions (library gaps)
      </label>

      {shown.length === 0 ? <p className={styles.empty}>No questions logged yet.</p> : null}

      {shown.map((q, i) => {
        const gap = !q.matched && q.kind === "question";
        return (
          <div key={q.id ?? i} className={`${styles.qRow} ${gap ? styles.qUnmatched : ""}`}>
            <div className={styles.qTop}>
              <span className={styles.qText}>{q.question}</span>
              <span className={`${styles.qFlag} ${gap ? styles.qFlagGap : styles.qFlagOk}`}>
                {gap ? "no library match" : q.matched ? "answered" : (q.kind ?? "other")}
              </span>
              <span className={styles.qMeta}>
                {q.visitor_name ?? "anon"} · {q.page_path ?? "—"} · {fmtTime(q.created_at)}
              </span>
            </div>
            <p className={styles.qAnswer}>{q.answer}</p>
          </div>
        );
      })}
    </div>
  );
}
