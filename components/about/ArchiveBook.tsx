"use client";

import { useEffect, useRef, useState, type TransitionEvent } from "react";
import Image, { type StaticImageData } from "next/image";

// ─── photo imports — adjust these paths if your alias differs ──────────────
import hongKongImage from "@/assets/aboutme/HongKong2.JPG";
import seoulImage from "@/assets/aboutme/Korea.jpeg";
import familyImage from "@/assets/aboutme/FamilyPic.JPEG";
import friendsImage from "@/assets/aboutme/Friends.JPG";
import sketchImage from "@/assets/aboutme/Sketch.jpeg";
import sunnyImage from "@/assets/aboutme/SunnyMovie.png";
import golfImage from "@/assets/aboutme/Family_golf.jpeg";
import thorImage from "@/assets/aboutme/Toru.JPEG";

import styles from "./ArchiveBook.module.css";

const THOR_INSTAGRAM_URL =
  "https://www.instagram.com/toru.coton15?igsh=MXJocWNtNGI3ZmRjaw==";

// ─── types ─────────────────────────────────────────────────────────────────
type ItemId =
  | "hongkong"
  | "gwanghwamun"
  | "family"
  | "friends"
  | "sketchbook"
  | "sunny"
  | "golf"
  | "thor";

type ArchiveItem = {
  title: string;
  meta: string;
  blurb: string;
  quote: string;
  captionL: string;
  captionR: string;
  alt: string;
  imgSrc: StaticImageData;
  linkLabel?: string;
  link?: string;
};

type Flourish = {
  text: string;
  bottom: string;
  left?: string;
  right?: string;
  rotate: number;
};

type Spread =
  | {
      kind: "cover";
      pageNoL: null;
      pageNoR: null;
      stampL: string;
      stampR: string;
    }
  | {
      kind: "content";
      chapter: { num: string; title: string; sub: string };
      pageNoL: number;
      pageNoR: number;
      stampL: string;
      stampR: string;
      leftItem: ItemId;
      rightItem: ItemId;
      leftFlourish: Flourish;
      rightFlourish: Flourish;
    }
  | {
      kind: "end";
      pageNoL: number;
      pageNoR: null;
      stampL: string;
      stampR: null;
    };

type FlipState = { dir: 1 | -1; from: number; to: number; active: boolean } | null;
type Side = "left" | "right";

// ─── data ──────────────────────────────────────────────────────────────────
const ITEMS: Record<ItemId, ArchiveItem> = {
  hongkong: {
    title: "Hong Kong, in neon",
    meta: "Hong Kong · Fall '24",
    blurb:
      "Walking past Lin Heung Tea House at midnight, taxi idling, neon humming. The trip that reset what I wanted next.",
    quote: "reset what I wanted next.",
    captionL: "Hong Kong, midnight",
    captionR: "Fall '24",
    alt: "Hong Kong street with neon signs at night",
    imgSrc: hongKongImage,
  },
  gwanghwamun: {
    title: "Gwanghwamun, at night",
    meta: "Seoul, Korea · 2023",
    blurb:
      "Old palaces lit blue, my grandmother's old neighborhood a few blocks over. The first trip back as an adult — and the reason I keep saying 'designed for both halves of me.'",
    quote: "designed for both halves of me.",
    captionL: "Gwanghwamun",
    captionR: "Seoul · 2023",
    alt: "Gwanghwamun palace lit up at night",
    imgSrc: seoulImage,
  },
  family: {
    title: "Renewed family pic since 2008",
    meta: "Family · My greatest happiness",
    blurb:
      "Mom, Dad, my brother, and Toru. The lineup that made me — and the people I'm building everything for.",
    quote: "the lineup that made me.",
    captionL: "Family",
    captionR: "Since 2008",
    alt: "Family portrait under a wooden pergola",
    imgSrc: familyImage,
  },
  friends: {
    title: "The friends who filled every chapter with joy",
    meta: "UW · Spring '25",
    blurb:
      "The girls who've been there at my lowest, celebrate my wins louder than I did, and kept smiling through it all with their contagious laughter.",
    quote: "louder than I ever do.",
    captionL: "Best friends",
    captionR: "Grad '25",
    alt: "Three friends in white dresses on a staircase",
    imgSrc: friendsImage,
  },
  sketchbook: {
    title: "Sketchbook, since age 9",
    meta: "Drawing · Paper + iPad",
    blurb:
      "I drew before I designed. Halmoni couldn't read English but she could read pictures — that's where the empathy reflex started.",
    quote: "she could read pictures.",
    captionL: "Sketchbook",
    captionR: "2018",
    alt: "An ink sketch of a girl holding a phone",
    imgSrc: sketchImage,
  },
  sunny: {
    title: "Sunny",
    meta: "2011 · Film",
    blurb:
      "The shared lunches, the late-night walks, the years that passed too quickly. The movie that taught me friendship can outlast time.",
    quote: "friendship can outlast time.",
    captionL: "Sunny",
    captionR: "Film · 2011",
    alt: "Sunny (2011) Korean movie poster",
    imgSrc: sunnyImage,
  },
  golf: {
    title: "Golf with the fam",
    meta: "Family · Summer evenings",
    blurb:
      "Sunset rounds on the green. Mom putts straight, my brother reads breaks like books, my dad keeps score honestly. The best kind of therapy I know.",
    quote: "the best therapy I know.",
    captionL: "Family · Golf",
    captionR: "Summer eves",
    alt: "Family playing golf on a green at golden hour",
    imgSrc: golfImage,
  },
  thor: {
    title: "Thor, the boss",
    meta: "Coton de Tulear · The boss · 11 yrs",
    blurb:
      "My most demanding client. Sets the morning standup at 6:30 am, gives feedback in barks, and has never missed a deadline (for treats).",
    quote: "feedback delivered in barks.",
    captionL: "Thor",
    captionR: "The boss",
    alt: "Thor the Coton de Tulear in a field of daisies",
    imgSrc: thorImage,
    linkLabel: "Thor on IG ↗",
    link: THOR_INSTAGRAM_URL,
  },
};

const SPREADS: Spread[] = [
  {
    kind: "cover",
    pageNoL: null,
    pageNoR: null,
    stampL: "Hanara · Archive",
    stampR: "VOL. 01",
  },
  {
    kind: "content",
    chapter: { num: "01", title: "Places that reset me", sub: "two cities, both at night" },
    pageNoL: 1,
    pageNoR: 2,
    stampL: "01 · Travel",
    stampR: "Pin · 1 of 2",
    leftItem: "hongkong",
    rightItem: "gwanghwamun",
    leftFlourish: { text: "↑ this trip reset everything", bottom: "3%", left: "12%", rotate: -3 },
    rightFlourish: { text: "↑ halmoni's old block", bottom: "3%", right: "10%", rotate: 2 },
  },
  {
    kind: "content",
    chapter: { num: "02", title: "The people who made me", sub: "lineups & laughter" },
    pageNoL: 3,
    pageNoR: 4,
    stampL: "02 · Family",
    stampR: "02 · Friends",
    leftItem: "family",
    rightItem: "friends",
    leftFlourish: { text: "↑ our pergola · 2024", bottom: "3%", left: "14%", rotate: 2 },
    rightFlourish: { text: "↑ louder than I ever do", bottom: "3%", right: "10%", rotate: -2 },
  },
  {
    kind: "content",
    chapter: { num: "03", title: "Worlds I return to", sub: "pen, paper, projector" },
    pageNoL: 5,
    pageNoR: 6,
    stampL: "03 · Drawing",
    stampR: "03 · Cinema",
    leftItem: "sketchbook",
    rightItem: "sunny",
    leftFlourish: { text: "↑ halmoni could read this", bottom: "3%", left: "12%", rotate: -3 },
    rightFlourish: { text: "↑ the OG group chat", bottom: "3%", right: "12%", rotate: 2 },
  },
  {
    kind: "content",
    chapter: { num: "04", title: "The green & the boss", sub: "fresh air, daily standup" },
    pageNoL: 7,
    pageNoR: 8,
    stampL: "04 · Outdoors",
    stampR: "04 · Companion",
    leftItem: "golf",
    rightItem: "thor",
    leftFlourish: { text: "↑ mom putts straight", bottom: "3%", left: "14%", rotate: -2 },
    rightFlourish: { text: "↑ daily standup, 6:30 am", bottom: "3%", right: "10%", rotate: 2 },
  },
  {
    kind: "end",
    pageNoL: 9,
    pageNoR: null,
    stampL: "fin · for now",
    stampR: null,
  },
];

const ORDERED_ITEM_IDS: ItemId[] = SPREADS.flatMap((s) =>
  s.kind === "content" ? [s.leftItem, s.rightItem] : []
);

const ITEM_LOCATION: Record<ItemId, { spreadIdx: number; side: Side }> = (() => {
  const m: Partial<Record<ItemId, { spreadIdx: number; side: Side }>> = {};
  SPREADS.forEach((s, idx) => {
    if (s.kind === "content") {
      m[s.leftItem] = { spreadIdx: idx, side: "left" };
      m[s.rightItem] = { spreadIdx: idx, side: "right" };
    }
  });
  return m as Record<ItemId, { spreadIdx: number; side: Side }>;
})();

// ─── small presentation pieces ─────────────────────────────────────────────

function Polaroid({
  itemId,
  item,
  side,
  isActive,
  onSelect,
}: {
  itemId: ItemId;
  item: ArchiveItem;
  side: Side;
  isActive: boolean;
  onSelect: () => void;
}) {
  const seed = itemId.charCodeAt(0) + itemId.charCodeAt(1);
  const baseRotate = (side === "left" ? -2.6 : 2.6) + ((seed % 5) - 2) * 0.4;
  const baseTop = 52 + ((seed % 3) - 1) * 1.5;
  const rotStr = `rotate(${baseRotate.toFixed(2)}deg)`;

  return (
    <button
      type="button"
      className={`${styles.polaroid} ${isActive ? styles.polaroidActive : ""}`}
      onClick={onSelect}
      aria-pressed={isActive}
      aria-label={`Open story: ${item.title}`}
      style={
        {
          left: "50%",
          top: `${baseTop}%`,
          width: "min(64%, 280px)",
          transform: `translate(-50%, -50%) ${rotStr}`,
          ["--rot" as string]: rotStr,
        } as React.CSSProperties
      }
    >
      <span className={styles.polaroidPaper}>
        <span className={styles.tape} aria-hidden />
        <span className={styles.polaroidImgWrap}>
          <Image
            src={item.imgSrc}
            alt={item.alt}
            fill
            sizes="(max-width: 900px) 60vw, 280px"
            className={styles.polaroidImg}
          />
        </span>
        <span className={styles.polaroidCaption}>
          <span>{item.captionL}</span>
          <span className={styles.polaroidCaptionR}>{item.captionR}</span>
        </span>
      </span>
    </button>
  );
}

function Scribble({ flourish }: { flourish: Flourish }) {
  const { text, rotate, bottom, left, right } = flourish;
  return (
    <span
      className={styles.scribble}
      style={{ bottom, left, right, transform: `rotate(${rotate}deg)` }}
    >
      {text}
    </span>
  );
}

function CoverLeft() {
  return (
    <div className={styles.dedication}>
      <div className={styles.dedicationLabel}>For —</div>
      <p>
        <em>Halmoni,</em> who taught me that empathy starts with a drawing when
        the words won&apos;t fit.
      </p>
      <p className={styles.dedicationMuted}>
        And for the recruiter, scrolling at 11pm: thanks for staying for the
        part that isn&apos;t on the résumé.
      </p>
      <span className={styles.dedicationSig}>— H.</span>
    </div>
  );
}

function CoverRight() {
  return (
    <div className={styles.coverPlate}>
      <span className={styles.coverKicker}>An archive · vol. 01</span>
      <h3 className={styles.coverHeading}>
        Things I keep <span className={styles.coverHeadingAccent}>coming back to</span>.
      </h3>
      <span className={styles.coverRule} aria-hidden />
      <span className={styles.coverSigned}>flip me →</span>
    </div>
  );
}

function EndLeft({ itemsCount }: { itemsCount: number }) {
  return (
    <div className={styles.endPlate}>
      <span className={styles.endSmall}>— fin · for now —</span>
      <h3 className={styles.endHeading}>
        To be <em>continued.</em>
      </h3>
      <span className={styles.endScribble}>
        {itemsCount} memories on these pages — infinite more being collected.
        Come back in a month, the pages keep growing.
      </span>
    </div>
  );
}

function EndRight() {
  return <div className={styles.endPaper} aria-hidden />;
}

// ─── page renderer ─────────────────────────────────────────────────────────

function PageContent({
  spread,
  side,
  activeItemId,
  onSelectItem,
}: {
  spread: Spread;
  side: Side;
  activeItemId: ItemId | null;
  onSelectItem: (id: ItemId) => void;
}) {
  if (spread.kind === "cover") {
    return side === "left" ? <CoverLeft /> : <CoverRight />;
  }
  if (spread.kind === "end") {
    return side === "left" ? <EndLeft itemsCount={ORDERED_ITEM_IDS.length} /> : <EndRight />;
  }
  const itemId = side === "left" ? spread.leftItem : spread.rightItem;
  const item = ITEMS[itemId];
  const flourish = side === "left" ? spread.leftFlourish : spread.rightFlourish;
  const hasActive = activeItemId === itemId;

  return (
    <>
      {side === "left" && (
        <h3 className={styles.chapterTitle}>
          <span className={styles.chapterCh}>
            <em>{spread.chapter.num}. </em>
            {spread.chapter.title}
          </span>
          <span className={styles.chapterSub}>— {spread.chapter.sub}</span>
        </h3>
      )}
      <Scribble flourish={flourish} />
      <div className={`${styles.pageBody} ${hasActive ? styles.pageBodyHasActive : ""}`}>
        <Polaroid
          itemId={itemId}
          item={item}
          side={side}
          isActive={hasActive}
          onSelect={() => onSelectItem(itemId)}
        />
      </div>
    </>
  );
}

function Page({
  spread,
  side,
  activeItemId,
  onSelectItem,
}: {
  spread: Spread;
  side: Side;
  activeItemId: ItemId | null;
  onSelectItem: (id: ItemId) => void;
}) {
  const stamp = side === "left" ? spread.stampL : spread.stampR;
  const pageNo = side === "left" ? spread.pageNoL : spread.pageNoR;
  return (
    <div className={`${styles.page} ${side === "left" ? styles.pageLeft : styles.pageRight}`}>
      <div className={styles.pageInner}>
        <div className={styles.pageHead}>
          {stamp ? <span className={styles.pageStamp}>{stamp}</span> : <span />}
          {pageNo != null ? <span className={styles.pageNo}>— {pageNo} —</span> : <span />}
        </div>
        <PageContent
          spread={spread}
          side={side}
          activeItemId={activeItemId}
          onSelectItem={onSelectItem}
        />
      </div>
    </div>
  );
}

// ─── book + margin note ────────────────────────────────────────────────────

function Book({
  spreadIdx,
  flip,
  activeItemId,
  onSelectItem,
  onNext,
  onPrev,
  onTransitionEnd,
}: {
  spreadIdx: number;
  flip: FlipState;
  activeItemId: ItemId | null;
  onSelectItem: (id: ItemId) => void;
  onNext: () => void;
  onPrev: () => void;
  onTransitionEnd: (e: TransitionEvent<HTMLDivElement>) => void;
}) {
  const current = SPREADS[spreadIdx];
  const target = flip ? SPREADS[flip.to] : null;

  let leftSpread = current;
  let rightSpread = current;
  if (flip && target) {
    if (flip.dir === 1) rightSpread = target;
    else leftSpread = target;
  }

  let flipFrontSpread: Spread | null = null;
  let flipBackSpread: Spread | null = null;
  let flipFrontSide: Side | null = null;
  let flipBackSide: Side | null = null;
  if (flip && target) {
    if (flip.dir === 1) {
      flipFrontSpread = current;
      flipFrontSide = "right";
      flipBackSpread = target;
      flipBackSide = "left";
    } else {
      flipFrontSpread = current;
      flipFrontSide = "left";
      flipBackSpread = target;
      flipBackSide = "right";
    }
  }

  return (
    <div className={styles.bookBoard}>
      <div className={styles.bookCover} aria-hidden />
      <div className={styles.pages}>
        <Page
          spread={leftSpread}
          side="left"
          activeItemId={activeItemId}
          onSelectItem={onSelectItem}
        />
        <Page
          spread={rightSpread}
          side="right"
          activeItemId={activeItemId}
          onSelectItem={onSelectItem}
        />
        <div className={styles.binding} aria-hidden />
        <div className={styles.bookSpineShadow} aria-hidden />

        {flip && flipFrontSpread && flipBackSpread && flipFrontSide && flipBackSide && (
          <div
            className={`${styles.flipPage} ${
              flip.dir === 1 ? styles.flipFromRight : styles.flipFromLeft
            } ${styles.flipping} ${flip.active ? styles.flipFlipped : ""}`}
            onTransitionEnd={onTransitionEnd}
          >
            <div className={`${styles.flipFace} ${styles.flipFaceFront}`}>
              <div className={styles.pageInner}>
                <PageContent
                  spread={flipFrontSpread}
                  side={flipFrontSide}
                  activeItemId={null}
                  onSelectItem={() => {}}
                />
              </div>
            </div>
            <div className={`${styles.flipFace} ${styles.flipFaceBack}`}>
              <div className={styles.pageInner}>
                <PageContent
                  spread={flipBackSpread}
                  side={flipBackSide}
                  activeItemId={null}
                  onSelectItem={() => {}}
                />
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          className={`${styles.navCorner} ${styles.navCornerPrev}`}
          onClick={onPrev}
          disabled={spreadIdx === 0 || !!flip}
          aria-label="Previous spread"
        >
          <span className={styles.navCornerCurl} aria-hidden />
          <span className={styles.navCornerLabel}>◂ prev</span>
        </button>
        <button
          type="button"
          className={`${styles.navCorner} ${styles.navCornerNext}`}
          onClick={onNext}
          disabled={spreadIdx === SPREADS.length - 1 || !!flip}
          aria-label="Next spread"
        >
          <span className={styles.navCornerCurl} aria-hidden />
          <span className={styles.navCornerLabel}>next ▸</span>
        </button>
      </div>
    </div>
  );
}

function MarginNote({
  activeItemId,
  swapping,
}: {
  activeItemId: ItemId | null;
  swapping: boolean;
}) {
  const fallback = {
    title: "Tap a polaroid →",
    meta: "Margin note · waiting",
    blurb:
      "Each photo on these pages has a story tucked underneath. Click one to see what it meant — the trip, the person, the year it lived in.",
    quote: null as string | null,
    link: undefined as string | undefined,
    linkLabel: undefined as string | undefined,
  };
  const item: typeof fallback = activeItemId
    ? {
        title: ITEMS[activeItemId].title,
        meta: ITEMS[activeItemId].meta,
        blurb: ITEMS[activeItemId].blurb,
        quote: ITEMS[activeItemId].quote,
        link: ITEMS[activeItemId].link,
        linkLabel: ITEMS[activeItemId].linkLabel,
      }
    : fallback;
  const idx = activeItemId ? ORDERED_ITEM_IDS.indexOf(activeItemId) + 1 : 0;
  const total = ORDERED_ITEM_IDS.length;
  return (
    <div className={styles.marginNote} aria-live="polite">
      <div className={styles.mnKey}>
        <div className={styles.mnKeyTop}>
          <span className={styles.mnEyebrow}>Margin note —</span>
          <span className={styles.mnCounter}>
            <b>{idx > 0 ? String(idx).padStart(2, "0") : "—"}</b>{" "}
            <i>/ {String(total).padStart(2, "0")}</i>
          </span>
        </div>
        <span className={styles.mnHint}>
          {activeItemId ? (
            <>
              flip the page, or <em>click another polaroid</em> to read its story
            </>
          ) : (
            <>tap any polaroid to read the story behind it</>
          )}
        </span>
      </div>
      <div className={`${styles.mnBody} ${swapping ? styles.mnSwapping : ""}`}>
        <h3 className={styles.mnTitle}>{item.title}</h3>
        <p className={styles.mnMeta}>{item.meta}</p>
      </div>
      <div className={`${styles.mnBlurbCol} ${styles.mnBody} ${swapping ? styles.mnSwapping : ""}`}>
        <p className={styles.mnBlurb}>{item.blurb}</p>
        {item.quote && <p className={styles.mnQuote}>&ldquo;{item.quote}&rdquo;</p>}
        {item.link && item.linkLabel && (
          <a className={styles.mnLink} href={item.link} target="_blank" rel="noreferrer">
            {item.linkLabel}
          </a>
        )}
      </div>
    </div>
  );
}

// ─── main export ───────────────────────────────────────────────────────────

export default function ArchiveBook() {
  const [spreadIdx, setSpreadIdx] = useState(0);
  const [flip, setFlip] = useState<FlipState>(null);
  const [activeItemId, setActiveItemId] = useState<ItemId | null>(null);
  const [mnSwapping, setMnSwapping] = useState(false);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-open first polaroid on entering a content spread
  useEffect(() => {
    if (flip) return;
    const sp = SPREADS[spreadIdx];
    if (sp.kind !== "content") {
      if (activeItemId) selectItem(null);
      return;
    }
    if (activeItemId) {
      const loc = ITEM_LOCATION[activeItemId];
      if (loc && loc.spreadIdx === spreadIdx) return;
    }
    selectItem(sp.leftItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spreadIdx, flip]);

  // Kick off the CSS transition by toggling .flipped on the next frame
  useEffect(() => {
    if (flip && !flip.active) {
      const r1 = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFlip((f) => (f ? { ...f, active: true } : f));
        });
      });
      return () => cancelAnimationFrame(r1);
    }
  }, [flip]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "Escape" && activeItemId) {
        selectItem(null);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spreadIdx, flip, activeItemId]);

  function goNext() {
    if (flip || spreadIdx >= SPREADS.length - 1) return;
    setFlip({ dir: 1, from: spreadIdx, to: spreadIdx + 1, active: false });
  }
  function goPrev() {
    if (flip || spreadIdx <= 0) return;
    setFlip({ dir: -1, from: spreadIdx, to: spreadIdx - 1, active: false });
  }
  function goToSpread(idx: number) {
    if (flip || idx === spreadIdx) return;
    const dir: 1 | -1 = idx > spreadIdx ? 1 : -1;
    setFlip({ dir, from: spreadIdx, to: idx, active: false });
  }
  function onFlipEnd(e: TransitionEvent<HTMLDivElement>) {
    if (!flip) return;
    if (e.propertyName && e.propertyName !== "transform") return;
    setSpreadIdx(flip.to);
    setFlip(null);
  }
  function selectItem(id: ItemId | null) {
    if (id === activeItemId) return;
    setMnSwapping(true);
    if (swapTimer.current) clearTimeout(swapTimer.current);
    swapTimer.current = setTimeout(() => {
      setActiveItemId(id);
      setMnSwapping(false);
    }, 180);
  }

  const sp = SPREADS[spreadIdx];
  const spreadLabel =
    sp.kind === "cover"
      ? "Cover"
      : sp.kind === "end"
      ? "Fin"
      : `Ch. ${sp.chapter.num} · ${sp.chapter.title}`;

  return (
    <div className={styles.archiveBookRoot}>
      <div className={styles.bookStage}>
        <Book
          spreadIdx={spreadIdx}
          flip={flip}
          activeItemId={activeItemId}
          onSelectItem={selectItem}
          onNext={goNext}
          onPrev={goPrev}
          onTransitionEnd={onFlipEnd}
        />
      </div>

      <div className={styles.bookMeta}>
        <div className={styles.pageDots}>
          {SPREADS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.pageDot} ${i === spreadIdx ? styles.pageDotActive : ""}`}
              onClick={() => goToSpread(i)}
              aria-label={`Go to spread ${i + 1}`}
              disabled={!!flip}
            />
          ))}
          <span className={styles.pageDotLabel}>{spreadLabel}</span>
        </div>
        <div className={styles.navBtns}>
          <button
            type="button"
            className={styles.navBtn}
            onClick={goPrev}
            disabled={spreadIdx === 0 || !!flip}
            aria-label="Previous spread"
          >
            ←
          </button>
          <button
            type="button"
            className={styles.navBtnSpread}
            onClick={() => {
              selectItem(null);
              setSpreadIdx(0);
            }}
            disabled={!!flip}
          >
            Back to cover
          </button>
          <button
            type="button"
            className={styles.navBtn}
            onClick={goNext}
            disabled={spreadIdx === SPREADS.length - 1 || !!flip}
            aria-label="Next spread"
          >
            →
          </button>
        </div>
      </div>

      <MarginNote activeItemId={activeItemId} swapping={mnSwapping} />
    </div>
  );
}
