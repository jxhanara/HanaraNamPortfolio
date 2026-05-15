"use client";

import { useState, type KeyboardEvent } from "react";
import Image, { type StaticImageData } from "next/image";
import { SiteNav } from "@/components/home";
import { SiteFooter } from "@/components/SiteFooter";
import portraitImage from "@/assets/aboutme/HanaraBW.jpeg";
import halmoniImage from "@/assets/aboutme/Grandma&Me.JPG";
import seoulImage from "@/assets/aboutme/Korea.jpeg";
import sketchImage from "@/assets/aboutme/Sketch.jpeg";
import ummaToruImage from "@/assets/aboutme/Mom&Toru.JPEG";
import sunnyImage from "@/assets/aboutme/SunnyMovie.png";
import hongKongImage from "@/assets/aboutme/HongKong2.JPG";
import familyImage from "@/assets/aboutme/FamilyPic.JPEG";
import friendsImage from "@/assets/aboutme/Friends.JPG";
import thorImage from "@/assets/aboutme/Toru.JPEG";
import golfImage from "@/assets/aboutme/Family_golf.jpeg";
import styles from "./about.module.css";

const THOR_INSTAGRAM_URL =
  "https://www.instagram.com/toru.coton15?igsh=MXJocWNtNGI3ZmRjaw==";

type ArchiveItem = {
  id: string;
  title: string;
  meta: string;
  blurb: string;
  linkLabel?: string;
  link?: string;
  linkExternal?: boolean;
  captionLeft: string;
  captionRight: string;
  alt: string;
  imgSrc?: StaticImageData;
  gridClass: string;
};

const ARCHIVE: ArchiveItem[] = [
  {
    id: "sunny",
    title: "Sunny",
    meta: "2011 · Film",
    blurb:
      "The shared lunches, the late-night walks, the years that passed too quickly. The movie that taught me friendship can outlast time.",
    captionLeft: "Film · 2011",
    captionRight: "Sunny",
    alt: "Sunny (2011) Korean movie poster",
    imgSrc: sunnyImage,
    gridClass: "c1",
  },
  {
    id: "hongkong",
    title: "Hong Kong, in neon",
    meta: "Hong Kong · Fall '24",
    blurb:
      "Walking past Lin Heung Tea House at midnight, taxi idling, neon humming. The trip that reset what I wanted next.",
    captionLeft: "Traveling",
    captionRight: "Hong Kong, Fall '24",
    alt: "Hong Kong street with neon signs at night",
    imgSrc: hongKongImage,
    gridClass: "c3",
  },
  {
    id: "gwanghwamun",
    title: "Gwanghwamun at night",
    meta: "Seoul, Korea · 2023",
    blurb:
      "Old palaces lit blue, my grandmother's old neighborhood a few blocks over. The first trip back as an adult — and the reason I keep saying 'designed for both halves of me.'",
    captionLeft: "Seoul",
    captionRight: "Gwanghwamun · 2023",
    alt: "Gwanghwamun palace lit up at night",
    imgSrc: seoulImage,
    gridClass: "c8",
  },
  {
    id: "family",
    title: "Renewed family pic since 2008",
    meta: "Family · My greatest happiness",
    blurb:
      "Mom, Dad, my brother, and Toru. The lineup that made me — and the people I'm building everything for.",
    captionLeft: "Family",
    captionRight: "Since 2008",
    alt: "Family portrait under a wooden pergola",
    imgSrc: familyImage,
    gridClass: "c4",
  },
  {
    id: "sketchbook",
    title: "Sketchbook, since age 9",
    meta: "Drawing · Paper + iPad",
    blurb:
      "I drew before I designed. Halmoni couldn't read English but she could read pictures — that's where the empathy reflex started.",
    captionLeft: "Sketchbook",
    captionRight: "2018",
    alt: "An ink sketch of a girl holding a phone",
    imgSrc: sketchImage,
    gridClass: "c9",
  },
  {
    id: "golf",
    title: "Golf with the fam",
    meta: "Family · Summer evenings",
    blurb:
      "Sunset rounds on the green. Mom putts straight, my brother reads breaks like books, my dad keeps score honestly. The best kind of therapy I know.",
    captionLeft: "Family",
    captionRight: "Golf · Summer evenings",
    alt: "Family playing golf on a green at golden hour",
    imgSrc: golfImage,
    gridClass: "c6",
  },
  {
    id: "friends",
    title: "The friends who filled every chapter with joy",
    meta: "UW · Spring '25",
    blurb:
      "The girls who've been there at my lowest, celebrate my wins louder than I did, and kept smiling through it all with their contagious laughter.",
    captionLeft: "Best friends",
    captionRight: "Grad '25",
    alt: "Three friends in white dresses on a staircase",
    imgSrc: friendsImage,
    gridClass: "c5",
  },
  {
    id: "thor",
    title: "Thor, the boss",
    meta: "Coton de Tulear · The boss · 11 yrs",
    blurb:
      "My most demanding client. Sets the morning standup at 6:30 am, gives feedback in barks, and has never missed a deadline (for treats).",
    linkLabel: "Thor on IG ↗",
    link: THOR_INSTAGRAM_URL,
    linkExternal: true,
    captionLeft: "The boss",
    captionRight: "Thor",
    alt: "Thor the Coton de Tulear in a field of daisies",
    imgSrc: thorImage,
    gridClass: "c7",
  },
];

const NOW_ITEMS: { k: string; v: string }[] = [
  { k: "Building", v: "an Interview Prep Tracker" },
  { k: "Reading", v: "I See You Like a Flower: Korean Poem" },
  { k: "Watching", v: "Hospital Playlist" },
  { k: "Listening", v: "Bruno Mars — Risk It All" },
  { k: "Drinking", v: "milk, always" },
];

const GRID_CLASS_MAP: Record<string, string> = {
  c1: styles.c1,
  c3: styles.c3,
  c4: styles.c4,
  c5: styles.c5,
  c6: styles.c6,
  c7: styles.c7,
  c8: styles.c8,
  c9: styles.c9,
};

function CollageTile({
  item,
  index,
  isActive,
  onSelect,
  onArrow,
}: {
  item: ArchiveItem;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  onArrow: (direction: 1 | -1) => void;
}) {
  function handleKey(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onArrow(1);
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      onArrow(-1);
    }
  }

  return (
    <figure
      className={`${GRID_CLASS_MAP[item.gridClass]} ${isActive ? styles.isActive : ""}`}
      tabIndex={0}
      role="button"
      aria-label={`Read about ${item.title}`}
      aria-pressed={isActive}
      onClick={onSelect}
      onKeyDown={handleKey}
      data-index={index}
    >
      {item.imgSrc ? (
        <Image
          src={item.imgSrc}
          alt={item.alt}
          fill
          sizes="(max-width: 1000px) 50vw, 25vw"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className={styles.imgPlaceholder} aria-hidden>
          {item.title}
        </div>
      )}
      <figcaption>
        <span>{item.captionLeft}</span>
        <span>{item.captionRight}</span>
      </figcaption>
    </figure>
  );
}

export default function AboutPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);

  function selectArchive(next: number) {
    const wrapped = (next + ARCHIVE.length) % ARCHIVE.length;
    if (wrapped === activeIdx) return;
    setIsSwapping(true);
    window.setTimeout(() => {
      setActiveIdx(wrapped);
      setIsSwapping(false);
    }, 180);
  }

  const active = ARCHIVE[activeIdx];

  return (
    <div className={styles.aboutRoot}>
      <SiteNav />

      {/* HERO */}
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles.wrap}>
          <div className={styles.heroTop}>
            <div className={styles.heroMeta}>
              <div>
                <span className={styles.dot} />
                <b>Currently in Pittsburgh, PA</b>
              </div>
              <div>UX / Product Designer · M.HCI &apos;26</div>
            </div>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroRow}>I am</span>
            <span className={`${styles.heroRow} ${styles.heroRowIndent}`}>
              <em>Hanara</em>
              <span className={styles.han}>하나라</span>
            </span>
          </h1>

          <div className={styles.heroBottom}>
            <p className={styles.heroTag}>
              like <span>panera</span> &nbsp;:D
            </p>
            <p className={`${styles.heroTag} ${styles.heroTagCenter}`}>
              designer, daughter,
              <br />
              K-drama enthusiast.
            </p>
            <div className={styles.heroScroll}>Scroll to read</div>
          </div>
        </div>
      </section>

      {/* 01 INTRO */}
      <section className={`${styles.section} ${styles.intro}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>
            <span className={styles.num}>01 —</span> Introduction
          </div>

          <div className={styles.introGrid}>
            <div className={styles.introCopy}>
              <p className={styles.lede}>
                I design products that make space for people whose voices have
                been <em>left out of the&nbsp;room.</em>
              </p>

              <p>
                <span className={styles.hiBadge}>Hi 👋</span>
                My name is Hanara — a self-driven UX/Product Designer currently
                earning my Master&apos;s in{" "}
                <b>Human–Computer Interaction at Carnegie Mellon University.</b>
              </p>

              <p>
                In my latest role, I was involved in a startup&apos;s core
                strategy and product development, collaborating closely with
                leadership to bring an <b>AI-powered leisure and travel app</b>{" "}
                to life.
              </p>

              <p>
                Over the past 2 years, I&apos;ve worked as a product designer,
                design lead, and research assistant — developing robust
                problem-solving skills and experience leading projects.
              </p>

              <p>
                When I&apos;m not designing, I like to watch K-dramas or
                animations like Studio Ghibli or Disney!!
              </p>
            </div>

            <div className={styles.portrait}>
              <Image
                src={portraitImage}
                alt="Hanara Nam portrait"
                className={styles.portraitImage}
                sizes="(max-width: 1000px) 90vw, 40vw"
                placeholder="blur"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* NOW / CURRENTLY */}
      <section className={`${styles.section} ${styles.nowBand}`}>
        <div className={`${styles.wrap} ${styles.nowWrap}`}>
          <div>
            <div className={styles.nowTitle}>
              <em className={styles.nowTitleNow}>Now</em>
            </div>
            <p className={styles.nowSub}>
              a snapshot of this week — refreshed often
            </p>
          </div>
          <div className={styles.nowGrid}>
            {NOW_ITEMS.map((item) => (
              <div key={item.k} className={styles.nowCell}>
                <span className={styles.k}>{item.k}</span>
                <em>{item.v}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 ORIGIN */}
      <section className={`${styles.section} ${styles.origin}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>
            <span className={styles.num}>02 —</span> How a grandmother taught me design
          </div>

          <div className={styles.originGrid}>
            <div className={styles.originImages}>
              <div className={`${styles.frame} ${styles.tiltL}`}>
                <Image
                  src={halmoniImage}
                  alt="Young Hanara with her grandmother in autumn"
                  fill
                  sizes="(max-width: 900px) 90vw, 380px"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.frameTag}>With Halmoni · Autumn 2008</div>
              </div>
              <div className={`${styles.frame} ${styles.tiltR}`}>
                <Image
                  src={ummaToruImage}
                  alt="Hanara's mom kneeling on grass with Thor the dog"
                  fill
                  sizes="(max-width: 900px) 90vw, 380px"
                  style={{ objectFit: "cover" }}
                />
                <div className={styles.frameTag}>Umma and Thor</div>
              </div>
            </div>

            <div className={styles.originText}>
              <div className={styles.sectionLabel} style={{ marginBottom: 0 }}>
                <span className={styles.num}>02 —</span> How a grandmother taught me design
              </div>
              <h2 className={styles.originHeading}>
                How I got <em>into design</em> —
              </h2>
              <p>
                Growing up with my grandmother, who faced challenges with
                English, sparked my interest in customer experience and{" "}
                <strong>
                  advocating for underrepresented voices in technology.
                </strong>
              </p>
              <p>
                Using a mix of Korean language and drawings to communicate with
                her allowed me to explore my artistic side.
              </p>
              <p>
                Additionally, witnessing my mother&apos;s impactful work as a UX
                designer inspired me to pursue a similar path. My goal is to{" "}
                <strong>
                  leverage my emotions, design skills, and problem-solving
                  abilities
                </strong>{" "}
                to create an <strong>inclusive environment</strong> where
                individuals can be their <strong>authentic selves.</strong>
              </p>

              <blockquote className={styles.pullquote}>
                Design, for me, started as a way to translate for someone I
                loved.
                <cite>— what I&apos;d say if someone asked</cite>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 03 LISTS */}
      <section className={`${styles.section} ${styles.lists}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>
            <span className={styles.num}>03 —</span> A small inventory of self
          </div>

          <div className={styles.listsGrid}>
            <div className={styles.listBlock}>
              <h3>
                <em>I&apos;m</em> —
              </h3>
              <ul>
                <li>
                  <span className={styles.idx}>01</span>
                  <span>
                    a <b>Korean-American</b> raised between Seoul and the
                    suburbs of Seattle
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>02</span>
                  <span>
                    an <b>INFJ</b> — <span className={styles.k}>I</span>ntrovert,
                    i<span className={styles.k}>N</span>tuitive,{" "}
                    <span className={styles.k}>F</span>eeling,{" "}
                    <span className={styles.k}>J</span>udging
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>03</span>
                  <span>
                    a past <b>K-pop star</b> (well, kind of)
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>04</span>
                  <span>
                    an <b>animal lover</b> — especially pandas and otters!
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>05</span>
                  <span>
                    a person that loves to <b>travel &amp; meet new people</b>
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>06</span>
                  <span>
                    a <b>flower enthusiast</b> — baby&apos;s breath in particular
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles.listBlock}>
              <h3>
                <em>I appreciate</em> —
              </h3>
              <ul>
                <li>
                  <span className={styles.idx}>01</span>
                  <span>
                    <b>user-centered designs</b> that respect cognitive load
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>02</span>
                  <span>
                    being <b>inquisitive</b> and open to learning, always
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>03</span>
                  <span>
                    valuing and showing <b>respect for others</b>
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>04</span>
                  <span>
                    <b>contributing to the community</b> beyond the screen
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>05</span>
                  <span>
                    a great pun (see: <i>panera</i>)
                  </span>
                </li>
                <li>
                  <span className={styles.idx}>06</span>
                  <span>the first cold morning of October</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 04 LOVES / COLLAGE */}
      <section className={`${styles.section} ${styles.loves}`}>
        <div className={styles.wrap}>
          <div className={styles.sectionLabel}>
            <span className={styles.num}>04 —</span> Things I love, in no order
          </div>
          <div className={styles.lovesHead}>
            <h2>
              Things I keep <em>coming back to.</em>
            </h2>
            <p>
              A loose archive — films I rewatch, places that shaped me, the dog
              that lets me work from home.
            </p>
          </div>

          <div
            className={`${styles.collage} ${styles.collageDimmed}`}
            id="collage"
          >
            {ARCHIVE.map((item, idx) => (
              <CollageTile
                key={item.id}
                item={item}
                index={idx}
                isActive={idx === activeIdx}
                onSelect={() => selectArchive(idx)}
                onArrow={(dir) => selectArchive(activeIdx + dir)}
              />
            ))}
          </div>

          <div
            className={`${styles.archiveDetail} ${isSwapping ? styles.archiveDetailSwapping : ""}`}
            aria-live="polite"
          >
            <div className={styles.dKey}>
              <div className={styles.dKeyTop}>
                <span className={styles.dEyebrow}>Now viewing —</span>
                <span className={styles.dCounter}>
                  <b>{String(activeIdx + 1).padStart(2, "0")}</b>{" "}
                  <i>/ {String(ARCHIVE.length).padStart(2, "0")}</i>
                </span>
              </div>
              <span className={styles.dHint}>
                Tap any photo above to read the story behind it.
              </span>
            </div>
            <div>
              <h3 className={styles.dTitle}>{active.title}</h3>
              <p className={styles.dMeta}>{active.meta}</p>
            </div>
            <div className={styles.dBlurbCol}>
              <p className={styles.dBlurb}>{active.blurb}</p>
              {active.linkLabel && active.link ? (
                <a
                  className={styles.dLink}
                  href={active.link}
                  {...(active.linkExternal
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                >
                  {active.linkLabel}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
